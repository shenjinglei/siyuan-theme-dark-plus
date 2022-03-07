/** 使用形如 id=<块 ID> 的 URL 参数跳转到指定的块
 *  REF [leolee9086](https://github.com/leolee9086)
 */

import { config } from '/appearance/themes/Dark+/script/module/config.js';

function goto(id) {
    let doc = window.document
    // console.log(doc)
    let link = doc.createElement("span")
    link.setAttribute("data-type", "block-ref")
    link.setAttribute("data-id", id)
    let target = doc.querySelector(".protyle-wysiwyg div[data-node-id] div[contenteditable]")
    if (target) {
        target.appendChild(link)
        link.click()
        link.remove()
    }
    else {
        setTimeout(async () => goto(id), 1000)
    }
}

function jumpToID() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get('id');

    if (id.test(/\d{14}\-[0-9a-z]{7}/)) {
        goto(id)
    }
}

(() => {
    try {
        if (config.goto.enable) {
            window.onload = setTimeout(jumpToID, 0)
        }
    } catch (err) {
        console.error(err);
    }
})();
