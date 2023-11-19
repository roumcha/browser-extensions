import { fixStyle } from './lib';

fixStyle({
  fetchFunc: (url) =>
    GM.xmlHttpRequest({ method: 'GET', url }).then(
      (response) => response.responseText
    ),
});
