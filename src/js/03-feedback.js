import {
  saveKeyToLocal,
  loadKeyFromLocal,
  removeKeyFromLocal,
} from './storage';

const throttle = require('lodash.throttle');
const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const KEY_DATA = 'feedback-form-state';

form.addEventListener('input', throttle(saveDataToLocal, 500));
form.addEventListener('submit', onFormSubmit);

let storage = {
  email: '',
  message: '',
};

loadDataFromLocal();

function saveDataToLocal(e) {
  if (e.target.tagName === 'INPUT') {
    storage.email = e.target.value;
  }
  if (e.target.tagName === 'TEXTAREA') {
    storage.message = e.target.value;
  }
  saveKeyToLocal(KEY_DATA, storage);
}

function loadDataFromLocal() {
  if (loadKeyFromLocal(KEY_DATA)) {
    storage = loadKeyFromLocal(KEY_DATA);
  }

  if (storage.email !== '') {
    input.value = storage.email;
  }

  if (storage.message !== '') {
    textarea.value = storage.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  removeKeyFromLocal(KEY_DATA);
  storage.email = '';
  storage.message = '';
  console.log(storage);
}