'use strict';

const test = (z, bundle) =>
  z.request({ url: 'http://localhost:4000/user' });

const handleBadResponses = (response, z, bundle) => {
	console.log(response);
  if (response.status === 401) {
    throw new z.errors.Error(
      // This message is surfaced to the user
      'The API Key you supplied is incorrect',
      'AuthenticationError',
      response.status
    );
  }

  return response;
};

const includeApiKey = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.params = request.params || {};
    request.params.api_key = bundle.authData.apiKey;

  }

  return request;
};

module.exports = {
  config: {
    
    type: 'custom',

    fields: [{ key: 'apiKey', label: 'API Key', required: true }],

    test,

    connectionLabel: '{{json.username}}',
  },
  befores: [includeApiKey],
  afters: [handleBadResponses],
};
