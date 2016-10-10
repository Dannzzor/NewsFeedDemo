function load(offset, callback) {
  const limit = 10;
  return fetch(`http://www.stellarbiotechnologies.com/media/press-releases/json?limit=${limit}&offset=${offset}`, {
    accept: 'application/json'
  }).then(checkStatus)
    .then(parseJSON)
    .then(callback);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { load };
export default Client;
