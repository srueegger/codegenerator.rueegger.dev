/* Global Variables */
let utils;
let write;

/* Function to load XLSX Library */
const loadXlsx = async () => {
  const xlsx = await import('xlsx');
  utils = xlsx.utils;
  write = xlsx.write;
};

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

/* Close Modal Windows after Download File */
const closeModalAfterDownload = (progressModal) => {
  const downloadButton = document.getElementById('codeDownload');
  downloadButton.addEventListener('click', () => {
    // Close the modal after a small delay to ensure the download starts
    setTimeout(() => {
      progressModal.hide();
    }, 100);
  });
};

/* open Modal Window */
const ModalWindow = async (formDataObj) => {
  /* Prepare Modal */
  const { Modal } = await import('bootstrap');
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
  const textfileURL = await createOutputFile(textContent, formDataObj.codeOutput);
  const downloadButton = document.getElementById('codeDownload');
  downloadButton.href = textfileURL;
  downloadButton.download = 'codes.' + formDataObj.codeOutput;
  downloadButton.classList.remove('d-none');
  /* Set up event listener to close modal after download */
  closeModalAfterDownload(progressModal);
};

/* Creates unique Codes */
const createUniqeCodes = async (formDataObj) => {
  /* Prüfen ob eine Datei hochgeladen wurde */
  const codes = new Set();
  if(formDataObj.addFileField instanceof File && formDataObj.addFileField.name !== '') {
    await new Promise((resolve, reject) => {
      const file = document.getElementById('addFileField').files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        const fileLines = reader.result.split(/\r?\n/);
        fileLines.forEach((line) => {
          const splitLine = line.split(',');
          codes.add(splitLine[0]);
        });
        /* Code Quantity neu berechnen */
        formDataObj.codeQuantity = parseInt(formDataObj.codeQuantity) + parseInt(codes.size);
        resolve();
      };
      reader.onerror = (error) => reject(error);
    });
  }
  while(codes.size < formDataObj.codeQuantity) {
    let code = createCode(formDataObj.codeLength, formDataObj.codePattern);
    /* Check if URL Field is enabled */
    if (formDataObj.addURL) {
      let set_complete_url = formDataObj.codeURL + code;
      /* Modify Code */
      code = code + ',' + set_complete_url;
    }
    codes.add(code);
    await new Promise(resolve => setTimeout(resolve, 0));
    updateModalProgress(codes.size, formDataObj.codeQuantity);
  }
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
const createOutputFile = async (textContent, output) => {
  let textFile;
  if(output === 'txt') {
    textFile = new Blob([textContent], { type: 'text/plain' });
  } else if(output === 'csv') {
    textFile = new Blob([textContent], { type: 'text/csv' });
  } else if(output === 'xlsx') {
    await loadXlsx();
    /* Format Data */
    const data = textContent.split(/\r?\n/).map(row => row.split(','));
    /* Prepare XLSX-File */
    const worksheet = utils.aoa_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const workbookBinary = write(workbook, { bookType: 'xlsx', type: 'binary' });
    textFile = new Blob([s2ab(workbookBinary)], { type: 'application/octet-stream' });
  }
  if(textFile) {
    return URL.createObjectURL(textFile);
  } else {
    throw new Error('Invalid Output Type');
  }
};
