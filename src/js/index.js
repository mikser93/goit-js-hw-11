import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів
import { render } from './render.js';
import { getter } from './api';

const form = document.querySelector('.search-form');
const divForGallery = document.querySelector('.gallery');
const scroll = document.querySelector('.observer');

// настройки observer
let options = {
  //   root: null, //элемент, который выступает в роли области просмотра для target (предок целевого элемента или null для viewport)
  rootMargin: '200px', //отступы вокруг root (margin в CSS, по умолчанию все отступы равны 0)
  treshold: 1, //число или массив чисел, указывающий допустимый процент пересечения target и root
};

// наблюдатель для скрола(observer)
const observer = new IntersectionObserver(updateList, options);

let page;
let totalPages;
let request;
let lightbox;

// функция обратного вызова для observer
function updateList(data, observer) {
  data.forEach(data => {
    if (data.isIntersecting && page <= totalPages) {
      getter(page, request).then(response => {
        render(response.hits);
        lightbox.refresh();
        observer.unobserve(scroll);
        observer.observe(scroll);
        page += 1;
      });
    } else if (page > totalPages) {
      Notify.info('We`re sorry, but you`ve reached the end of search results.');
      observer.unobserve(scroll);
    }
  });
}

let isObserve = false;

form.addEventListener('submit', event => {
  event.preventDefault();
  divForGallery.innerHTML = '';
  request = event.target[0].value;
  if (isObserve) {
    observer.unobserve(scroll);
  }
  page = 1;
  if (request) {
    getter(page, request).then(response => {
      if (response.hits.length) {
        lightbox = new SimpleLightbox('.gallery a');
        totalPages = Math.ceil(response.totalHits / 40);
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
        observer.observe(scroll);
        isObserve = true;
      } else {
        Notify.failure('Sorry, your request not result.');
      }
    });
  } else {
    Notify.failure('Please, input something!');
  }
  form.reset();
});
