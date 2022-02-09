import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}

// const BASE_URL = 'https://restcountries.com/v3.1';
  
refs.input.addEventListener('input', getCountryByName);

function getCountryByName(e) {
  const countryName = e.currentTarget.value;
  // console.log(countryName);
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(countries => {
      const markupList = createMarkup(countries);
      refs.countryList.innerHTML = markupList;
      
      if (countries.length === 1) {
        const markupInfo = createMarkupInfo(countries[0]);
        refs.countryInfo.innerHTML = markupInfo;
      }
    });
};


function createMarkupInfo(country) {
  const languagesValues = Object.values(country.languages).join(", ");
  return `
    <span class="country-item">
      <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
      <h1 class="country-name info">${country.name.common}</h1>
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

function createMarkup(countries) {
      const markupList = countries.map(country => `
      <li class="country-item">
        <img class="country-logo" src="${country.flags.svg}" alt="flag-icon" width="25">
        <p class="country-name">${country.name.official}</p>
      </li>`).join('');

      return markupList;
};
