import axios from 'axios';

import { notiflixMessage, notiflixTotalImg, notiflixSearch } from './notiflix';
import { createGallery } from './createMarkup';

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

const BASE_URL = 'https://pixabay.com/api/';
const AUTH_KEY = '39799120-0adfdb8bf4f296c3a7d41d46c';

const form = document.querySelector('.search-form');
export const gallery = document.querySelector('.gallery');

let currentPage = 1;
let perPage = 40;
let searchValue = '';

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

//==  Функція HTTP-запита на бекенд для пошуку зображень за ключовим словом

async function getResponseArr() {
  const resp = await axios.get(`${BASE_URL}?key=${AUTH_KEY}`, {
    params: {
      q: `${searchValue}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${perPage}`,
      page: `${currentPage}`,
    },
  });

  const arr = await resp.data;
  return arr;
}
