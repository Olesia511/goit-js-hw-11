//====     Intersection Observer API    =====
import { notiflixInfo } from './notiflix';
import { onClickLoadMore } from './index';

// ======

const observerOptions = {
  rootMargin: '200px 0px 0px 0px',
  threshold: 0.1,
};

function observerCallback(arr, observer) {
  const totalImg = arr.length - 1;
  const lastElement = arr[totalImg];

  if (lastElement.isIntersecting) {
    onClickLoadMore();
    observer.unobserve(lastElement.target);
  }
}

function observerCallbackLastElemArr(arr, observer) {
  const totalImg = arr.length - 1;
  const lastElement = arr[totalImg];

  if (lastElement.isIntersecting) {
    notiflixInfo();
    observer.unobserve(lastElement.target);
  }
}

const observerSearch = new IntersectionObserver(
  observerCallback,
  observerOptions
);
const observerLastElemArr = new IntersectionObserver(
  observerCallbackLastElemArr,
  observerOptions
);

export {
  observerLastElemArr,
  observerSearch,
  observerCallbackLastElemArr,
  observerCallback,
};
