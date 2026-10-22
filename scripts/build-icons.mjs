#!/usr/bin/env node

/**
 * Reusable SVG Icon Library Build System
 * 
 * - Downloads official technology logos (Python, JavaScript, TypeScript, Flutter, Dart, Node.js, Express.js, MySQL, Git, GitHub, HTML5, CSS3, Supabase, Next.js, NumPy, PostgreSQL, Nodemon)
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
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Library',
    brandColor: '#4DABCF',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#4DABCF" d="m55.012 26.006-21.38-10.789L10.154 26.93l21.969 11.027Zm9.808 4.951L87.241 42.28 63.982 53.955l-22-11.043Zm29.948-15.581 23.037 11.552L97.2 37.272 74.735 25.938ZM84.853 10.4 64.113 0 43.598 10.24 64.97 21.014ZM68.64 99.702V128l25.122-12.537-.023-28.31ZM93.727 77.27l-.028-28.012-25.06 12.458V89.74Zm30.158-5.246v28.41l-21.43 10.69-.017-28.279zm0-9.935V34.25l-21.47 10.673.016 28.068z"/>
  <path fill="#4c75cf" d="m59.77 61.716-16.918-8.512V89.97s-20.7-44.033-22.612-47.99c-.246-.513-1.263-1.07-1.522-1.209-3.731-1.947-14.603-7.45-14.603-7.45v64.977l15.04 8.063V72.382s20.478 39.346 20.689 39.78c.214.429 2.257 4.57 4.459 6.028 2.92 1.939 15.458 9.477 15.458 9.477z"/>`
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    brandColor: '#336791',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.543-56.287-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.209 5.214.558 10.079 1.621 12.948 1.063 2.868 2.317 10.256 12.191 8.14 8.252-1.764 14.561-4.309 15.136-27.985"/><path d="M75.458 125.256c-4.367 0-7.211-1.689-8.938-3.32-2.607-2.46-3.641-5.629-4.259-7.522l-.267-.79c-1.244-3.358-1.666-8.193-1.916-14.419-.038-.935-.064-1.898-.093-2.919-.021-.747-.047-1.684-.085-2.664a18.8 18.8 0 01-4.962 1.568c-3.079.526-6.389.356-9.84-.507-2.435-.609-4.965-1.871-6.407-3.82-4.203 3.681-8.212 3.182-10.396 2.453-3.853-1.285-7.301-4.896-10.542-11.037-2.309-4.375-4.542-10.075-6.638-16.943-3.65-11.96-5.969-24.557-6.175-28.693C4.292 23.698 7.777 14.44 15.296 9.129 27.157.751 45.128 5.678 51.68 7.915c4.402-2.653 9.581-3.944 15.433-3.851 3.143.051 6.136.327 8.916.823 2.9-.912 8.628-2.221 15.185-2.139 12.081.144 22.092 4.852 28.949 13.615 4.894 6.252 2.474 19.381.597 26.651-2.642 10.226-7.271 21.102-12.957 30.57 1.544.011 3.781-.174 6.961-.831 6.274-1.295 8.109 2.069 8.607 3.575 1.995 6.042-6.677 10.608-9.382 11.864-3.466 1.609-9.117 2.589-13.745 2.377l-.202-.013-1.216-.107-.12 1.014-.116.991c-.311 11.999-2.025 19.598-5.552 24.619-3.697 5.264-8.835 6.739-13.361 7.709-1.544.33-2.947.474-4.219.474zm-9.19-43.671c2.819 2.256 3.066 6.501 3.287 14.434.028.99.054 1.927.089 2.802.106 2.65.355 8.855 1.327 11.477.137.371.26.747.39 1.146 1.083 3.316 1.626 4.979 6.309 3.978 3.931-.843 5.952-1.599 7.534-3.851 2.299-3.274 3.585-9.86 3.821-19.575l4.783.116-4.75-.57.14-1.186c.455-3.91.783-6.734 3.396-8.602 2.097-1.498 4.486-1.353 6.389-1.01-2.091-1.58-2.669-3.433-2.823-4.193l-.399-1.965 1.121-1.663c6.457-9.58 11.781-21.354 14.609-32.304 2.906-11.251 2.02-17.226 1.134-18.356-11.729-14.987-32.068-8.799-34.192-8.097l-.359.194-1.8.335-.922-.191c-2.542-.528-5.366-.82-8.393-.869-4.756-.08-8.593 1.044-11.739 3.431l-2.183 1.655-2.533-1.043c-5.412-2.213-21.308-6.662-29.696-.721-4.656 3.298-6.777 9.76-6.305 19.207.156 3.119 2.275 14.926 5.771 26.377 4.831 15.825 9.221 21.082 11.054 21.693.32.108 1.15-.537 1.976-1.529a270.708 270.708 0 0110.694-12.07l2.77-2.915 3.349 2.225c1.35.897 2.839 1.406 4.368 1.502l7.987-6.812-1.157 11.808c-.026.265-.039.626.065 1.296l.348 2.238-1.51 1.688-.174.196 4.388 2.025 1.836-2.301z"/><path fill="#336791" d="M115.731 77.44c-13.925 2.873-14.882-1.842-14.882-1.842 14.703-21.816 20.849-49.51 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967-6.301-.103-11.08 1.652-14.707 4.402 0 0-44.684-18.408-42.606 23.151.442 8.842 12.672 66.899 27.26 49.363 5.332-6.412 10.483-11.834 10.483-11.834 2.559 1.699 5.622 2.567 8.833 2.255l.25-.212c-.078.796-.042 1.575.1 2.497-3.758 4.199-2.654 4.936-10.167 6.482-7.602 1.566-3.136 4.355-.22 5.084 3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.18 2.507 7.672 2.334 13.557-.174 5.885-.29 9.926.871 13.082 1.16 3.156 2.316 10.256 12.192 8.14 8.252-1.768 12.528-6.351 13.124-13.995.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.639-.602 11.514-1.938 6.19-2.871 9.861-7.667 3.758-6.408z"/><path fill="#fff" d="M75.957 122.307c-8.232 0-10.84-6.519-11.907-9.185-1.562-3.907-1.899-19.069-1.551-31.503a1.59 1.59 0 011.64-1.55 1.594 1.594 0 011.55 1.639c-.401 14.341.168 27.337 1.324 30.229 1.804 4.509 4.54 8.453 12.275 6.796 7.343-1.575 10.093-4.359 11.318-11.46.94-5.449 2.799-20.951 3.028-24.01a1.593 1.593 0 011.71-1.472 1.597 1.597 0 011.472 1.71c-.239 3.185-2.089 18.657-3.065 24.315-1.446 8.387-5.185 12.191-13.794 14.037-1.463.313-2.792.453-4 .454zM31.321 90.466a6.71 6.71 0 01-2.116-.35c-5.347-1.784-10.44-10.492-15.138-25.885-3.576-11.717-5.842-23.947-6.041-27.922-.589-11.784 2.445-20.121 9.02-24.778 13.007-9.216 34.888-.44 35.813-.062a1.596 1.596 0 01-1.207 2.955c-.211-.086-21.193-8.492-32.768-.285-5.622 3.986-8.203 11.392-7.672 22.011.167 3.349 2.284 15.285 5.906 27.149 4.194 13.742 8.967 22.413 13.096 23.79.648.216 2.62.873 5.439-2.517A245.272 245.272 0 0145.88 73.046a1.596 1.596 0 012.304 2.208c-.048.05-4.847 5.067-10.077 11.359-2.477 2.979-4.851 3.853-6.786 3.853zm69.429-13.445a1.596 1.596 0 01-1.322-2.487c14.863-22.055 20.08-48.704 15.612-54.414-5.624-7.186-13.565-10.939-23.604-11.156-7.433-.16-13.341 1.738-14.307 2.069l-.243.099c-.971.305-1.716-.227-1.997-.849a1.6 1.6 0 01.631-2.025c.046-.027.192-.089.429-.176l-.021.006.021-.007c1.641-.601 7.639-2.4 15.068-2.315 11.108.118 20.284 4.401 26.534 12.388 2.957 3.779 2.964 12.485.019 23.887-3.002 11.625-8.651 24.118-15.497 34.277-.306.457-.81.703-1.323.703zm.76 10.21c-2.538 0-4.813-.358-6.175-1.174-1.4-.839-1.667-1.979-1.702-2.584-.382-6.71 3.32-7.878 5.208-8.411-.263-.398-.637-.866-1.024-1.349-1.101-1.376-2.609-3.26-3.771-6.078-.182-.44-.752-1.463-1.412-2.648-3.579-6.418-11.026-19.773-6.242-26.612 2.214-3.165 6.623-4.411 13.119-3.716C97.6 28.837 88.5 10.625 66.907 10.271c-6.494-.108-11.82 1.889-15.822 5.93-8.96 9.049-8.636 25.422-8.631 25.586a1.595 1.595 0 11-3.19.084c-.02-.727-.354-17.909 9.554-27.916C53.455 9.272 59.559 6.96 66.96 7.081c13.814.227 22.706 7.25 27.732 13.101 5.479 6.377 8.165 13.411 8.386 15.759.165 1.746-1.088 2.095-1.341 2.147l-.576.013c-6.375-1.021-10.465-.312-12.156 2.104-3.639 5.201 3.406 17.834 6.414 23.229.768 1.376 1.322 2.371 1.576 2.985.988 2.396 2.277 4.006 3.312 5.3.911 1.138 1.7 2.125 1.982 3.283.131.23 1.99 2.98 13.021.703 2.765-.57 4.423-.083 4.93 1.45.997 3.015-4.597 6.532-7.694 7.97-2.775 1.29-7.204 2.106-11.036 2.106zm-4.696-4.021c.35.353 2.101.962 5.727.806 3.224-.138 6.624-.839 8.664-1.786 2.609-1.212 4.351-2.567 5.253-3.492l-.5.092c-7.053 1.456-12.042 1.262-14.828-.577a6.162 6.162 0 01-.54-.401c-.302.119-.581.197-.78.253-1.58.443-3.214.902-2.996 5.105zm-45.562 8.915c-1.752 0-3.596-.239-5.479-.71-1.951-.488-5.24-1.957-5.19-4.37.057-2.707 3.994-3.519 5.476-3.824 5.354-1.103 5.703-1.545 7.376-3.67.488-.619 1.095-1.39 1.923-2.314 1.229-1.376 2.572-2.073 3.992-2.073.989 0 1.8.335 2.336.558 1.708.708 3.133 2.42 3.719 4.467.529 1.847.276 3.625-.71 5.006-3.237 4.533-7.886 6.93-13.443 6.93zm-7.222-4.943c.481.372 1.445.869 2.518 1.137 1.631.408 3.213.615 4.705.615 4.546 0 8.196-1.882 10.847-5.594.553-.774.387-1.757.239-2.274-.31-1.083-1.08-2.068-1.873-2.397-.43-.178-.787-.314-1.115-.314-.176 0-.712 0-1.614 1.009a41.146 41.146 0 00-1.794 2.162c-2.084 2.646-3.039 3.544-9.239 4.821-1.513.31-2.289.626-2.674.835zm12.269-7.36a1.596 1.596 0 01-1.575-1.354 8.218 8.218 0 01-.08-.799c-4.064-.076-7.985-1.82-10.962-4.926-3.764-3.927-5.477-9.368-4.699-14.927.845-6.037.529-11.366.359-14.229-.047-.796-.081-1.371-.079-1.769.003-.505.013-1.844 4.489-4.113 1.592-.807 4.784-2.215 8.271-2.576 5.777-.597 9.585 1.976 10.725 7.246 3.077 14.228.244 20.521-1.825 25.117-.385.856-.749 1.664-1.04 2.447l-.257.69c-1.093 2.931-2.038 5.463-1.748 7.354a1.595 1.595 0 01-1.335 1.819l-.244.02zM42.464 42.26l.062 1.139c.176 2.974.504 8.508-.384 14.86-.641 4.585.759 9.06 3.843 12.276 2.437 2.542 5.644 3.945 8.94 3.945h.068c.369-1.555.982-3.197 1.642-4.966l.255-.686c.329-.884.714-1.74 1.122-2.646 1.991-4.424 4.47-9.931 1.615-23.132-.565-2.615-1.936-4.128-4.189-4.627-4.628-1.022-11.525 2.459-12.974 3.837zm9.63-.677c-.08.564 1.033 2.07 2.485 2.271 1.449.203 2.689-.975 2.768-1.539.079-.564-1.033-1.186-2.485-1.388-1.451-.202-2.691.092-2.768.656zm2.818 2.826l-.407-.028c-.9-.125-1.81-.692-2.433-1.518-.219-.29-.576-.852-.505-1.354.101-.736.999-1.177 2.4-1.177.313 0 .639.023.967.069.766.106 1.477.327 2.002.62.91.508.977 1.075.936 1.368-.112.813-1.405 2.02-2.96 2.02zm-2.289-2.732c.045.348.907 1.496 2.029 1.651l.261.018c1.036 0 1.81-.815 1.901-1.082-.096-.182-.762-.634-2.025-.81a5.823 5.823 0 00-.821-.059c-.812 0-1.243.183-1.345.282zm43.605-1.245c.079.564-1.033 2.07-2.484 2.272-1.45.202-2.691-.975-2.771-1.539-.076-.564 1.036-1.187 2.486-1.388 1.45-.203 2.689.092 2.769.655zm-2.819 2.56c-1.396 0-2.601-1.086-2.7-1.791-.115-.846 1.278-1.489 2.712-1.688.316-.044.629-.066.93-.066 1.238 0 2.058.363 2.14.949.053.379-.238.964-.739 1.492-.331.347-1.026.948-1.973 1.079l-.37.025zm.943-3.013c-.276 0-.564.021-.856.061-1.441.201-2.301.779-2.259 1.089.048.341.968 1.332 2.173 1.332l.297-.021c.787-.109 1.378-.623 1.66-.919.443-.465.619-.903.598-1.052-.028-.198-.56-.49-1.613-.49zm3.965 32.843a1.594 1.594 0 01-1.324-2.483c3.398-5.075 2.776-10.25 2.175-15.255-.257-2.132-.521-4.337-.453-6.453.07-2.177.347-3.973.614-5.71.317-2.058.617-4.002.493-6.31a1.595 1.595 0 113.186-.172c.142 2.638-.197 4.838-.525 6.967-.253 1.643-.515 3.342-.578 5.327-.061 1.874.178 3.864.431 5.97.64 5.322 1.365 11.354-2.691 17.411a1.596 1.596 0 01-1.328.708z"/>`
  },
  {
    id: 'nodemon',
    name: 'Nodemon',
    category: 'Tool',
    brandColor: '#76D04B',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodemon/nodemon-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: `<path fill="#76d04b" d="M61.061 125.21a5.863 5.863 0 0 0 5.867 0l48.606-28.048a5.867 5.867 0 0 0 2.936-5.085V35.938a5.876 5.876 0 0 0-2.933-5.084L66.932 2.783a5.876 5.876 0 0 0-5.874 0l-48.593 28.07a5.874 5.874 0 0 0-2.935 5.085V92.08a5.866 5.866 0 0 0 2.936 5.081L61.06 125.21"/>
  <path fill="#4f4d3f" d="M95.468 50.618 93.3 49.371c3.334-4.917 5.325-12.308 2.828-23.36 0 0-5.625 15.765-16.931 15.243l-13.24-7.62a3.451 3.451 0 0 0-1.624-.471h-.305a3.506 3.506 0 0 0-1.63.472l-13.24 7.619c-11.306.523-16.932-15.242-16.932-15.242-2.499 11.05-.504 18.442 2.829 23.359l-2.168 1.247a3.572 3.572 0 0 0-1.785 3.098l.065 45.73c0 .639.33 1.23.89 1.54.548.33 1.225.33 1.77 0l17.54-10.043c1.11-.66 1.785-1.822 1.785-3.093V66.486a3.55 3.55 0 0 1 1.78-3.086l7.467-4.3a3.523 3.523 0 0 1 1.787-.482c.608 0 1.232.157 1.773.48l7.466 4.301a3.55 3.55 0 0 1 1.783 3.086V87.85c0 1.271.683 2.443 1.786 3.093l17.534 10.043c.55.33 1.238.33 1.783 0 .543-.31.885-.902.885-1.54l.057-45.73a3.557 3.557 0 0 0-1.783-3.098z"/>`
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'Tool',
    brandColor: '#F37036',
    sourceUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'Cloud',
    brandColor: '#3448C5',
    sourceUrl: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cloudinary.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'jwt',
    name: 'JWT',
    category: 'Security',
    brandColor: '#D63AFF',
    sourceUrl: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jsonwebtokens.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'zod',
    name: 'Zod',
    category: 'Validation',
    brandColor: '#3E67B1',
    sourceUrl: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zod.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'dotenv',
    name: 'Dotenv',
    category: 'Configuration',
    brandColor: '#ECD53F',
    sourceUrl: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dotenv.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'laragon',
    name: 'Laragon',
    category: 'Tool',
    brandColor: '#0E83CD',
    sourceUrl: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/laragon.svg',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'mysql2',
    name: 'MySQL2',
    category: 'Database',
    brandColor: '#F29111',
    sourceUrl: '',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'mysqlworkbench',
    name: 'MySQL Workbench',
    category: 'Database',
    brandColor: '#00618A',
    sourceUrl: '',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  },
  {
    id: 'bcrypt',
    name: 'Bcrypt',
    category: 'Security',
    brandColor: '#2B5B84',
    sourceUrl: '',
    normalize(inner) {
      return { defs: '', body: inner };
    },
    fallbackDefs: '',
    fallbackBody: ''
  }
];

export const CATEGORY_MAP = {
  python: 'languages',
  javascript: 'languages',
  typescript: 'languages',
  dart: 'languages',
  html5: 'frontend',
  css3: 'frontend',
  flutter: 'frontend',
  nextjs: 'frontend',
  nodejs: 'backend',
  express: 'backend',
  jwt: 'backend',
  zod: 'backend',
  dotenv: 'backend',
  bcrypt: 'backend',
  mysql: 'database',
  mysql2: 'database',
  mysqlworkbench: 'database',
  postgresql: 'database',
  supabase: 'database',
  cloudinary: 'cloud',
  git: 'tools',
  github: 'tools',
  laragon: 'tools',
  nodemon: 'tools',
  numpy: 'tools',
  postman: 'tools'
};

/**
 * Fetch or retrieve normalized icon components
 */
