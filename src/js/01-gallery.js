'use strict';

import SimpleLightbox from 'simplelightbox';

import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
galleryEl.innerHTML = createGalleryItemsMarkup(galleryItems);

function createGalleryItemsMarkup(items) {
  return items
    .map(
      item => `<a class="gallery__item" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
      </a>`
    )
    .join('');
}

const settingsSimpleLightbox = {
  captionsData: 'alt',
  captionDelay: 250,
};
let gallerySimpleLightbox = new SimpleLightbox(
  '.gallery a',
  settingsSimpleLightbox
);