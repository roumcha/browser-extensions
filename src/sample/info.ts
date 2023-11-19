const title = 'Sample';
const version = '1.0.0';
const url = 'https://example.com';
const author = 'someone';

export const userScriptHeader = `\
// ==UserScript==
// @name         ${title}
// @namespace    ${url}
// @version      ${version}
// @description  Sample User Script
// @author       ${author}
// @match        https://example.com
// @run-at       document-start
// ==/UserScript==
`;
