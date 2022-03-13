const EMAIL_POST_FORM = 'https://or3fw6rvxb.execute-api.ap-south-1.amazonaws.com/dev/email';

(function () {
  const picker = document.querySelector('#color-picker');
  const els = document.querySelectorAll('.bg-custom-color');
  const svgPaths = document.querySelectorAll('path');
  picker.addEventListener('change', function (e) {
    const value = e.target.value
    els.forEach(function (el) {
      el.style.backgroundColor = value;
    });
    svgPaths.forEach(function (p) {
      p.setAttribute('fill', value)
    })
  });
})();

(function () {
  const inputEmail = document.querySelector('input#email');
  const inputSubject = document.querySelector('input#subject');
  const textareaText = document.querySelector('textarea#text');
  const form = document.querySelector('form#email-form');
  const loading = document.querySelector('.loading');
  const btnSubmit = document.querySelector('#email-submit');
  const success = document.querySelector('.sent-message');
  const error = document.querySelector('.error-message');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = inputEmail.value;
    const subject = inputSubject.value;
    const text = textareaText.value;
    loading.style.display = 'block';
    btnSubmit.style.display = 'none';
    fetch(EMAIL_POST_FORM, {
      method: 'post',
      body: JSON.stringify({ email, subject, text })
    }).then(function () {
      loading.style.display = 'none';
      btnSubmit.style.display = 'block';
      success.style.display = 'block';
      inputEmail.value = '';
      inputSubject.value = '';
      textareaText.value = '';
      setTimeout(() => {
        success.style.display = 'none';
      }, 4000);
    }).catch(function (err) {
      loading.style.display = 'none';
      btnSubmit.style.display = 'block';
      error.innerText = `Error: ${err}`;
      error.style.display = 'block';
      setTimeout(() => {
        error.innerText = '';
        error.style.display = 'none';
      }, 4000);
    });
  });
})();
