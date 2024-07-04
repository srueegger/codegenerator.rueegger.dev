document.addEventListener('DOMContentLoaded', (event) => {
  const urlCheckboxFields = document.querySelectorAll('.js_show_hide_field');
  urlCheckboxFields.forEach((urlCheckboxField) => {
    urlCheckboxField.addEventListener('change', () => {
      const show_hide_field = urlCheckboxField.getAttribute('data-change');
      const field = document.querySelector(show_hide_field);
      if (field) {
        if (urlCheckboxField.checked) {
          field.classList.remove('d-none');
          /* Set Field to required */
          field.querySelector('input').setAttribute('required', '');
        } else {
          field.classList.add('d-none');
          /* Remove required attribute */
          field.querySelector('input').removeAttribute('required');
        }
      }
    });
  });
});