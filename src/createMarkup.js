import { breedSelect } from './index';
import { catInfo } from './index';

export function createSelectMarkup(arr) {
  const listSelect = arr
    .map(({ id, name }) => {
      return `<option id="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', listSelect);
}

export function createCard(cat) {
  const { url } = cat;
  const { name, origin, description, temperament } = cat.breeds[0];

  const catCard = `<img src="${url}" alt="${name}" />
        <div class="cat-temperament">
        <h2>${name}</h2>
        <h4>Country: ${origin}</h4>
        <h5>Temperament: ${temperament}</h5>
        <h5>${description}</h5></div>`;

  catInfo.innerHTML = catCard;
}
