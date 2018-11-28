const ENVIRONMENT = process.env.npm_lifecycle_event;

if(ENVIRONMENT === "build") {
    console.log("Running your build tasks!");
}

if(ENVIRONMENT === "dev") {
    console.log("Running the dev server!");
}

if(ENVIRONMENT === "preinstall") {
    console.log("Preinstall event: Prepare for install event!");
}

if(ENVIRONMENT === "postinstall") {
    const os = require("os");
    const osType = os.platform();
    const httpclient = require("urllib").create();
    const fs = require("fs");

    // 操作系统类型,返回值有'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
    if(osType === "win32") {
        // windows: dynamic and static libraries download to deps/lib/rocketmq-client-cpp.{dll,lib}
        const filename = "./deps/rocketmq/lib/test.jpg";
        const fileURL = "https://img3.doubanio.com/view/subject/s/public/s2552283.jpg";
        httpclient.request(fileURL, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                throw err;
            }
            fs.writeFile(filename, data, error => {
                if(error) {
                    console.log(error);
                    return;
                }
                console.log(`${filename}was saved`);
            });
        });
    } else if(osType === "darwin") {
        // macOS: dynamic library downloads to deps/lib/librocketmq.dylib
        const filename = "./deps/rocketmq/lib/test.jpg";
        const fileURL = "https://img3.doubanio.com/view/subject/s/public/s2552283.jpg";
        httpclient.request(fileURL, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                throw err;
            }
            fs.writeFile(filename, data, error => {
                if(error) {
                    console.log(error);
                    return;
                }
                console.log(`${filename}was saved`);
            });
        });
    } else if(osType === "linux") {
        // Linux: static library downloads to deps/lib/librocketmq.a
        const filename = "./deps/rocketmq/lib/test.jpg";
        const fileURL = "https://img3.doubanio.com/view/subject/s/public/s2552283.jpg";
        httpclient.request(fileURL, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                throw err;
            }
            fs.writeFile(filename, data, error => {
                if(error) {
                    console.log(error);
                    return;
                }
                console.log(`${filename}was saved`);
            });
        });
    } else {
        // 其他平台
    }
}

if(ENVIRONMENT === "install") {
    console.log("installing....");
}
