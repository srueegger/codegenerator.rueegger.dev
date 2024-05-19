[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/srueegger/codegenerator.rueegger.dev/blob/main/README.md)
[![de](https://img.shields.io/badge/lang-de-green.svg)](https://github.com/srueegger/codegenerator.rueegger.dev/blob/main/README.de.md)

# Code Generator

Code Generator is a small service website where users can generate unique codes. Users specify the code pattern (e.g., A-Z or 0-9 + A-Z, etc.), the number of characters a code should have, and the number of codes they need.

These are then generated on-the-fly, and the user can download them as txt, csv, or xlsx.

## Getting Started

To get started with Code Generator, simply visit [https://codegenerator.rueegger.dev](https://codegenerator.rueegger.dev).

## Project Structure

The project uses webpack for bundling and serving the application. The configuration file `webpack.config.js` specifies the development server settings, plugins used, and module rules. 

The `devServer` section configures the development server to serve static files from the 'dist' directory and enables hot reloading. 

The `plugins` section includes plugins for handling HTML files, extracting CSS, and managing favicons.

The `module` section defines rules for handling different types of assets. For instance, it includes a rule for handling SVG files as resources and generating them with a specific filename pattern. It also includes a rule for processing SCSS files, extracting CSS, resolving CSS imports and URLs, and processing CSS with PostCSS.

## License

This project is licensed under the terms of the MIT license.

## Usage

Visit [https://codegenerator.rueegger.dev](https://codegenerator.rueegger.dev), specify your desired code pattern, the number of characters each code should have, and the number of codes you need. The codes will be generated on-the-fly and you can download them in txt, csv, or xls format.