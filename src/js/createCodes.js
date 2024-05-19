/* Modal Komponente von Bootstrap importieren */
import { Modal } from 'bootstrap';
import * as XLSX from 'xlsx';

/* Intercept CodeGen Form Submit */
const codeGenForm = document.getElementById('codeGeneratorForm');
if (codeGenForm) {
  codeGenForm.addEventListener('submit', e => {
    e.preventDefault();
    const codeGenForm = e.target;
    const formData = new FormData(codeGenForm).entries();
    const formDataObj = Object.fromEntries(formData);
    ModalWindow(formDataObj);
  });
}

/* open Modal Window */
const ModalWindow = async (formDataObj) => {
  const progressModal = new Modal(document.getElementById('progressModal'), {
    keyboard: false,
    backdrop: 'static'
  });
  /* Prepare ProgressBar */
  updateModalProgress(0, formDataObj.codeQuantity);
  /* Show Modal Window */
  await new Promise(resolve => {
    progressModal._element.addEventListener('shown.bs.modal', resolve);
    progressModal.show();
  });
  /* Create Codes */
  const codes = await createUniqeCodes(formDataObj);
  /* Create Textfile */
  const textContent = Array.from(codes).join('\r\n');
  const textfileURL = createOutputFile(textContent, formDataObj.codeOutput);
  const downloadButton = document.getElementById('codeDownload');
  downloadButton.href = textfileURL;
  downloadButton.download = 'codes.' + formDataObj.codeOutput;
  downloadButton.classList.remove('d-none');
};

/* Creates unique Codes */
const createUniqeCodes = async (formDataObj) => {
  const codes = new Set();
  while(codes.size < formDataObj.codeQuantity) {
    const code = createCode(formDataObj.codeLength, formDataObj.codePattern);
    codes.add(code);
    await new Promise(resolve => setTimeout(resolve, 0));
    updateModalProgress(codes.size, formDataObj.codeQuantity);
  };
  return codes;
};

/* Creates a Code from a Pattern */
const createCode = (length, patter) => {
  const charactersLength = patter.length;
  let code = '';
  for (let i = 0; i < length; i++) {
    code += patter.charAt(Math.floor(Math.random() * charactersLength));
  }
  return code;
};

/* Updates the progressbar in Modal Window */
const updateModalProgress = (currentCodes, totalCodes) => {
  const progress = Math.floor((currentCodes / totalCodes) * 100);
  const progressBar = document.getElementById('dynamicProgressBar');
  document.getElementById('totalCodes').textContent = totalCodes;
  document.getElementById('currentCodes').textContent = currentCodes;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);
  progressBar.textContent = `${progress}%`;
};

/* convert string to ArrayBuffer */
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/* create textfile */
const createOutputFile = (textContent, output) => {
  let textFile;
  if(output == 'txt') {
    textFile = new Blob([textContent], { type: 'text/plain' });
  } else if(output == 'csv') {
    textFile = new Blob([textContent], { type: 'text/csv' });
  } else if(output == 'xlsx') {
    /* Format Data */
    const data = textContent.split(/\r?\n/).map(row => row.split(','));
    /* Prepare XLSX-File */
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    textFile = new Blob([s2ab(workbookBinary)], { type: 'application/octet-stream' });
  }
  if(textFile) {
    const textFileURL = URL.createObjectURL(textFile);
    return textFileURL;
  } else {
    throw new Error('Invalid Output Type');
  }
};
