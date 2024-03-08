# Japanese

## 機能

PCでAtCoderのウェブサイトを表示する際に発生する、以下の問題にゴリ押しで対処しています。

### ウィンドウ幅 767.x px で[AtCoderのホームページ](https://atcoder.jp/home)を閲覧すると、表示が崩れる

ページ内で使用されているCSSを再ダウンロードし、767 ～ 768 px にも適用します。

注）CSSをダウンロードするため、外部との通信が発生します

### 狭いウィンドウ幅で[AtCoderInfo](https://info.atcoder.jp/)を閲覧すると、上部のメニューが開かない

メニューをバラして幅が広いときと同じ表示にします。

# English

## Features

This tool addresses the following issues that occur when viewing the AtCoder website on a PC:

### Viewing [AtCoder's homepage](https://atcoder.jp/home) at a window width of 767.x px causes display distortion

It re-downloads the CSS files used on the page and applies it to widths ranging from 767 to 768 px.

Note: External communication occurs to download CSS.

### When viewing [AtCoderInfo](https://info.atcoder.jp/) with a narrow window width, the top menu does not open

It rearranges the menu to match the display when the width is wide.
