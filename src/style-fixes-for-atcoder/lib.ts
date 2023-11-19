export interface StyleFixingOptions {
  fetchFunc: (url: string) => Promise<string>;
}

export function fixStyle(options: StyleFixingOptions): void {
  if (document.head.classList.contains('style-fixed')) return;
  document.head.classList.add('style-fixed');

  mitigateLayoutShift();

  window.onload = () => {
    overwriteStyleElements();
    overrideLinkElements(options.fetchFunc);
  };
}

function modifyCss(css: string): string {
  // @media に奇数ピクセルが指定されている => 0.95 を足す
  return css.replace(/(@media[^{]+[0-9]+[13579])()(px[^{]*{)/g, '$1.95$3');
}

/** レイアウトシフトを軽減する */
function mitigateLayoutShift(): void {
  const styleElement = document.createElement('style');

  styleElement.textContent = `
    @media screen and (767.0px < width < 768.0px){
      .header-logo > img {
        max-width: 40px !important;
      }
      .keyvisual-logo > img {
        max-width: 67px !important;
      }
    }
  `;

  document.head.insertAdjacentElement('afterbegin', styleElement);
}

/** \<style\> の中身を上書き */
function overwriteStyleElements(): void {
  for (const styleElement of document.head.getElementsByTagName('style')) {
    if (styleElement.textContent) {
      styleElement.textContent = modifyCss(styleElement.textContent);
    }
  }
}

/** \<link rel="stylesheet"\> の href をフェッチし、\<style\> を作って上書き */
function overrideLinkElements(
  requestFunc: (url: string) => Promise<string>
): void {
  for (const linkElement of document.head.getElementsByTagName('link')) {
    if (linkElement.rel !== 'stylesheet') continue;
    if (!linkElement.href.includes('atcoder')) continue;
    if (linkElement.href.includes('bootstrap')) continue;

    requestFunc(linkElement.href).then((response) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = modifyCss(response);
      linkElement.insertAdjacentElement('afterend', styleElement);
    });
  }
}
