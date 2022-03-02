const request = (method, url, onSuccess, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  // 만약에 payload가 없다면 그냥 무시되므로 둘 다 그냥 써도 됨.
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

export default {
  get(url, onSuccess) {
    request('GET', url, onSuccess);
  },
  post(url, onSuccess, payload) {
    request('POST', url, onSuccess, payload);
  },
  patch(url, onSuccess, payload) {
    request('PATCH', url, onSuccess, payload);
  },
  delete(url, onSuccess) {
    request('DELETE', url, onSuccess);
  },
};
