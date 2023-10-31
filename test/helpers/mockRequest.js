var httpMocks = require('node-mocks-http');

module.exports = {
  getRequest: (path) =>
    httpMocks.createRequest({
      method: 'GET',
      url: path,
      params: {
        id: 42,
      },
    }),
};
