import { notiflixMessage, notiflixTotalImg, notiflixSearch } from './notiflix';
import { createGallery } from './createMarkup';
import { getResponseArr } from './axios';

import {
  observerLastElemArr,
  observerSearch,
  observerCallbackLastElemArr,
  observerCallback,
} from './observer';

//====     SimpleLightbox library    =====

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryWindow = new SimpleLightbox('.gallery a', {
  animationSpeed: 400,
  captionDelay: 250,
  alertError: 'Image not found',
  heightRatio: 0.8,
});

//=====        CONSTs           =====

const form = document.querySelector('.search-form');
export const gallery = document.querySelector('.gallery');

let currentPage = 1;
let perPage = 40;
let searchValue = '';

export { currentPage, perPage, searchValue };

form.addEventListener('submit', onSearch);

//==  Функція завантаження та розмітки групи зображень за ключовим словом

function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  searchValue = e.currentTarget.searchQuery.value.trim().toLowerCase();

  if (searchValue === '') {
    notiflixSearch();
  } else {
    getResponseArr()
      .then(async res => {
        const arr = await res.hits;
        const allResults = res.totalHits;
        console.log(allResults);

        if (allResults === 0) {
          notiflixMessage();
        } else {
          createGallery(arr);
          notiflixTotalImg(allResults);

          galleryWindow.refresh();
          currentPage++;

          const lastElementOnList = gallery.lastElementChild;
          console.log(`lastElementOnList`, lastElementOnList);

          observerCallback(arr, lastElementOnList);
          observerSearch.observe(lastElementOnList);
        }
      })

      .catch(err => {
        notiflixMessage();
        console.log(`Error search`, err);
      });
  }
}

//==  Функція завантаження та розмітки наступної групи зображень вже існуючого пошуку

export function onClickLoadMore() {
  getResponseArr()
    .then(async res => {
      const arr = await res.hits;
      const allResults = res.totalHits;
      const totalPage = Math.ceil(allResults / perPage);

      if (currentPage <= totalPage) {
        createGallery(arr);
        galleryWindow.refresh();

        const lastElementOnList = gallery.lastElementChild;

        observerCallback(arr, lastElementOnList);
        observerSearch.observe(lastElementOnList);

        if (totalPage === currentPage) {
          observerSearch.unobserve(lastElementOnList);

          const lastElementArr = gallery.lastElementChild;

          observerCallbackLastElemArr(arr, lastElementArr);
          observerLastElemArr.observe(lastElementArr);
        }
        currentPage++;
        return;
      }
    })
    .catch(err => {
      notiflixMessage();
      console.log(`error more`, err);
    });
}
