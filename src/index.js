import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { createSelectMarkup } from './createMarkup';
import { createCard } from './createMarkup';

export const breedSelect = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
export const catInfo = document.querySelector('.cat-info');

breedSelect.hidden = true;
errorText.hidden = true;

breedSelect.addEventListener('change', onSearch);

setTimeout(() => {
  breedSelect.hidden = false;
  loaderText.hidden = true;
  errorText.hidden = true;

  fetchBreeds()
    .then(data => {
      if (data.length !== 0) {
        createSelectMarkup(data);
      }
    })
    .catch(err => {
      catInfo.classList.add('hidden');
      console.log(err);
      breedSelect.hidden = true;
      errorText.hidden = false;
    });
}, 1000);

function onSearch(evt) {
  loaderText.hidden = false;
  catInfo.classList.add('hidden');

  const catId = evt.target.options[evt.target.selectedIndex].id;

  setTimeout(() => {
    loaderText.hidden = true;

    fetchCatByBreed(catId)
      .then(cat => {
        if (cat.length !== 0) {
          createCard(cat);
          catInfo.classList.remove('hidden');
        }
      })
      .catch(err => {
        catInfo.classList.add('hidden');
        console.log(err);
        errorText.hidden = false;
        breedSelect.hidden = true;
      });
  }, 1000);
}
