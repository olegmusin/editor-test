import axios from 'axios';

const API_BASE = 'http://localhost:5000';

/**
 * This file contains methods to call server endpoints for operations with data
 */

/**
 * Gets an array of image entries on server.
 *
 * @returns {Promise} The Axios Promise object.
 */
export function getImages() { //eslint-disable-line
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.get(`${API_BASE}/images`, config);
}

/**
 * Posts an image file as FormData data to server.
 *
 * @param {FormData} imageFile The file to upload (png/jpeg only)
 * @returns {Promise} The Axios Promise object.
 */
export function uploadImage(imageFile) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post(`${API_BASE}/uploads`, imageFile, config);
}
