'use strict';

const getFlagsData = require('../lib/get-flags-data');
const getOverrides = require('../lib/get-overrides');

module.exports = (req, res, next) => {
	getFlagsData(getOverrides(req))
		.then(flags => {
			res.render('everything', { flags });
		})
		.catch(next);
};
