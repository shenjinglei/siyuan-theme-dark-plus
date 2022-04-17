/* 背景图片 */

import { config } from './config.js';
import { isKey } from './../utils/hotkey.js';
import {
    toolbarItemInit,
} from './../utils/ui.js';
import {
    shuffle,
    Iterator,
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

function switchBackground(lightIter, darkIter) {
    // console.log(customBackground);
    switch (window.theme.themeMode) {
        case 'light':
            changeBackground(lightIter.next().value);
            break;
        case 'dark':
        default:
            changeBackground(darkIter.next().value);
            break;
    }
}

setTimeout(() => {
    try {
        if (config.theme.background.enable) {
            if (config.theme.background.image.enable) {
                if (config.theme.background.image.web.enable) {
                    const WEB_LIGHT_ITER = config.theme.background.image.web.random
                        ? Iterator(shuffle(config.theme.background.image.web.light.slice()), true)
                        : Iterator(config.theme.background.image.web.light.slice(), true);
                    const WEB_DARK_ITER = config.theme.background.image.web.random
                        ? Iterator(shuffle(config.theme.background.image.web.dark.slice()), true)
                        : Iterator(config.theme.background.image.web.dark.slice(), true);

                    let Fn_webBackground = toolbarItemInit(
                        config.theme.background.image.web.toolbar,
                        () => switchBackground(WEB_LIGHT_ITER, WEB_DARK_ITER),
                    );

                    // 随机背景图片
                    window.addEventListener('keyup', (e) => {
                        // console.log(e);
                        if (isKey(e, config.theme.hotkeys.background.image.web)) {
                            Fn_webBackground();
                        }
                    }, true);
                }
                if (config.theme.background.image.custom.enable) {
                    const CUSTOM_LIGHT_ITER = config.theme.background.image.custom.random
                        ? Iterator(shuffle(config.theme.background.image.custom.light.slice()), true)
                        : Iterator(config.theme.background.image.custom.light.slice(), true);
                    const CUSTOM_DARK_ITER = config.theme.background.image.custom.random
                        ? Iterator(shuffle(config.theme.background.image.custom.dark.slice()), true)
                        : Iterator(config.theme.background.image.custom.dark.slice(), true);

                    let Fn_customBackground = toolbarItemInit(
                        config.theme.background.image.custom.toolbar,
                        () => switchBackground(CUSTOM_LIGHT_ITER, CUSTOM_DARK_ITER),
                        2,
                    );
                    // 是否默认启用自定义背景图片
                    if (config.theme.background.image.custom.default) Fn_customBackground();

                    // 使用快捷键切换自定义背景图片
                    window.addEventListener('keyup', (e) => {
                        // console.log(e);
                        if (isKey(e, config.theme.hotkeys.background.image.custom)) {
                            Fn_customBackground();
                        }
                    }, true);
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}, 0);
