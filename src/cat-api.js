import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_bBV0fhRAz89mChD5W65r4Uj8CoL9CfwBfZnXAkZd55h4OTqHxW5OELyb7F5KAg3U';

const BASE_URL = `https://api.thecatapi.com/v1/`;
const ENDPOINT = `breeds`;
const ENDPOINT_ID = `images/search`;

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}${ENDPOINT}`)
    .then(resp => {
      if (!resp.data) {
        throw new Error(resp.statusText);
      }
      return resp.data;
    })
    .catch(err => {
      console.log(`fetchBreeds error`, err);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${ENDPOINT_ID}?breed_ids=${breedId}`)
    .then(respId => {
      if (!respId.data[0]) {
        throw new Error(respId.statusText);
      }
      return respId.data[0];
    })
    .catch(err => {
      console.log(`fetchCatByBreed error`, err);
    });
}
