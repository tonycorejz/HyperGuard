const nextTranslate = require('next-translate');

module.exports = nextTranslate({
    reactStrictMode: true,
    i18n: {
        localeDetection: true,
        locales: ['en', 'default'],
        defaultLocale: 'default'
    },
    trailingSlash: true,
});
