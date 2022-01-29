(function () {
  const picker = document.querySelector('#color-picker');
  const els = document.querySelectorAll('.bg-custom-color');
  picker.addEventListener('change', function (e) {
    els.forEach(function (el) {
      el.style.backgroundColor = e.target.value;
    });
  });
})();
