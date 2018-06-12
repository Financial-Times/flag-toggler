'use strict';

const { parseOverrides } = require('@financial-times/n-flags-client');

module.exports = req => {
	const overrides = req.header('FT-Flags') || req.cookies['FTFlags'];
	return parseOverrides(overrides);
};
