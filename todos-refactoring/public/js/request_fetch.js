const request = {
  get(url) {
    return fetch(url);
  },

  update(method, url, payload) {
    return fetch(url, {
      method,
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  delete(url) {
    return fetch(url, { method: 'DELETE' });
  },
};

export default {
  get(url) {
    return request.get(url);
  },
  post(url, payload) {
    return request.update('POST', url, payload);
  },
  patch(url, payload) {
    return request.update('PATCH', url, payload);
  },
  delete(url) {
    return request.delete(url);
  },
};
