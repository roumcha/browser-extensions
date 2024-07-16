import { editorialsDropdown } from './editorials-dropdown';
import { title, version } from './info';

(async function () {
  console.log(`[EDFA] ${title} v${version} (UserScript) started.`);

  await editorialsDropdown({
    fetchXMLDocument: async (url) =>
      await GM.xmlHttpRequest({ url }).then((res) => res.responseXML),
  });
})();
