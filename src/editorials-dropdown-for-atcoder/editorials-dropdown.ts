export type Props = {
  fetchXMLDocument: (url: URL) => Promise<Document | null>;
};

export async function editorialsDropdown({
  fetchXMLDocument,
}: Props): Promise<void> {
  const started = Date.now();

  // 言語の判別
  let lang: Language = getLanguage();

  // '解説' ボタンを見つける
  const link: HTMLAnchorElement | undefined =
    findEditorialsButton(document);

  if (link) {
    console.log('[EDFA] Found the target button: ', link);
  } else {
    console.log(`[EDFA] Editorials button not found.`);
    return;
  }

  // 解説ページをダウンロード
  const url = new URL(link.href);
  url.searchParams.set('editorialLang', lang);
  const editorialsPageDoc: Document | null = await fetchXMLDocument(
    url
  ).catch((reason) => {
    console.error(`[EDFA] Failed to fetch ${link.href}: ${reason}`);
    return null;
  });

  if (editorialsPageDoc) {
    console.log(`[EDFA] Downloaded ${link.href}.`);
  } else {
    console.error(`[EDFA] ${link.href} is empty or not an XML document.`);
    return;
  }

  // 解説リストを抽出
  const content: HTMLElement[] = createDropdownContent(editorialsPageDoc);

  if (content.length === 0) {
    console.error(`[EDFA] failed to generate the dropdown content.`);
    return;
  }

  // ドロップダウンを現在のページに挿入
  const insertedElem: HTMLElement = createDropdownAndButton(...content);
  link.after(insertedElem);

  console.log(
    `[EDFA] Successfully generated and inserted a drop-down list: `,
    insertedElem
  );

  console.log(`[EDFA] done in ${Date.now() - started} ms.`);
}

type Language = 'ja' | 'en';

const translation: Record<string, Record<Language, string>> = {
  editorial: {
    ja: '解説',
    en: 'editorial',
  },
  overallEditorial: {
    ja: 'コンテスト全体の解説',
    en: 'overall editorial',
  },
};

/** 言語を判定する */
function getLanguage(): Language {
  // URL のクエリパラメータから
  const param = new URLSearchParams(location.search).get(
    'lang'
  ) as Language | null;

  if (param) {
    console.log(`[EDFA] Found language '${param}' in the URL parameter.`);
    return param;
  }

  // Cookie から
  const cookie = document.cookie
    .split('; ')
    .find((s) => s.startsWith('language='))
    ?.split('=')
    .at(1) as Language | undefined;

  if (cookie) {
    console.log(`[EDFA] Found language '${cookie}' in Cookie.`);
    return cookie;
  }

  // ブラウザから
  const browser = navigator.language;

  if (browser == 'ja') {
    console.log(`[EDFA] Loaded language '${browser}' from the browser.`);
    return 'ja';
  }

  // 英語にフォールバック
  console.log(`[EDFA] Fall back to English.`);
  return 'en';
}

/** 子要素の中から解説ボタンを1つ探し出す */
function findEditorialsButton(
  root: ParentNode
): HTMLAnchorElement | undefined {
  const res = [...root.querySelectorAll<HTMLAnchorElement>('a.btn')]
    .filter(
      ({ textContent }) =>
        textContent &&
        Object.values(translation['editorial']).includes(
          textContent.toLowerCase()
        )
    )
    .at(0);

  return res;
}

/** 解説一覧ページの内容からドロップダウンの中身を作成 */
function createDropdownContent(
  editorialsPageDoc: Document
): HTMLElement[] {
  const res = [
    ...editorialsPageDoc.querySelectorAll<HTMLDivElement>(
      '#main-container > div > div:not(#contest-nav-tabs) > *'
    ),
  ].filter(({ tagName }) =>
    ['ul', 'h3', 'p'].includes(tagName.toLowerCase())
  );

  if (res.length === 0) {
    console.error(`[EDFA] failed to find editorial lists.`);
  }

  return res;
}

/** ドロップダウンメニューをぶら下げた下三角ボタンを生成 */
function createDropdownAndButton(
  ...content: (Node | string)[]
): HTMLSpanElement {
  const res = document.createElement('span');
  res.className = 'edfa-root';
  res.style.position = 'relative';
  res.addEventListener('blur', () => res.classList.remove('open'));
  {
    const button = document.createElement('button');
    button.className = 'edfa-button btn btn-default btn-sm';
    button.type = 'button';
    button.title = 'open editorials list';
    button.onclick = () => res.classList.toggle('open');
    res.append(button);
    {
      const caret = document.createElement('span');
      caret.classList.add('caret');
      button.append(caret);
    }
  }
  {
    const dropdown = document.createElement('div');
    dropdown.className = 'edfa-dropdown dropdown-menu';
    dropdown.style.position = 'absolute';
    dropdown.style.width = '200px';
    dropdown.style.padding = '8px';
    dropdown.append(...content);
    res.append(dropdown);
  }

  return res;
}
