// Author: pdulvp
// Get process.stdin as the standard input object.
let toto = "abcdef"
console.log(toto)
console.log(toto.slice(0,3))
console.log(toto.slice(3));

let buf = Buffer.alloc(100, " ");

buf.writeUInt32LE(128, 0);
let o = buf.readInt32LE(0);

console.log(o);

/*
sending2.postMessage({"message": "first message"});
sending2.postMessage({"message": "second message"});
sending2.postMessage({"message": "third message"});

function createM(valu) {
	var result = "x".repeat(valu - 14);
	return {"message": result };
}
sending2.postMessage(createM(100));
sending2.postMessage(createM(128));
sending2.postMessage(createM(200));
sending2.postMessage(createM(250));
sending2.postMessage(createM(512));
*/
