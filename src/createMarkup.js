//==  Розмітка картки одного зображення
import { gallery } from './index';

function createCard(elem) {
  const {
    downloads,
    comments,
    views,
    likes,
    tags,
    largeImageURL,
    webformatURL,
    id,
  } = elem;

  return `<div class="photo-card" id="${id}">
  <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /> </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>  
</div>`;
}

//==  Створення галереї зображень у разі успішного запиту

function createGallery(arr) {
  const cardList = arr
    .map(el => {
      return createCard(el);
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', cardList);
}

export { createGallery };
