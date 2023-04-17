
var fs = require("fs");
let fsquery = {
    write: function (filename, data) {
        fs.appendFileSync(filename, data+"\n", 'UTF-8');
    },
    clean: function (filename) {
        fs.writeFileSync(filename, "", 'UTF-8');
    }
};

module.exports = fsquery;
