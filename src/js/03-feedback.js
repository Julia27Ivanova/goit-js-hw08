'use strict';
import {
  saveData,
  loadData,
  removeData,
} from './storage.js';
const throttle = require('lodash.throttle');
const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('.feedback-form input'),
  textareaEl: document.querySelector('.feedback-form textarea'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';
let userForm = loadData(LOCALSTORAGE_KEY) ?? {
  email: '',
  message: '',
};

refs.formEl.addEventListener('input', throttle(onInputOrTextareaData, 500));
refs.formEl.addEventListener('submit', onSubmitForm);

recordingData();
checkOfEnteredData();

function onInputOrTextareaData(evt) {
  userForm[evt.target.name] = evt.target.value;
  saveData(LOCALSTORAGE_KEY, userForm);
}
function checkOfEnteredData() {
  if (refs.textareaEl.value) {
    userForm.message = refs.textareaEl.value;
    saveData(LOCALSTORAGE_KEY, userForm);
  }
  if (refs.inputEl.value) {
    userForm.email = refs.inputEl.value;
    saveData(LOCALSTORAGE_KEY, userForm);
  }
}
function recordingData() {
  const savedData = loadData(LOCALSTORAGE_KEY);

  if (savedData) {
    refs.inputEl.value = savedData.email;
    refs.textareaEl.value = savedData.message;
    return savedData;
  }
}
function onSubmitForm(evt) {
  evt.preventDefault();
  if (!evt.target.email.value || !evt.target.message.value) {
    return;
  }
  console.log(userForm);
  userForm.email = '';
  userForm.message = '';
  removeData(LOCALSTORAGE_KEY);
  evt.target.reset();
}