/* 背景图片 */

import { config } from './config.js';
import { isKey } from './../utils/hotkey.js';
import {
    shuffle,
    createLookIterator,
} from './../utils/misc.js';

function changeBackground(background, mode = 'image') {
    // console.log(background);
    let element = document.querySelector('.fn__flex-1.protyle.fullscreen') || document.body;
    switch (mode) {
        case 'color':
            element.style.backgroundColor = ``;
            element.style.backgroundColor = `${background}`;
            break;
        case 'image':
        default:
            element.style.backgroundImage = ``;
            element.style.backgroundImage = `url("${background}")`;
            break;
    }
}

function randomBackground() {
    // console.log(randomBackground);
    switch (window.themeMode()) {
        case 'light':
            changeBackground(config.theme.background.image.random.light);
            break;
        case 'dark':
        default:
            changeBackground(config.theme.background.image.random.dark);
            break;
    }
}

function customBackground(lightIter, darkIter) {
    // console.log(customBackground);
    switch (window.themeMode()) {
        case 'light':
            changeBackground(lightIter.next().value);
            break;
        case 'dark':
        default:
            changeBackground(darkIter.next().value);
            break;
    }
}

(() => {
    try {
        if (config.theme.background.enable) {
            let body = document.body;
            if (config.theme.background.image.enable) {
                if (config.theme.background.image.random.enable) {
                    // 随机背景图片
                    body.addEventListener('keyup', (e) => {
                        // console.log(e);
                        if (isKey(e, config.theme.hotkeys.background.image.random)) {
                            setTimeout(randomBackground, 0);
                        }
                    });
                }
                if (config.theme.background.image.custom.enable) {
                    const light_iter = createLookIterator(shuffle(config.theme.background.image.custom.light.slice()));
                    const dark_iter = createLookIterator(shuffle(config.theme.background.image.custom.dark.slice()));
                    // 自定义背景图片
                    body.addEventListener('keyup', (e) => {
                        // console.log(e);
                        if (isKey(e, config.theme.hotkeys.background.image.custom)) {
                            setTimeout(() => customBackground(light_iter, dark_iter), 0);
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
})();