export async function getIconContent(iconConfig) {
  // Check local file in ICONS_DIR first to reuse vetted local vectors
  try {
    const localPath = path.join(ICONS_DIR, `${iconConfig.id}.svg`);
    const localRaw = await fs.readFile(localPath, 'utf8');
    let clean = localRaw.replace(/<\?xml[^>]*\?>/gi, '')
                        .replace(/<!DOCTYPE[^>]*>/gi, '')
                        .replace(/<!--[\s\S]*?-->/g, '');
    const defs = [];
    clean = clean.replace(/<defs>([\s\S]*?)<\/defs>/gi, (_, d) => {
      defs.push(d);
      return '';
    });
    const innerMatch = clean.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const inner = innerMatch ? innerMatch[1].trim() : clean.trim();
    return {
      id: iconConfig.id,
      name: iconConfig.name,
      category: iconConfig.category,
      brandColor: iconConfig.brandColor,
      defs: defs.join('\n    '),
      body: inner,
      isApproximation: false
    };
  } catch {
    // continue to fetch/fallback
  }

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
 * Generate a standalone, text-free banner: a black rectangle with a
 * seamlessly scrolling row of icons and a fade at both edges.
 *
 * No <text> elements are emitted. The marquee is driven by a CSS
 * animation inside the file, and the edge fade is a luminance mask.
 */
export function formatBannerSvg(selectedIcons, options = {}) {
  const theme = options.theme || 'dark';
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#000000' : '#ffffff';
  const maskVisible = '#FFFFFF';

  const width = options.width || 1212;
  const height = options.height || 128;
  const iconSize = options.iconSize || 64;
  const pitch = options.pitch || 128;
  const fadeWidth = options.fadeWidth || Math.round(width * 0.06);
  const speed = options.speed || 60; // pixels per second

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
  const setWidth = count * pitch;
  // Repeat the icon set enough times that the track always covers the viewport.
  const repeats = Math.max(2, Math.ceil((width + setWidth) / setWidth));
  const duration = Math.max(12, Math.round(setWidth / speed));

  const iconY = (height - iconSize) / 2;
  const uses = [];
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < count; i++) {
      const icon = selectedIcons[i];
      const x = (r * count + i) * pitch + (pitch - iconSize) / 2;
      uses.push(`      <use href="#banner-${icon.id}" xlink:href="#banner-${icon.id}" x="${x.toFixed(2)}" y="${iconY.toFixed(2)}" width="${iconSize}" height="${iconSize}"/>`);
    }
  }

  const fadePercent = Math.min(45, Math.max(1, (fadeWidth / width) * 100));

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="banner-fade-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="${fadePercent.toFixed(3)}%" stop-color="${maskVisible}"/>
      <stop offset="${(100 - fadePercent).toFixed(3)}%" stop-color="${maskVisible}"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <mask id="banner-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#banner-fade-grad)"/>
    </mask>
    ${allDefs.join('\n    ')}
