module.exports.getClient = (clientId, clientSecret) => {
	return new Promise((resolve) => {
		// simple check for test
		if (clientId === 'a') {
			resolve({
				id: clientId,
				grants: [
					'authorization_code',
				],
				redirectUris: [
					'http://example.com/',
				],
			});
		} else {
			resolve(null);
		}
	});
};

module.exports.saveAuthorizationCode = (code, client, user) => {
	return Object.assign({}, code, {
		client,
		user,
	});
 };
