const EMAIL_POST_FORM = 'https://or3fw6rvxb.execute-api.ap-south-1.amazonaws.com/dev/email';

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


(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const prices = {
      'btn-3-months': ['60', '75', 'For 2 months & get an extra month free <br>(3 months total)'],
      'btn-6-months': ['55', '70', 'For 4 months & get an extra two months free <br>(6 months total)'],
      'btn-12-months': ['50', '65', 'For 6 months & get an extra three months free <br>(9 months total)'],
    }
    const durationButtons = document.getElementsByClassName('btn-duration');
    const acePackText = document.getElementById('ace-pack-box').getElementsByClassName('price')[0],
      stdPackText = document.getElementById('std-pack-box').getElementsByClassName('price')[0],
      extraMonthTexts = document.getElementsByClassName('extra-month');
    for (const button of durationButtons) {
      button.addEventListener('click', function (clickEvent) {
        if (clickEvent.target.classList.contains('btn-primary')) return;
        for (const btnPrimary of clickEvent.target.parentElement.getElementsByClassName('btn-primary')) {
          btnPrimary.classList.remove('btn-primary');
          btnPrimary.classList.add('btn-secondary');
        }
        clickEvent.target.classList.remove('btn-secondary');
        clickEvent.target.classList.add('btn-primary');
        const [std, ace, additional] = prices[clickEvent.target.id];
        stdPackText.innerText = std;
        acePackText.innerText = ace;
        for (const item of extraMonthTexts) {
          item.innerHTML = additional;
        }
      });
    }
  });
})();
