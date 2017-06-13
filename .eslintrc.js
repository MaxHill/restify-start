module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'google',

    // add your custom rules here
    'rules': {
        "indent": ["error", 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
