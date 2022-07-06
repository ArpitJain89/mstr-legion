const { RESTDataSource } = require('apollo-datasource-rest');
const dotenv = require('dotenv');

module.exports = class StudiesAPI extends RESTDataSource {
  constructor() {
    super();
    dotenv.config();
    this.baseURL = process.env.BASE_URL;
  }

  async getStudies() {
    return this.get(process.env.STUDIES_ENDPOINT);
  }

  willSendRequest(request) {
     request.headers.set('Authorization', this.context.headers.authorization);
  }
}