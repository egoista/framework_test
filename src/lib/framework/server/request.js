const { IncomingMessage } = require('http');

/* The `CustomRequest` class is a subclass of `IncomingMessage` that adds functionality to parse and
store request body, parameters, query parameters, and path. */
class CustomRequest extends IncomingMessage {
  body = null;
  params = {};
  queryParams = {};
  path = null;

  /**
   * The `build` function asynchronously builds the body, query parameters, and path.
   */
  async build() {
    await this.#buildBody();
    this.#buildQueryParams();
    this.#buildPath();
  }

  /**
   * The function "buildPath()" extracts the path from a URL by splitting it at the "?" character.
   */
  #buildPath() {
    this.path = this.url.split('?')[0];
  }

  /**
   * The function asynchronously builds the body of a request by parsing the raw data if the request
   * method is 'POST'.
   */
  async #buildBody() {
    if (this.method === 'POST') {
      const rawBody = await this.#getReqData();
      this.body = JSON.parse(rawBody);
    }
  }

  /**
   * The function `buildQueryParams()` extracts query parameters from a URL and stores them in
   * queryParams.
   */
  #buildQueryParams() {
    const queryString = this.url.split('?')[1] || '';
    if (queryString) {
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        this.queryParams[key] = value;
      });
    }
  }

  /**
   * The function `getReqData()` returns a promise that resolves with the concatenated body data
   * received from an event stream.
   * @returns A Promise object is being returned.
   */
  #getReqData() {
    return new Promise((resolve, reject) => {
      try {
        let body = '';
        this.on('data', (chunk) => {
          body += chunk.toString();
        });
        this.on('end', () => {
          resolve(body);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = CustomRequest;
