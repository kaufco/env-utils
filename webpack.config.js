const path = require('path');

module.exports = [{
    name: 'browser-test',
    entry: './test/index.web.spec.js',
    mode: 'production',
    output: {
        path: path.resolve('test/browser'),
        filename: 'test.js'
    }
}]
