## Features

This tool addresses the following issues that occur when viewing the AtCoder website on a PC:

### Viewing [AtCoder's homepage](https://atcoder.jp/home) at a window width of 767.x px causes display distortion

It re-downloads the CSS files used on the page and applies it to widths ranging from 767 to 768 px.

Note: External communication occurs to download CSS files.

### Long contest name causes multi-line nav on contest page

With a window width >991.95 px, a long contest name causes the multi-line navigation bar to block the tab bar.

Address this by omitting the long contest name.

### When viewing [AtCoderInfo](https://info.atcoder.jp/) with a narrow window width, the top menu does not open

It rearranges the menu to match the display when the width is wide.
