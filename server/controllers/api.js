'use strict';

const getOverrides = require('../lib/get-overrides');

module.exports = (req, res) => {
	if (!req.body && req.params.flagname !== 'clear-all') {
		return res.send(400, 'A state for the flag must be set');
	}

	const respond = req.accepts('text/html') ?
		() => res.redirect('/') : model => res.json(model);

	if (req.params.flagname === 'clear-all') {
		res.cookie('FTFlags', '', {
			domain: '.ft.com',
			expires: new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000),
			path: '/'
		});
		return respond({});
	}

	const currentOverrides = getOverrides(req);
	const alreadyOverridden = currentOverrides.find(flag => flag.name === req.params.flagname);

	if (alreadyOverridden) {
		alreadyOverridden.state = req.body.state === alreadyOverridden.state ? null : req.body.state;
	} else {
		currentOverrides.push({
			name: req.params.flagname,
			state: req.body.state
		});
	}

	const cookieString = currentOverrides
		.filter(flag => flag.state)
		.map(flag => `${flag.name}:${flag.state}`)
		.join(',');

	res.cookie('FTFlags', cookieString, {
		domain: '.ft.com',
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		path: '/'
	});

	respond({
		name: req.params.flagname,
		state: req.body.state
	});
};
