
var protocol = require('./protocol')();
const assert = require('assert');

protocol.addMessage( { id:1, message: "ok"} );
protocol.addMessage( { id:2, message: "ok2"} );

let msgCount = 0;
protocol.proceedInput((msg) => {
    msgCount ++;
});

assert(msgCount == 2);
