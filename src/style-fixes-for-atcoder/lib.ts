import * as InfoNav from './infonav';
import * as MQ768 from './mediaquery768';
import * as MultiLineNav from './multi-line-nav';

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

  // コンテスト名が長いとき nav が複数行になるやつ
  if (location.href.startsWith('https://atcoder.jp/contests/')) {
    MultiLineNav.fix();
  }

  // PC で AtCoderInfo のメニューが開かないやつ
  if (location.href.startsWith('https://info.atcoder.jp')) {
    InfoNav.fix();
  }
}
