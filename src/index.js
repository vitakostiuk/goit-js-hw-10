import './css/styles.css';
import { fetchCountry } from './services/api-restcountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(getCountryByName, DEBOUNCE_DELAY));

function getCountryByName(e) {
  const countryName = e.target.value.toLowerCase().trim();

  if (countryName.length === 0) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountry(countryName)
    .then(countries => renderCountry(countries))
    .catch(err => handleError(err));
};

function renderCountry(countries) {
  if (countries.length > 10) {
    console.log(countries);
    console.log('Too many matches found.');
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  const markupList = createMarkupList(countries);
  refs.countryList.innerHTML = markupList;
  refs.countryInfo.innerHTML = '';

  if (countries.length === 1) {
    refs.countryList.innerHTML = '';
    const markupInfo = createMarkupInfo(countries[0]);
    refs.countryInfo.innerHTML = markupInfo;
  }
}

function handleError(err) {
  console.log(err);
  Notify.failure('Oops, there is no country with that name');
}

function createMarkupInfo(country) {
  const languagesValues = Object.values(country.languages).join(", ");
  return `
    <span class="country-item">
      <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
      <h1 class="country-name info">${country.name.official}</h1>
    </span>
    <ul class="country-list">
    <li class="country-item">
      <span class="country-item title">Capital: &nbsp;</span>${country.capital}</li>
    <li class="country-item">
      <span class="country-item title">Population: &nbsp;</span>${country.population}</li>
    <li class="country-item">
      <span class="country-item title">Languages: &nbsp;</span>${languagesValues}</li>
    </ul>
  `
};

function createMarkupList(countries) {
  return countries.map(country => `
    <li class="country-item">
      <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
      <p class="country-name">${country.name.official}</p>
    </li>`).join('');
};

