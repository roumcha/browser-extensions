import * as InfoNav from './infonav';
import * as MQ768 from './mediaquery768';

export interface StyleFixingOptions {
  fetchFunc: (url: string) => Promise<string>;
}

export function fixStyle(options: StyleFixingOptions): void {
  if (document.head.classList.contains('style-fixed')) return;
  document.head.classList.add('style-fixed');

  // トップページとかが 767.x px で壊れるやつ
  if (location.href.startsWith('https://atcoder.jp')) {
    MQ768.fix(options.fetchFunc);
  }

  // PC で AtCoderInfo のメニューが開かないやつ
  if (location.href.startsWith('https://info.atcoder.jp')) {
    InfoNav.fix();
  }
}
