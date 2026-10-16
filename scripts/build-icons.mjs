#!/usr/bin/env node

/**
 * Reusable SVG Icon Library Build System
 * 
 * - Downloads official technology logos (Python, JavaScript, TypeScript, Flutter, Dart, Node.js, Express.js, MySQL, Git, GitHub)
 * - Normalizes viewBox (0 0 128 128) and whitespace without distortion
 * - Scopes internal IDs to prevent collisions in sprites and embedded SVGs
 * - Generates individual reusable SVG files under `assets/svg/icons/`
 * - Generates a self-contained SVG sprite under `assets/svg/sprite.svg`
 * - Generates standalone SVG banners under `assets/svg/banners/`
 * - Provides CLI commands to build, generate custom icons, generate custom banners, and verify SVGs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'assets', 'svg', 'icons');
const BANNERS_DIR = path.join(ROOT_DIR, 'assets', 'svg', 'banners');
const SPRITE_PATH = path.join(ROOT_DIR, 'assets', 'svg', 'sprite.svg');

// Official Technology Icon Registry
export const ICONS = [
  {
    id: 'python',
    name: 'Python',
    category: 'Language',
    brandColor: '#3776AB',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    normalize(inner) {
      inner = inner.replaceAll('python-original-a', 'icon-python-grad-a');
      inner = inner.replaceAll('python-original-b', 'icon-python-grad-b');
      inner = inner.replaceAll('python-original-c', 'icon-python-grad-c');
      const defs = [];
      inner = inner.replace(/<(linearGradient|radialGradient)[\s\S]*?<\/\1>/gi, (m) => {
        defs.push(m);
        return '';
      }).trim();
      return { defs: defs.join('\n    '), body: inner };
    },
    fallbackDefs: `<linearGradient id="icon-python-grad-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient>
    <linearGradient id="icon-python-grad-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient>
    <radialGradient id="icon-python-grad-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"/><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"/></radialGradient>`,
    fallbackBody: `<path fill="url(#icon-python-grad-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
  <path fill="url(#icon-python-grad-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
  <path opacity=".444" fill="url(#icon-python-grad-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/>`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Language',
    brandColor: '#F7DF1E',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
  <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    brandColor: '#3178C6',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    normalize(inner) {
      inner = inner.replace(/\s*data-name="original"/g, '');
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/>
  <path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/>`
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Framework',
    brandColor: '#02569B',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg',
    normalize(inner) {
      inner = inner.replaceAll('flutter-original-a', 'icon-flutter-grad-a');
      const defs = [];
      inner = inner.replace(/<linearGradient[\s\S]*?<\/linearGradient>/gi, (m) => {
        defs.push(m);
        return '';
      }).trim();
      return { defs: defs.join('\n    '), body: inner };
    },
    fallbackDefs: `<linearGradient id="icon-flutter-grad-a" gradientUnits="userSpaceOnUse" x1="59.365" y1="116.36" x2="86.825" y2="99.399"><stop offset="0" stop-color="#1b4e94"/><stop offset=".63" stop-color="#1a5497"/><stop offset="1" stop-color="#195a9b"/></linearGradient>`,
    fallbackBody: `<g fill="#3FB6D3"><path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"/></g>
  <path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z"/>
  <path fill="#19599A" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z"/>
  <path fill="url(#icon-flutter-grad-a)" d="M61.6 113.1l30.8-8.4-10.8-10.8z"/>`
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Language',
    brandColor: '#0175C2',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#00c4b3" d="M35.2 34.9l-8.3-8.3v59.7l.1 2.8c0 1.3.2 2.8.7 4.3l65.6 23.1 16.3-7.2-74.4-74.4z"/>
  <path d="M27.7 93.4zm81.9 15.9l-16.3 7.2-65.4-23.1c1.3 4.8 4 10.1 7 13.2l21.3 21.2 47.6.1 5.8-18.6z" fill="#22d3c5"/>
  <path fill="#0075c9" d="M1.7 65.1C-.4 67.3.7 72 4 75.5l14.7 14.8 9.2 3.3c-.3-1.5-.7-3-.7-4.3l-.1-2.8-.2-59.8m82.7 82.6l7.2-16.4-23-65.6c-1.5-.3-3-.6-4.3-.7l-2.9-.1-59.6.1"/>
  <path d="M93.6 27.3c.2 0 .2 0 0 0 .2 0 .2 0 0 0zm16 82l17.7-5.8V54.8l-20.4-20.5c-3-3-8.3-5.8-13.2-7l23.1 65.6" fill="#00a8e1"/>
  <path fill="#00c4b3" d="M90.5 18.2L75.7 3.5c-3.4-3.4-8-4.4-10.4-2.3L26.9 26.6h59.5l2.9.1c1.3 0 2.8.2 4.3.7l-3.1-9.2z"/>`
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Runtime',
    brandColor: '#5FA04E',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    normalize(inner) {
      inner = inner.replaceAll('url(#a)', 'url(#icon-nodejs-grad-a)');
      inner = inner.replaceAll('url(#b)', 'url(#icon-nodejs-grad-b)');
      inner = inner.replaceAll('url(#c)', 'url(#icon-nodejs-grad-c)');
      inner = inner.replaceAll('id="a"', 'id="icon-nodejs-grad-a"');
      inner = inner.replaceAll('id="b"', 'id="icon-nodejs-grad-b"');
      inner = inner.replaceAll('id="c"', 'id="icon-nodejs-grad-c"');
      const defsMatch = inner.match(/<defs>([\s\S]*?)<\/defs>/i);
      let defs = '';
      if (defsMatch) {
        defs = defsMatch[1].trim();
        inner = inner.replace(/<defs>[\s\S]*?<\/defs>/i, '').trim();
      }
      return { defs, body: inner };
    },
    fallbackDefs: `<linearGradient id="icon-nodejs-grad-a" x1="34.513" x2="27.157" y1="15.535" y2="30.448" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop stop-color="#3F873F"/><stop offset=".33" stop-color="#3F8B3D"/><stop offset=".637" stop-color="#3E9638"/><stop offset=".934" stop-color="#3DA92E"/><stop offset="1" stop-color="#3DAE2B"/></linearGradient>
    <linearGradient id="icon-nodejs-grad-b" x1="30.009" x2="50.533" y1="23.359" y2="8.288" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".138" stop-color="#3F873F"/><stop offset=".402" stop-color="#52A044"/><stop offset=".713" stop-color="#64B749"/><stop offset=".908" stop-color="#6ABF4B"/></linearGradient>
    <linearGradient id="icon-nodejs-grad-c" x1="21.917" x2="40.555" y1="22.261" y2="22.261" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".092" stop-color="#6ABF4B"/><stop offset=".287" stop-color="#64B749"/><stop offset=".598" stop-color="#52A044"/><stop offset=".862" stop-color="#3F873F"/></linearGradient>`,
    fallbackBody: `<path fill="url(#icon-nodejs-grad-a)" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z"/>
  <path fill="url(#icon-nodejs-grad-b)" d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z"/>
  <path fill="url(#icon-nodejs-grad-c)" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z"/>`
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Framework',
    brandColor: '#FFFFFF',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    normalize(inner) {
      inner = inner.replace(/fill="[^"]*"/gi, 'fill="#FFFFFF"');
      if (!inner.includes('fill=')) {
        inner = inner.replace(/<path\s+/i, '<path fill="#FFFFFF" ');
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#FFFFFF" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"/>`
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    brandColor: '#00618A',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#00618A" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0"/>`
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    brandColor: '#F05032',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>`
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Platform',
    brandColor: '#181717',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
    normalize(inner) {
      if (!inner.includes('<circle')) {
        inner = `<circle cx="64" cy="64" r="64" fill="#FFFFFF"/>\n  ${inner}`;
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<circle cx="64" cy="64" r="64" fill="#FFFFFF"/>\n  <g fill="#181616"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/></g>`
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Language',
    brandColor: '#E34F26',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-plain.svg',
    normalize(inner) {
      inner = inner.replace(/fill="[^"]*"/gi, 'fill="#E34F26"');
      if (!inner.includes('fill=')) {
        inner = inner.replace(/<path\s+/i, '<path fill="#E34F26" ');
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#E34F26" d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387L118.968 2H9.032zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471-3.233 36.119-.238 2.27L64 102.609v.002l-.034.018-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939l-.33 3.539z"/>`
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Language',
    brandColor: '#1572B6',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-plain.svg',
    normalize(inner) {
      inner = inner.replace(/fill="[^"]*"/gi, 'fill="#1572B6"');
      if (!inner.includes('fill=')) {
        inner = inner.replace(/<path\s+/i, '<path fill="#1572B6" ');
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#1572B6" d="M8.76 1l10.055 112.883 45.118 12.58 45.244-12.626L119.24 1H8.76zm89.591 25.862l-3.347 37.605.01.203-.014.467v-.004l-2.378 26.294-.262 2.336L64 101.607v.001l-.022.019-28.311-7.888L33.75 72h13.883l.985 11.054 15.386 4.17-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041-.63-7.131L29.401 23h69.281l-.331 3.862z"/>`
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Database',
    brandColor: '#3ECF8E',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-plain.svg',
    normalize(inner) {
      inner = inner.replace(/fill="[^"]*"/gi, 'fill="#3ECF8E"');
      if (!inner.includes('fill=')) {
        inner = inner.replace(/<path\s+/i, '<path fill="#3ECF8E" ');
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#3ECF8E" d="M58.061.007a5.45 5.45 0 0 0-4.563 2.126L4.137 64.283c-5.823 7.332-.597 18.148 8.763 18.148h50.98l.549 39.864c0 3.63 2.588 5.704 5.704 5.704 1.556 0 3.111-.524 4.148-2.08l49.314-62.201c6.223-7.26 1.037-18.148-8.307-18.148H63.74l-.264-40.045c-.047-3.288-2.66-5.403-5.409-5.518zm10.527 50.748h46.706c2.593 0 4.148 1.042 5.186 3.635 1.037 2.074.518 4.667-.52 6.222l-49.297 62.191h-.529s-.519 0-.519-.518L68.584 50.75z"/>`
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Framework',
    brandColor: '#FFFFFF',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-plain.svg',
    normalize(inner) {
      inner = inner.replace(/fill="[^"]*"/gi, 'fill="#FFFFFF"');
      if (!inner.includes('fill=')) {
        inner = inner.replace(/<path\s+/i, '<path fill="#FFFFFF" ');
      }
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#FFFFFF" d="M64 0A64 64 0 0 0 0 64a64 64 0 0 0 64 64 64 64 0 0 0 35.508-10.838L47.014 49.34v40.238H38.4V38.4h10.768l57.125 73.584A64 64 0 0 0 128 64 64 64 0 0 0 64 0Zm17.777 38.4h8.534v48.776L81.777 75.97Zm24.18 73.92-.111.096a64 64 0 0 0 .111-.096z"/>`
  }
];

/**
 * Fetch or retrieve normalized icon components
 */
