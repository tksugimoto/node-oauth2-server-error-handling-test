const OauthServer = require('oauth2-server');
const model = require('./model');

const oauth = new OauthServer({ model });
const Request = OauthServer.Request;
const Response = OauthServer.Response;

const generateRequest = (clientId) => new Request({
	method: 'GET',
	query: {
		client_id: clientId,
		state: 'dummy',
		response_type: 'code',
	},
	headers: {},
});
const response = new Response();

const options = {
	authenticateHandler: {
		handle() {
			return {
				userId: 1,
			};
		}
	}
};

const authorizeCheck = (clientId) => {
	try {
		const request = generateRequest(clientId);
		oauth.authorize(request, response, options).then(() => {
			console.log(`clientId = ${clientId}, authorized`);
		}).catch((err) => {
			console.log(`clientId = ${clientId}, catch error in promise`, err);
		});
	} catch (err) {
		console.log(`clientId = ${clientId}, catch error in try-catch`, err);
	}
};


// clientId = a, authorized
authorizeCheck('a');

// clientId = b - this is not correct, catch error in promise { invalid_client: Invalid client: client credentials are invalid
authorizeCheck('b - this is not correct');

// clientId = null, catch error in try-catch { invalid_request: Missing parameter: `client_id`
authorizeCheck(null);
