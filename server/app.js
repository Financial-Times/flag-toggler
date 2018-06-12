'use strict';

// const logger = require('@financial-times/n-logger').default;
const express = require('express');
const flags = require('@financial-times/n-flags-client');
const app = require('@financial-times/n-internal-tool')({
	defaultLayout: 'main',
	healthChecks: [],
	layoutsDir: './views/layouts',
	systemCode: 'flag-toggler',
	withBackendAuthentication: false
});
const PORT = process.env.PORT || 3000;

app.use(require('cookie-parser')());

app.use((req, res, next) => {
	res.set('Cache-Control', 'max-age=0, no-cache');
	next();
});

app.get('/__gtg', (req, res, next) => {
	flags.getModel()
		.then(flags => flags.getRaw())
		.then(flags => {
			if (!flags.length) {
				throw new Error('Flags must be returned for the flag toggler to function');
			}
			res.sendStatus(200);
		})
		.catch(next);
});

app.get('/', flags.middleware, require('./controllers/everything'));
app.post('/api/:flagname', [express.urlencoded(), express.json()], require('./controllers/api'));

module.exports = flags.init()
	.then(() => app.listen(PORT));
