/* Modal Komponente von Bootstrap importieren */
import { Modal } from 'bootstrap';

/* Intercept CodeGen Form Submit */
const codeGenForm = document.getElementById('codeGeneratorForm');
if( codeGenForm ) {
  codeGenForm.addEventListener('submit', e => {
    e.preventDefault();
    const codeGenForm = e.target;
    const formData = new FormData(codeGenForm).entries();
    const formDataObj = Object.fromEntries(formData);
    ModalWindow( formDataObj );
  });
}

/* Modal Window öffnen */
const ModalWindow = ( formDataObj ) => {
  const progressModal = new Modal(document.getElementById('progressModal'), {
    keyboard: false,
    backdrop: 'static'
  });
  /* Set correct number of total codes in progressModal */
  document.getElementById('totalCodes').textContent = formDataObj.codeQuantity;
  /* Show Modal Window */
  progressModal.show();
  console.log('Form Data Object:', formDataObj);
};