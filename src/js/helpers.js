//  Functions that we reuse over and over again 

import { async } from "regenerator-runtime";

import { TIMEOUT_SEC } from "./config.js";


/**
 * a promisified function inside the helpers
 * @param {number} s time in seconds for delay
 * @returns returns a rejected promise in case the delay sec is met
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/*
export const getJSON= async function(url){

  try{
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    //  the json method is available on all the response objects // response object is what the fetch returns
    console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
    }catch(err){
      throw err;
    }
}
*/

// sendJSON && getJSON are almost similar, therefore use AJAX


/**
 * Reusable function for both get and post request 
 * @param {url} url 
 * @param {Object} [uploadData=undefined] usecase during post call with our recipe
 * @returns 
 */
export const AJAX =  async function(url, uploadData= undefined){
  try {
const fetchPro = uploadData
  ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    })
  : fetch(url)
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    //  the json method is available on all the response objects // response object is what the fetch returns
    console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    //  rethrow to catch in place where this function is in use 
    throw err;
  }
}
/*
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    //  the json method is available on all the response objects // response object is what the fetch returns
    console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};*/