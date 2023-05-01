// Author: pdulvp
// Get process.stdin as the standard input object.

var protocol = require('./protocol')();
protocol.start(handleMessage);

function handleMessage(json) {
    if (json.length == 0) {
        return;
    }
    let element = json[0];
    let ruleModule = null;
    try {
        ruleModule = require('./rule-'+element.rule);
    } catch(e) {
        protocol.sendMessage("Cannot find rule accessor:" + JSON.stringify(e, null, ""));
    }
    if (ruleModule != null) {
        ruleModule.handleMessage(element);
    }
}
