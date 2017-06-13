const eslint = require('eslint');
const opts = './eslintrc.js';


module.exports = function() {
    const engine = new eslint.CLIEngine( opts );
    const report = engine.executeOnFiles( ['.'] );
    const results = report.results || [];

    const formatter = require('eslint-friendly-formatter');
    const output = formatter(results);

    // this will print the report if any...
    if (output) {
        console.log(output);
        process.exit(-1);
    }
};
