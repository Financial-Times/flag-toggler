const logger = require('@financial-times/n-logger').default;
const app = require('@financial-times/n-internal-tool')({
	healthChecks: [],
	systemCode: 'flag-toggler',
	withBackendAuthentication: false
});
const PORT = process.env.PORT || 3000;

app.get('/__gtg', (req, res) => {
	res.set('Cache-Control', 'private');
	res.sendStatus(200);
});

module.exports = app.listen(PORT);
