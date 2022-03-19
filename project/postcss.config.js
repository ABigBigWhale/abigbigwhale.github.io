const postCssPresetEnv = require("postcss-preset-env")({
    stage: 1,
    preserve: true,
    features: {
        "custom-properties": true,
    },
});

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./hugo_stats.json'],
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements
        return els.tags.concat(els.classes, els.ids)
    },
});

module.exports = {
    plugins: [
        require("postcss-url"),
        require("postcss-import"),
        require("postcss-nested"),
        postCssPresetEnv,
        require("postcss-color-mod-function"),
        require("postcss-mixins"),
        ...(process.env.HUGO_ENVIRONMENT === 'production'
            ? [purgecss] : []),
    ],
}
