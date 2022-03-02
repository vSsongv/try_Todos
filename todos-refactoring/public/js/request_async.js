const request = async (method, url, payload) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: payload,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  get(url) {
    return request('GET', url);
  },
  post(url, payload) {
    return request('POST', url, payload);
  },
  patch(url, payload) {
    return request('PATCH', url, payload);
  },
  delete(url) {
    return request('DELETE', url);
  },
};
