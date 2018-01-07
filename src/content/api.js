// TODO url should be saved to localstorage (along with api key) when api key entered in popup.
export const url = 'https://izu4ycb2ji.execute-api.us-west-2.amazonaws.com/latest/user/';
// TODO get from localstorage.
export const key = 'somerandomkeyfornow';

const _fetch = (url, options, key, json) => {
  options.headers = options.headers || {};
  options.headers['Accept'] = 'application/json';
  options.mode = 'cors';
  //options.headers['key'] = key;
  if (json) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(json);
  }
  return fetch(url, options);
}

const _get = (url) => {
  return _fetch(url, { method: 'GET' }, key).then((res) => {
    return res.json();
  });
}

const _post = (url, json) => {
  return _fetch(url, { method: 'POST' }, key, json).then((res) => {
    return res.json();
  });
}

export const postUser = (id, data) => {
  return _post(url, { id, ...data });
}

export const getUser = (id) => {
  return _get(url + id);
}