${symbols.join('\n')}
  </defs>

  <!-- Background: black rectangle, sharp corners -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}"/>

  <!-- Scrolling icons, faded at both edges by the mask -->
  <g mask="url(#banner-fade)">
    <g>
      <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0 0" to="-${setWidth} 0" dur="${duration}s" repeatCount="indefinite"/>
${uses.join('\n')}
    </g>
  </g>
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
 * Escape XML special characters in text and attribute strings
 */
export function escapeXml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Comprehensive SVG Validator
 */
export function validateSvg(svgString, filename = 'svg') {
  const errors = [];

  // 1. Root tag check
  const trimmed = svgString.trim();
  if (!trimmed.startsWith('<svg') || !trimmed.endsWith('</svg>')) {
    errors.push('Root tag must be <svg>...</svg>');
  }

  // Namespace checks
  const rootTagMatch = trimmed.match(/^<svg\b[^>]*>/i);
  const rootTag = rootTagMatch ? rootTagMatch[0] : '';
  if (!rootTag.includes('xmlns="http://www.w3.org/2000/svg"')) {
    errors.push('Root <svg> missing xmlns="http://www.w3.org/2000/svg"');
  }

  const hasXlinkHref = /xlink:href\s*=/i.test(svgString);
  if (hasXlinkHref && !rootTag.includes('xmlns:xlink="http://www.w3.org/1999/xlink"')) {
    errors.push('xlink:href used without xmlns:xlink="http://www.w3.org/1999/xlink" on root <svg>');
  }

  // 2. Prohibited elements and external references
  if (/<script\b/i.test(svgString)) {
    errors.push('Prohibited <script> tag detected');
  }
  if (/<foreignObject\b/i.test(svgString)) {
    errors.push('Prohibited <foreignObject> tag detected');
  }
  if (/@import\b/i.test(svgString)) {
    errors.push('Prohibited CSS @import detected');
  }

  const imageMatches = [...svgString.matchAll(/<image\b[^>]*>/gi)];
  for (const img of imageMatches) {
    if (/(?:href|xlink:href)=["']https?:\/\//i.test(img[0])) {
      errors.push('External <image> reference detected');
    }
  }

  // Check all href / xlink:href
  const allHrefs = [...svgString.matchAll(/(?:href|xlink:href)=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const href of allHrefs) {
    if (!href.startsWith('#')) {
      errors.push(`External or invalid href reference detected: "${href}"`);
    }
  }

  // Check all url()
  const allUrls = [...svgString.matchAll(/url\(([^)]+)\)/gi)].map(m => m[1].replace(/["']/g, '').trim());
  for (const u of allUrls) {
    if (!u.startsWith('#')) {
      errors.push(`External or invalid url() reference detected: "${u}"`);
    }
  }

  // 3. Check for references to external sprite.svg
  if (/sprite\.svg/i.test(svgString)) {
    errors.push('External reference to sprite.svg detected');
  }

  // 4. No <?xml ...?> or <!DOCTYPE> in the middle, and no unescaped &
  const xmlDeclMatches = [...svgString.matchAll(/<\?xml/gi)];
  if (xmlDeclMatches.length > 0 && !trimmed.startsWith('<?xml')) {
    errors.push('<?xml declaration in middle of file');
  }
  if (/<!DOCTYPE/gi.test(svgString)) {
    errors.push('<!DOCTYPE declaration detected in SVG');
  }

  const unescapedAmp = [...svgString.matchAll(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g)];
  if (unescapedAmp.length > 0) {
    errors.push(`Found ${unescapedAmp.length} unescaped '&' character(s) in SVG`);
  }

  // 5. Check duplicate ID attributes
  const allIds = [...svgString.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]);
  const seenIds = new Set();
  const duplicateIds = new Set();
  for (const id of allIds) {
    if (seenIds.has(id)) {
      duplicateIds.add(id);
    }
    seenIds.add(id);
  }
  if (duplicateIds.size > 0) {
    errors.push(`Duplicate id attributes: ${[...duplicateIds].join(', ')}`);
  }

  // 6. Base64 and data: URI checks
  if (/data:(?!image\/svg\+xml)[^"'\s)]+/i.test(svgString)) {
    errors.push('Suspicious data: URI detected in SVG');
  }

  const vbMatch = svgString.match(/viewBox="([^"]+)"/);
  if (!vbMatch && !svgString.includes('style="display: none;"')) {
    errors.push('Missing viewBox');
  }

  // Check resolved internal ID references
  const urlRefs = [...svgString.matchAll(/url\(#([^)]+)\)/g)].map(m => m[1]);
  const useRefs = [...svgString.matchAll(/(?:href|xlink:href)="#([^"]+)"/g)].map(m => m[1]);
  const idSet = new Set(allIds);

  for (const ref of urlRefs) {
    if (!idSet.has(ref)) errors.push(`Unresolved url(#${ref}) reference`);
  }
  for (const ref of useRefs) {
    if (!idSet.has(ref)) errors.push(`Unresolved href="#${ref}" reference`);
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

    const subfolder = CATEGORY_MAP[iconData.id];
    if (subfolder) {
      const subDir = path.join(ICONS_DIR, subfolder);
      await fs.mkdir(subDir, { recursive: true });
      await fs.writeFile(path.join(subDir, `${iconData.id}.svg`), svgContent, 'utf8');
    }
  }

  console.log('[3/5] Generating SVG sprite assets/svg/sprite.svg...');
  const spriteContent = formatSpriteSvg(iconsData);
  await fs.writeFile(SPRITE_PATH, spriteContent, 'utf8');

  console.log('[4/5] Generating standalone banners...');
  const HEADER_ICON_IDS = [
    'typescript', 'javascript', 'python', 'dart',
    'nextjs', 'flutter', 'html5', 'css3',
    'nodejs', 'express', 'postgresql', 'mysql', 'supabase'
  ];
  const FOOTER_ICON_IDS = [
    'jwt', 'bcrypt', 'zod', 'dotenv',
    'mysqlworkbench', 'mysql2', 'cloudinary', 'numpy',
    'git', 'github', 'postman', 'laragon', 'nodemon'
  ];

  const headerIconsData = HEADER_ICON_IDS.map(id => iconsData.find(i => i.id === id)).filter(Boolean);
  const footerIconsData = FOOTER_ICON_IDS.map(id => iconsData.find(i => i.id === id)).filter(Boolean);

  const headerBannerContent = formatBannerSvg(headerIconsData, { theme: 'dark' });
  const footerBannerContent = formatBannerSvg(footerIconsData, { theme: 'dark' });

  const headerBannerPath = path.join(BANNERS_DIR, 'header-banner.svg');
  const footerBannerPath = path.join(BANNERS_DIR, 'footer-banner.svg');

  await fs.writeFile(headerBannerPath, headerBannerContent, 'utf8');
  await fs.writeFile(footerBannerPath, footerBannerContent, 'utf8');

  // Remove legacy tech-stack.svg
  const legacyBannerPath = path.join(BANNERS_DIR, 'tech-stack.svg');
  try {
    await fs.unlink(legacyBannerPath);
  } catch {}

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

  const headerVal = validateSvg(headerBannerContent, 'header-banner.svg');
  if (!headerVal.valid) {
    console.error(`  FAIL: assets/svg/banners/header-banner.svg: ${headerVal.errors.join(', ')}`);
    totalErrors++;
  }

  const footerVal = validateSvg(footerBannerContent, 'footer-banner.svg');
  if (!footerVal.valid) {
    console.error(`  FAIL: assets/svg/banners/footer-banner.svg: ${footerVal.errors.join(', ')}`);
    totalErrors++;
  }

  if (totalErrors === 0) {
    console.log(`\nSuccess! All ${iconsData.length} icons, sprite, header-banner, and footer-banner verified valid.`);
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
    // node scripts/build-icons.mjs banner --icons=python,javascript --output=assets/svg/banners/custom.svg
    const iconsArg = args.find(a => a.startsWith('--icons='))?.split('=')[1] || '';
    const outArg = args.find(a => a.startsWith('--output='))?.split('=')[1] || 'assets/svg/banners/custom-banner.svg';
    const themeArg = args.find(a => a.startsWith('--theme='))?.split('=')[1] || 'dark';

    const reqIds = iconsArg ? iconsArg.split(',').map(s => s.trim().toLowerCase()) : ICONS.map(i => i.id);
    const targetConfigs = ICONS.filter(i => reqIds.includes(i.id) || (i.id === 'postgresql' && reqIds.includes('postgressql')));

    const iconsData = [];
    for (const c of targetConfigs) {
      iconsData.push(await getIconContent(c));
    }

    const bannerSvg = formatBannerSvg(iconsData, { theme: themeArg });
    const fullOut = path.resolve(ROOT_DIR, outArg);
    await fs.mkdir(path.dirname(fullOut), { recursive: true });
    await fs.writeFile(fullOut, bannerSvg, 'utf8');
    const val = validateSvg(bannerSvg, outArg);
    console.log(`Custom banner written to ${outArg} (${val.valid ? 'VALID' : 'INVALID: ' + val.errors.join(', ')})`);
  } else if (cmd === 'verify') {
    // Verification only
    console.log('Verifying SVG files in assets/svg/...');
    async function getSvgFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files = [];
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...await getSvgFiles(full));
        } else if (entry.name.endsWith('.svg')) {
          files.push(full);
        }
      }
      return files;
    }

    const iconFiles = await getSvgFiles(ICONS_DIR);
    let ok = true;
    for (const file of iconFiles) {
      const rel = path.relative(ICONS_DIR, file);
      const content = await fs.readFile(file, 'utf8');
      const val = validateSvg(content, rel);
      if (!val.valid) {
        console.error(`  FAIL ${rel}: ${val.errors.join('; ')}`);
        ok = false;
      } else {
        console.log(`  OK   ${rel}`);
      }
    }
    const spriteContent = await fs.readFile(SPRITE_PATH, 'utf8');
    const sVal = validateSvg(spriteContent, 'sprite.svg');
    console.log(`  ${sVal.valid ? 'OK  ' : 'FAIL'} sprite.svg`);

    for (const bName of ['header-banner.svg', 'footer-banner.svg']) {
      const bPath = path.join(BANNERS_DIR, bName);
      try {
        const bContent = await fs.readFile(bPath, 'utf8');
        const bVal = validateSvg(bContent, bName);
        console.log(`  ${bVal.valid ? 'OK  ' : 'FAIL'} ${bName}`);
      } catch {
        console.error(`  FAIL ${bName}: file not found`);
      }
    }
  }
}
