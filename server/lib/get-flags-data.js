'use strict';

const flags = require('@financial-times/n-flags-client');
const sortByName = (a, b) => {
	if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
	if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
	return 0;
};

const createViewModel = (userFlagStates = []) => {
	const now = new Date().getTime();

	return flagModel => {
		const timeLeft = (new Date(flagModel.expiry).getTime()) - now;

		return {
			description: flagModel.description,
			name: flagModel.name,
			state: (flagModel.state && timeLeft > 0) ? 'on' : 'off',
			userState: userFlagStates.find(flag => flag.name === flagModel.name)
		};
	};
};

const justDemoFlags = flag => flag.name.startsWith('ip-');

module.exports = userFlagStates => {
	const viewModel = createViewModel(userFlagStates);

	return flags.getModel()
		.then(flags => flags.getRaw()
			.filter(justDemoFlags)
			.sort(sortByName)
			.map(viewModel)
		);
};