export async function getIconContent(iconConfig) {
  try {
    const res = await fetch(iconConfig.sourceUrl, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();

    let clean = raw.replace(/<\?xml[^>]*\?>/gi, '')
                   .replace(/<!DOCTYPE[^>]*>/gi, '')
                   .replace(/<!--[\s\S]*?-->/g, '');

    const innerMatch = clean.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const inner = innerMatch ? innerMatch[1].trim() : clean.trim();

    const normalized = iconConfig.normalize(inner);
    return {
      id: iconConfig.id,
      name: iconConfig.name,
      category: iconConfig.category,
      brandColor: iconConfig.brandColor,
      defs: normalized.defs,
      body: normalized.body,
      isApproximation: false
    };
  } catch (err) {
    // Graceful fallback to faithful approximation
    return {
      id: iconConfig.id,
      name: iconConfig.name,
      category: iconConfig.category,
      brandColor: iconConfig.brandColor,
      defs: iconConfig.fallbackDefs,
      body: iconConfig.fallbackBody,
      isApproximation: true
    };
  }
}

/**
 * Generate a standalone SVG file string for an individual icon
 */
export function formatIndividualSvg(iconData) {
  const comment = iconData.isApproximation
    ? '  <!-- FAITHFUL APPROXIMATION: Official asset could not be fetched automatically -->\n'
    : '';

  let defsBlock = '';
  if (iconData.defs && iconData.defs.trim().length > 0) {
    defsBlock = `  <defs>\n    ${iconData.defs.trim()}\n  </defs>\n`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
${comment}${defsBlock}  ${iconData.body.trim()}
</svg>
`;
}

/**
 * Generate a self-contained SVG sprite containing all icon symbols
 */
export function formatSpriteSvg(iconsData) {
  const globalDefs = [];
  const symbols = [];

  for (const icon of iconsData) {
    if (icon.defs && icon.defs.trim().length > 0) {
      globalDefs.push(icon.defs.trim());
    }
    const comment = icon.isApproximation
      ? '    <!-- FAITHFUL APPROXIMATION -->\n'
      : '';
    symbols.push(`  <symbol id="${icon.id}" viewBox="0 0 128 128">
${comment}    ${icon.body.trim()}
  </symbol>`);
  }

  const defsSection = globalDefs.length > 0
    ? `  <defs>\n    ${globalDefs.join('\n    ')}\n  </defs>\n`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${defsSection}${symbols.join('\n')}
</svg>
`;
}

/**
 * Generate a standalone banner with embedded icon symbols
 */
export function formatBannerSvg(selectedIcons, options = {}) {
  const title = options.title || 'Technologies & Tools';
  const subtitle = options.subtitle || 'Core Languages, Frameworks, Databases & Version Control';
  const theme = options.theme || 'dark';

  const isDark = theme === 'dark';
  const bgColor1 = isDark ? '#0d1117' : '#ffffff';
  const bgColor2 = isDark ? '#161b22' : '#f6f8fa';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const cardBg = isDark ? '#161b22' : '#ffffff';
  const cardBorder = isDark ? '#30363d' : '#e1e4e8';
  const titleColor = isDark ? '#f0f6fc' : '#1f2328';
  const subtitleColor = isDark ? '#8b949e' : '#656d76';
  const cardTextColor = isDark ? '#f0f6fc' : '#24292f';
  const cardSubColor = isDark ? '#8b949e' : '#57606a';

  const allDefs = [];
  const symbols = [];

  for (const icon of selectedIcons) {
    if (icon.defs && icon.defs.trim().length > 0) {
      allDefs.push(icon.defs.trim());
    }
    symbols.push(`    <symbol id="banner-${icon.id}" viewBox="0 0 128 128">
      ${icon.body.trim()}
    </symbol>`);
  }

  const count = selectedIcons.length;
  const cols = count <= 5 ? count : Math.ceil(count / 2);
  const rows = count <= 5 ? 1 : 2;

  const cardWidth = 152;
  const cardHeight = 54;
  const gapX = 14;
  const gapY = 10;
  const paddingX = 32;

  const width = Math.max(760, paddingX * 2 + cols * cardWidth + (cols - 1) * gapX);
  const headerHeight = 76;
  const height = headerHeight + rows * cardHeight + (rows - 1) * gapY + 28;

  const startY = headerHeight + 6;

  const cardsSvg = selectedIcons.map((icon, idx) => {
    let row = 0;
    let col = idx;
    if (rows === 2) {
      row = idx < cols ? 0 : 1;
      col = idx < cols ? idx : idx - cols;
    }

    const x = paddingX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    return `  <g transform="translate(${x}, ${y})">
    <rect width="${cardWidth}" height="${cardHeight}" rx="10" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1"/>
    <use href="#banner-${icon.id}" x="12" y="10" width="34" height="34"/>
    <text x="54" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="${cardTextColor}">${icon.name}</text>
    <text x="54" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="400" fill="${cardSubColor}">${icon.category}</text>
  </g>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="banner-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgColor1}"/>
      <stop offset="100%" stop-color="${bgColor2}"/>
    </linearGradient>
    <linearGradient id="banner-accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
    ${allDefs.join('\n    ')}
${symbols.join('\n')}
  </defs>

  <!-- Banner Card Background -->
  <rect width="${width}" height="${height}" rx="16" fill="url(#banner-bg)" stroke="${borderColor}" stroke-width="1.5"/>

  <!-- Top Accent Bar -->
  <path d="M 16 1.5 L ${width - 16} 1.5" stroke="url(#banner-accent)" stroke-width="3" stroke-linecap="round"/>

  <!-- Header -->
  <text x="${paddingX}" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19" font-weight="700" fill="${titleColor}">${title}</text>
  <text x="${paddingX}" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="400" fill="${subtitleColor}">${subtitle}</text>

  <!-- Icon Badges -->
${cardsSvg}
</svg>
`;
}

/**
 * Generate a custom geometric SVG icon
 */
export function generateCustomIcon({ id, name, category = 'Custom', brandColor = '#38bdf8', text = 'CUSTOM', shape = 'squircle' }) {
  const initials = text.slice(0, 3).toUpperCase();
  let bgShape = `<rect width="120" height="120" x="4" y="4" rx="28" fill="${brandColor}"/>`;
  if (shape === 'circle') {
    bgShape = `<circle cx="64" cy="64" r="58" fill="${brandColor}"/>`;
  }

  return {
    id,
    name,
    category,
    brandColor,
    defs: '',
    body: `${bgShape}
  <text x="64" y="74" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#ffffff">${initials}</text>`,
    isApproximation: false
  };
}

/**
 * Comprehensive SVG Validator
 */
export function validateSvg(svgString, filename = 'svg') {
  const errors = [];

  if (!svgString.startsWith('<svg') || !svgString.trim().endsWith('</svg>')) {
    errors.push('Root tag must be <svg>...</svg>');
  }

  if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
    errors.push('Missing xmlns="http://www.w3.org/2000/svg"');
  }

  const vbMatch = svgString.match(/viewBox="([^"]+)"/);
  if (!vbMatch && !svgString.includes('style="display: none;"')) {
    errors.push('Missing viewBox');
  }

  const urlRefs = [...svgString.matchAll(/url\(#([^)]+)\)/g)].map(m => m[1]);
  const useRefs = [...svgString.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  const ids = new Set([...svgString.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));

  for (const ref of urlRefs) {
    if (!ids.has(ref)) errors.push(`Unresolved url(#${ref}) reference`);
  }
  for (const ref of useRefs) {
    if (!ids.has(ref)) errors.push(`Unresolved href="#${ref}" reference`);
  }

  // XML Tag balancing checker
  const tagRegex = /<\/?([a-zA-Z0-9:-]+)([^>]*?)(\/?)>/g;
  const stack = [];
  let m;
  while ((m = tagRegex.exec(svgString)) !== null) {
    const isClosing = m[0].startsWith('</');
    const isSelfClosing = m[3] === '/' || m[0].endsWith('/>');
    const tagName = m[1];
    if (isSelfClosing) continue;
    if (isClosing) {
      if (stack.length === 0) {
        errors.push(`Unexpected closing tag </${tagName}>`);
      } else {
        const top = stack.pop();
        if (top !== tagName) errors.push(`Tag mismatch: expected </${top}>, found </${tagName}>`);
      }
    } else {
      stack.push(tagName);
    }
  }
  if (stack.length > 0) errors.push(`Unclosed tags: ${stack.join(', ')}`);

  return { valid: errors.length === 0, errors };
}

/**
 * Main build runner
 */
export async function buildAll() {
  console.log('[1/5] Fetching and normalizing technology icons...');
  await fs.mkdir(ICONS_DIR, { recursive: true });
  await fs.mkdir(BANNERS_DIR, { recursive: true });

  const iconsData = [];
  for (const iconConfig of ICONS) {
    const data = await getIconContent(iconConfig);
    iconsData.push(data);
    const sourceLabel = data.isApproximation ? 'faithful approximation' : 'official source';
    console.log(`  - ${data.name.padEnd(12)} (${sourceLabel})`);
  }

  console.log('[2/5] Writing individual SVG files to assets/svg/icons/...');
  for (const iconData of iconsData) {
    const filePath = path.join(ICONS_DIR, `${iconData.id}.svg`);
    const svgContent = formatIndividualSvg(iconData);
    await fs.writeFile(filePath, svgContent, 'utf8');
  }

  console.log('[3/5] Generating SVG sprite assets/svg/sprite.svg...');
  const spriteContent = formatSpriteSvg(iconsData);
  await fs.writeFile(SPRITE_PATH, spriteContent, 'utf8');

  console.log('[4/5] Generating standalone banners...');
  const bannerContent = formatBannerSvg(iconsData, {
    title: 'Technologies & Tools',
    subtitle: 'Languages, Frameworks, Databases & Version Control'
  });
  const bannerPath = path.join(BANNERS_DIR, 'tech-stack.svg');
  await fs.writeFile(bannerPath, bannerContent, 'utf8');

  console.log('[5/5] Verifying all generated SVGs...');
  let totalErrors = 0;

  for (const icon of iconsData) {
    const filePath = path.join(ICONS_DIR, `${icon.id}.svg`);
    const content = await fs.readFile(filePath, 'utf8');
    const result = validateSvg(content, `${icon.id}.svg`);
    if (!result.valid) {
      console.error(`  FAIL: assets/svg/icons/${icon.id}.svg: ${result.errors.join(', ')}`);
      totalErrors++;
    }
  }

  const spriteVal = validateSvg(spriteContent, 'sprite.svg');
  if (!spriteVal.valid) {
    console.error(`  FAIL: assets/svg/sprite.svg: ${spriteVal.errors.join(', ')}`);
    totalErrors++;
  }

  const bannerVal = validateSvg(bannerContent, 'tech-stack.svg');
  if (!bannerVal.valid) {
    console.error(`  FAIL: assets/svg/banners/tech-stack.svg: ${bannerVal.errors.join(', ')}`);
    totalErrors++;
  }

  if (totalErrors === 0) {
    console.log(`\nSuccess! All ${iconsData.length} icons, sprite, and banner verified valid.`);
  } else {
    throw new Error(`Verification failed with ${totalErrors} errors.`);
  }
}

// CLI handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'build';

  if (cmd === 'build') {
    await buildAll();
  } else if (cmd === 'banner') {
    // Generate custom banner
    // node scripts/build-icons.mjs banner --icons=python,javascript --title="My Stack" --output=assets/svg/banners/custom.svg
    const iconsArg = args.find(a => a.startsWith('--icons='))?.split('=')[1] || '';
    const titleArg = args.find(a => a.startsWith('--title='))?.split('=')[1] || 'Tech Stack';
    const subtitleArg = args.find(a => a.startsWith('--subtitle='))?.split('=')[1];
    const outArg = args.find(a => a.startsWith('--output='))?.split('=')[1] || 'assets/svg/banners/custom-banner.svg';
    const themeArg = args.find(a => a.startsWith('--theme='))?.split('=')[1] || 'dark';

    const reqIds = iconsArg ? iconsArg.split(',').map(s => s.trim().toLowerCase()) : ICONS.map(i => i.id);
    const targetConfigs = ICONS.filter(i => reqIds.includes(i.id));

    const iconsData = [];
    for (const c of targetConfigs) {
      iconsData.push(await getIconContent(c));
    }

    const bannerSvg = formatBannerSvg(iconsData, { title: titleArg, subtitle: subtitleArg, theme: themeArg });
    const fullOut = path.resolve(ROOT_DIR, outArg);
    await fs.mkdir(path.dirname(fullOut), { recursive: true });
    await fs.writeFile(fullOut, bannerSvg, 'utf8');
    const val = validateSvg(bannerSvg, outArg);
    console.log(`Custom banner written to ${outArg} (${val.valid ? 'VALID' : 'INVALID: ' + val.errors.join(', ')})`);
  } else if (cmd === 'verify') {
    // Verification only
    console.log('Verifying SVG files in assets/svg/...');
    const iconFiles = await fs.readdir(ICONS_DIR);
    let ok = true;
    for (const f of iconFiles) {
      if (!f.endsWith('.svg')) continue;
      const content = await fs.readFile(path.join(ICONS_DIR, f), 'utf8');
      const val = validateSvg(content, f);
      if (!val.valid) {
        console.error(`  FAIL ${f}: ${val.errors.join('; ')}`);
        ok = false;
      } else {
        console.log(`  OK   ${f}`);
      }
    }
    const spriteContent = await fs.readFile(SPRITE_PATH, 'utf8');
    const sVal = validateSvg(spriteContent, 'sprite.svg');
    console.log(`  ${sVal.valid ? 'OK  ' : 'FAIL'} sprite.svg`);

    const bannerPath = path.join(BANNERS_DIR, 'tech-stack.svg');
    const bContent = await fs.readFile(bannerPath, 'utf8');
    const bVal = validateSvg(bContent, 'tech-stack.svg');
    console.log(`  ${bVal.valid ? 'OK  ' : 'FAIL'} tech-stack.svg`);
  }
}
