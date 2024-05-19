[![de](https://img.shields.io/badge/lang-de-green.svg)](https://github.com/srueegger/codegenerator.rueegger.dev/blob/main/README.de.md)
[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/srueegger/codegenerator.rueegger.dev/blob/main/README.md)

# Code Generator

Code Generator ist eine kleine Service-Website, auf der Benutzer eindeutige Codes generieren können. Benutzer geben das Code-Muster an (z.B. A-Z oder 0-9 + A-Z usw.), die Anzahl der Zeichen, die ein Code haben soll, und die Anzahl der Codes, die sie benötigen.

Diese werden dann on-the-fly generiert und der Benutzer kann sie als txt, csv oder xlsx herunterladen.

## Erste Schritte

Um mit Code Generator zu beginnen, besuchen Sie einfach [https://codegenerator.rueegger.dev](https://codegenerator.rueegger.dev).

## Projektstruktur

Das Projekt verwendet webpack zum Bündeln und Bereitstellen der Anwendung. Die Konfigurationsdatei `webpack.config.js` gibt die Einstellungen des Entwicklungsservers, die verwendeten Plugins und die Modulregeln an.

Der Abschnitt `devServer` konfiguriert den Entwicklungsserver so, dass er statische Dateien aus dem Verzeichnis 'dist' bereitstellt und Hot Reloading ermöglicht.

Der Abschnitt `plugins` enthält Plugins zum Umgang mit HTML-Dateien, zum Extrahieren von CSS und zum Verwalten von Favicons.

Der Abschnitt `module` definiert Regeln zum Umgang mit verschiedenen Arten von Assets. Beispielsweise enthält er eine Regel zum Umgang mit SVG-Dateien als Ressourcen und zum Generieren von ihnen mit einem spezifischen Dateinamenmuster. Es enthält auch eine Regel zum Verarbeiten von SCSS-Dateien, zum Extrahieren von CSS, zum Auflösen von CSS-Importen und URLs und zum Verarbeiten von CSS mit PostCSS.

## Lizenz

Dieses Projekt ist unter den Bedingungen der MIT-Lizenz lizenziert.

## Verwendung

Besuchen Sie [https://codegenerator.rueegger.dev](https://codegenerator.rueegger.dev), geben Sie Ihr gewünschtes Code-Muster an, die Anzahl der Zeichen, die jeder Code haben soll, und die Anzahl der Codes, die Sie benötigen. Die Codes werden on-the-fly generiert und Sie können sie im txt-, csv- oder xls-Format herunterladen.