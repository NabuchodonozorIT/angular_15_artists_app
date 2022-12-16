
export const ajax = {
  get(url, onSuccess, onError = (err) => {}) {

    return fetch(url)
      .then(res => (res.status >= 400) ? Promise.reject(res) : res)
      .then(res => res.json())
      .then(onSuccess)
      .catch(onError);
  },
  post(url, data, onSuccess, onError = (err) => {}) {

    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => (res.status >= 400) ? Promise.reject(res) : res)
      .then(res => res.json())
      .then(onSuccess)
      .catch(onError);
  }
}
