import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';

let dataForm = {};

onDownload();

form.addEventListener('input', throttle(onSaveFormInput, 500));

form.addEventListener('submit', onFormSubmit);

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
function onSaveFormInput(event) {
  
  dataForm[event.target.name] = event.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataForm));
}

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
function onDownload() {

  try {
    let savedMessaged = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (savedMessaged)

    dataForm = savedMessaged;
    form.email.value = dataForm.email || '';
    form.message.value = dataForm.message || '';
  } catch (error) {
    console.error('Помилка:', error.message);
  }
}

// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
function onFormSubmit(event) {
  event.preventDefault();
  if (!event.target.email.value || !event.target.message.value) {
    alert('Заповніть всі поля форми, будь ласка');
    return;
  }
console.log('Поточні дані полів форми:', dataForm);
  event.target.reset();
  
  localStorage.removeItem(LOCALSTORAGE_KEY);
  dataForm = {}; 
}