/* Import CSS */
import '../scss/styles.scss';

/* Import JS */
//import * as bootstrap from 'bootstrap';

/* Set Theme Color Mode */
const setTheme = () => {
  document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
};

/* Set Color Scheme, on Page Loading */
setTheme();

/* Detect if user chnages between Dark and Light Mode */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setTheme());