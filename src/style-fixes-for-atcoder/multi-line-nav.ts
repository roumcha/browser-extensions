export function fix() {
  window.addEventListener('DOMContentLoaded', () => {
    const styleElement = document.createElement('style');

    styleElement.textContent = `
      @media screen and (991px < width){
        .nav .contest-title {
          width: calc((100vw - 80px - 253px) * 0.9);
          text-wrap: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    `;

    document.head.insertAdjacentElement('afterbegin', styleElement);
  });
}
