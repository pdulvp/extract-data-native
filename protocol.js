
var fsq = require("./fsquery");

module.exports = (handleMessage) => {

  let input = Buffer.from("");
  let msgLength = [];
  process.env.UV_THREAD_POOL = 1;

  process.stdin.on("end", function () {
    log("end");
  });

  let logIndex = 0;
  fsq.clean("log");

  function log(message) {
    fsq.write("log", logIndex+": "+message);
    logIndex++;
  }

  function getStdinChunks() {
    let chunk = "";
    let chunks = [ ];
    while ((chunk = process.stdin.read())) {
      chunks.push(chunk);
    }
    return chunks;
  }

  function appendChunks(buffer, chunks) {
    return Buffer.concat([buffer, Buffer.concat(chunks)]);
  }

  function proceedInput() {
    while (input.length >= 4) {
      let input3 = input.toString();
      if (input3.length >= 4 && input3.charAt(0)!='[' && input3.charAt(0)!='{' && input3.charAt(0)!='(') {
        let icc = input.readUInt32LE(0);
        msgLength.push(icc);
        input = input.slice(4);
      }
      
      while (msgLength.length > 0 && input.length >= msgLength[0]) {
        let len = msgLength.shift();
        let content = input.slice(0, len);
        input = input.slice(len);
        log("content: "+ content);
        handleMessage(JSON.parse(content.toString()));
      }
    }
  }

  process.stdin.on('readable', () => {
  try {
    //log("readable:");
    input = appendChunks(input, getStdinChunks());
    proceedInput();

  } catch (e) {
    log("error:"+e);
  }
  });

    function sendMessage (msg) {
      var buffer = Buffer.from(JSON.stringify(msg));
  
      var header = Buffer.alloc(4);
      header.writeUInt32LE(buffer.length, 0);
  
      var data = Buffer.concat([header, buffer]);
      process.stdout.write(data);
    }
  
    process.on('uncaughtException', (err) => {
      sendMessage({error: err.toString()});
    });
  
    return sendMessage;
  
  }