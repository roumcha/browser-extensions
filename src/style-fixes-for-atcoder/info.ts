const title = 'Style Fixes for AtCoder';
const version = '2023.11.0';
const url =
  'https://github.com/roumcha/browser-extensions/tree/main/src/style-fixes-for-atcoder';
const author = 'Roumcha';

export const userScriptHeader = `\
// ==UserScript==
// @name         ${title}
// @namespace    ${url}
// @version      ${version}
// @description  Forced attempt to fix AtCoder web pages corruption at 967.x px width.
// @author       ${author}
// @match        https://atcoder.jp/*
// @grant        GM.xmlHttpRequest
// @connect      img.atcoder.jp
// @run-at       document-start
// ==/UserScript==
`;
