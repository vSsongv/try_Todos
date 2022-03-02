const request = (method, url, payload) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });

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
