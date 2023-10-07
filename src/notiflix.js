import Notiflix from 'notiflix';

//====     Notiflix library    =====

const optionsNotiflixMessage = {
  failure: {
    background: 'rgba(104, 0, 3, 0.5)',
    textColor: '#fff',
    svgColor: '#680003',
    notiflixIconColor: '#680003',
    fontAwesomeIconColor: '#680003',
    backOverlayColor: 'rgba(104, 0, 3, 0.5)',
  },
};

const optionsNotiflixInfo = {
  failure: {
    background: '#a69ca0',
    textColor: '#fff',
    svgColor: '#ad6991',
    notiflixIconColor: '#ad6991',
    fontAwesomeIconColor: '#ad6991',
    backOverlayColor: '#a69ca0',
  },
};

//==  Спливаюче вікно у разі невдалого запиту

function notiflixMessage() {
  Notiflix.Report.failure(
    '',
    'Sorry, there are no images matching your search query.',
    'Please try again.',
    optionsNotiflixMessage
  );
}

//==  Спливаюче вікно в кінці списку пошукових зображень

function notiflixInfo() {
  Notiflix.Report.info(
    '',
    "We're sorry, but you've reached the end of search results.",
    'Close',
    optionsNotiflixInfo
  );
}

function notiflixSearch() {
  Notiflix.Report.failure(
    '',
    'Please enter the text in the search file.',
    'Close',
    optionsNotiflixInfo
  );
}

//==  Спливаюче вікно з кількістю знайдених зображень у разі вдалого запиту

function notiflixTotalImg(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

export { notiflixMessage, notiflixInfo, notiflixTotalImg, notiflixSearch };
