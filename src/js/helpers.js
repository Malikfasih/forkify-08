import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from '../config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Refactoring the lower code of getJSON and sendJSON
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // with this we tell the api as we specify in the request that the data we gonna send is going to be in json format, and so only then our api can correctly accept that data and create a new recipe in the database.
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13'
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    throw err; // to handle the err in model.js by own.
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13'
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    throw err; // to handle the err in model.js by own.
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // with this we tell the api as we specify in the request that the data we gonna send is going to be in json format, and so only then our api can correctly accept that data and create a new recipe in the database.
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13'
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    throw err; // to handle the err in model.js by own.
  }
};

*/
