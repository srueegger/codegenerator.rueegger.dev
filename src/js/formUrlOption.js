document.addEventListener('DOMContentLoaded', (event) => {
  const urlCheckboxField = document.getElementById('addURL');
  if (urlCheckboxField) {
    urlCheckboxField.addEventListener('change', () => {
      const urlField = document.getElementById('urlField');
      if (urlField) {
        if (urlCheckboxField.checked) {
          urlField.classList.remove('d-none');
          /* Set Field to required */
          urlField.querySelector('input').setAttribute('required', '');
        } else {
          urlField.classList.add('d-none');
          /* Remove required attribute */
          urlField.querySelector('input').removeAttribute('required');
        }
      }
    });
  }
});