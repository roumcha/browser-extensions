export function fix() {
  document.addEventListener('DOMContentLoaded', () => {
    // スマホは修正不要
    if (navigator.userAgent.toLowerCase().includes('mobile')) return;

    const navElement = document.querySelector('#top-editarea header nav')!;
    const logoDiv = navElement.children[0] as HTMLDivElement;
    const hamburgerDiv = navElement.children[1] as HTMLDivElement;
    const menuDiv = navElement.children[2] as HTMLDivElement;

    // ハンバーガーボタンを消す
    hamburgerDiv.remove();

    // メニューを表示
    menuDiv.className = 'flex gap-x-12';
  });
}
