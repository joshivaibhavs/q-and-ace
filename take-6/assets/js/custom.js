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
