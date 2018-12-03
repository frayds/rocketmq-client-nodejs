"use strict";

const co = require("co");

const common = require("./common");
const Producer = require("../lib/producer");

co(function *() {
    const producer = new Producer("testGroup", {
<<<<<<< HEAD
        nameServer: common.nameServer
=======
        nameServer: common.nameServer,
        groupName: "testGroupName",
        logFileNum: 5,
        logFileSize: 1048576000,
        logLevel: "debug",
        compressLevel: 3,
        sendMessageTimeout: 5000,
        maxMessageSize: 1024 * 256
>>>>>>> upstream/first-demo
    });

    console.time("producer start");
    try {
        yield producer.start();
    } catch(e) {
        console.error(e);
        process.exit(4);
    }
    console.timeEnd("producer start");
    for(let i = 0; i < common.messageCount; i++) {
        console.time(`send ${i}`);
        try {
            const ret = yield producer.send("test", `baz ${i}`, {
                keys: "foo",
                tags: "bar"
            });
            console.timeEnd(`send ${i}`);
            console.log(ret);
        } catch(e) {
            console.error(e);
            process.exit(4);
        }
    }

    console.time("producer end");
    yield producer.shutdown();
    console.timeEnd("producer end");
});
