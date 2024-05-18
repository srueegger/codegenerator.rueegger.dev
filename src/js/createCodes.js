/* Intercept CodeGen Form Submit */
const codeGenForm = document.getElementById('codeGeneratorForm');
if( codeGenForm ) {
  codeGenForm.addEventListener('submit', e => {
    e.preventDefault();
    const codeGenForm = e.target;
    const formData = new FormData(codeGenForm).entries();
    const formDataObj = Object.fromEntries(formData);
    console.log('Form Data Object:', formDataObj);
  });
}
