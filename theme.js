window.theme = {};

/**
 * 静态资源请求 URL 添加参数
 * @params {string} url 资源请求 URL
 * @return {string} 返回添加参数后的 URL
 */
window.theme.addURLParam = function (
    url,
    param = {
        t: Date.now().toString(),
        v: window.siyuan.config.appearance.themeVer,
    },
) {
    switch (true) {
        case url.startsWith('//'):
            url = new URL(`https:${url}`);
            break;
        case url.startsWith('http://'):
        case url.startsWith('https://'):
            url = new URL(url);
            break;
        case url.startsWith('/'):
            url = new URL(url, window.location.origin);
            break;
        default:
            url = new URL(url, window.location.origin + window.location.pathname);
            break;
    }
    for (let [key, value] of Object.entries(param)) {
        url.searchParams.set(key, value);
    }
    return url.href.substring(url.origin.length);
}

/**
 * 加载 meta 标签
 * @params {object} attributes 属性键值对
 */
window.theme.loadMeta = function (attributes) {
    let meta = document.createElement('meta');
    for (let [key, value] of Object.entries(attributes)) {
        meta.setAttribute(key, value);
    }
    document.head.insertBefore(meta, document.head.firstChild);
}

/**
 * 加载脚本文件
 * @params {string} url 脚本地址
 * @params {string} type 脚本类型
 */
window.theme.loadScript = function (src, type = 'module', async = false, defer = false) {
    let script = document.createElement('script');
    if (type) script.setAttribute('type', type);
    if (async) script.setAttribute('async', true);
    if (defer) script.setAttribute('defer', true);
    script.setAttribute('src', src);
    document.head.appendChild(script);
}

/**
 * 加载样式文件
 * @params {string} href 样式地址
 * @params {string} id 样式 ID
 */
window.theme.loadStyle = function (href, id = null) {
    let style = document.createElement('link');
    if (id) style.setAttribute('id', id);
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', href);
    document.head.appendChild(style);
}

/**
 * 更新样式文件
 * @params {string} id 样式文件 ID
 * @params {string} href 样式文件地址
 */
window.theme.updateStyle = function (id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute('href', href);
    }
    else {
        window.theme.loadStyle(href, id);
    }
}

window.theme.ID_COLOR_STYLE = 'theme-color-style';
window.theme.ID_CUSTOM_STYLE = 'custom-color-style';

/**
 * 获取主题模式
 * @return {string} light 或 dark
 */
window.theme.themeMode = (() => {
    /* 根据浏览器主题判断颜色模式 */
    // switch (true) {
    //     case window.matchMedia('(prefers-color-scheme: light)').matches:
    //         return 'light';
    //     case window.matchMedia('(prefers-color-scheme: dark)').matches:
    //         return 'dark';
    //     default:
    //         return null;
    // }
    /* 根据配置选项判断主题 */
    switch (window.siyuan.config.appearance.mode) {
        case 0:
            return 'light';
        case 1:
            return 'dark';
        default:
            return null;
    }
})();

/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith('/stage/build/app'):
            return 'app';
        case url.pathname.startsWith('/stage/build/desktop'):
            return 'desktop';
        case url.pathname.startsWith('/stage/build/mobile'):
            return 'mobile';
        default:
            return null;
    }
})();

/**
 * 获取语言模式
 * @return {string} 'zh_CN', 'zh_CNT', 'fr_FR', 'en_US'
 */
window.theme.languageMode = (() => window.siyuan.config.lang)();

/**
 * 获取操作系统
 */
window.theme.OS = (() => window.siyuan.config.system.os)();

/**
 * 更换主题模式
 * @params {string} lightStyle 浅色主题配置文件路径
 * @params {string} darkStyle 深色主题配置文件路径
 * @params {string} customLightStyle 浅色主题自定义配置文件路径
 * @params {string} customDarkStyle 深色主题自定义配置文件路径
 */
window.theme.changeThemeMode = function (
    lightStyle,
    darkStyle,
    customLightStyle,
    customDarkStyle,
) {
    let href_color = null;
    let href_custom = null;
    switch (window.theme.themeMode) {
        case 'light':
            href_color = lightStyle;
            href_custom = customLightStyle;
            break;
        case 'dark':
        default:
            href_color = darkStyle;
            href_custom = customDarkStyle;
            break;
    }
    window.theme.updateStyle(window.theme.ID_COLOR_STYLE, href_color);
    window.theme.updateStyle(window.theme.ID_CUSTOM_STYLE, href_custom);
}

/* 禁用缓存(无效) */
// window.theme.loadMeta({
//     "http-equiv": "Pragma",
//     "content": "no-cache",
// });
// window.theme.loadMeta({
//     "http-equiv": "Cache-Control",
//     "content": "no-cache, no-store, must-revalidate",
// });
// window.theme.loadMeta({
//     "http-equiv": "Expires",
//     "content": "0",
// });

/* 根据当前主题模式加载样式配置文件 */
window.theme.changeThemeMode(
    `/appearance/themes/Dark+/style/color/light.css`,
    `/appearance/themes/Dark+/style/color/dark.css`,
    `/widgets/custom-light.css`,
    `/widgets/custom-dark.css`,
);

/* 加载 HTML 块中使用的小工具 */
window.theme.loadScript("/appearance/themes/Dark+/script/module/html.js", "text/javascript");

/* 加载主题功能 */
window.theme.loadScript("/appearance/themes/Dark+/script/module/background.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/blockattrs.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/doc.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/dock.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/goto.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/invert.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/location.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/menu.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/readonly.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/reload.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/style.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/timestamp.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/typewriter.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/wheel.js");
window.theme.loadScript("/appearance/themes/Dark+/script/module/window.js");

/* 加载独立应用 */
window.theme.loadScript("/appearance/themes/Dark+/app/comment/index.js");

/* 加载自定义配置文件 */
window.theme.loadScript("/widgets/custom.js");

/* 加载测试模块 */
// window.theme.loadScript("/appearance/themes/Dark+/script/test/listener.js");
