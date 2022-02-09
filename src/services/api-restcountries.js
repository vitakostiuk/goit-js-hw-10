const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountry(name) {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Not found!!!!'));
    });
  }

export {fetchCountry};