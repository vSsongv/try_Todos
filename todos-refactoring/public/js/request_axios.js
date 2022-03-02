export default {
  get(url) {
    return axios.get(url);
  },
  post(url, payload) {
    return axios.post(url, payload);
  },
  patch(url, payload) {
    return axios.patch(url, payload);
  },
  delete(url) {
    return axios.delete(url);
  },
};
