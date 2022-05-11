const Axios = require("./axios.helper");


class HttpRequest {

  constructor(url) {
    this.url = url;
    this.headers = {};
  }
  
  setHeaders(headers) {
    this.headers = headers;
    return this;
  }
  get(params) {
    return Axios.get(this.url, { params });
  }
  post(data) {
    return Axios.post(this.url, data, { headers: this.headers });
  }
  postWithParams(data) {
    const params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key]);
    }
    return Axios.post(this.url, params, { headers: this.headers });
  }
  postWithUriParams(paramthers, data = null) {
    const params = new URLSearchParams();
    for (let key in paramthers) {
      params.append(key, paramthers[key]);
    }
    let queryString = `?${params.toString()}`;
    return Axios.post(
      this.url + queryString,
      data,
      { headers: this.headers },
    );
  }
  delete(params) {
    return Axios.delete(this.url, { params });
  }
  put(params) {
    return Axios.put(this.url, { params });
  }
}
module.exports = HttpRequest;
