"use strict";

const ENVIRONMENT = process.env.npm_lifecycle_event;
const os = require("os");
const osInfo = require("linux-os-info");
const osType = os.platform();
const osRelease = os.release();
console.log(osRelease);
const httpclient = require("urllib");
const fs = require("fs");
const MIRROR_ROOT = "http://opensource-rocketmq-client.oss-cn-hangzhou.aliyuncs.com/cpp-client/";
const cppSDKVersion = "1.2.0/";
const OS_MAP = {
    macOS: "librocketmq.dylib",
    linuxRHEL5: "RHEL5.x/librocketmq.a",
    linuxRHEL6: "RHEL6.x/librocketmq.a",
    linuxRHEL7: "RHEL7.x/librocketmq.a",
    windowsDLL: "rocketmq-client-cpp.dll",
    windowsLIB: "rocketmq-client-cpp.lib"
};

if(ENVIRONMENT === "postinstall") {
    // the return value of osType: 'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
    if(osType === "win32") {
        // windows: dynamic and static libraries download to deps/lib/rocketmq-client-cpp.{dll,lib}
        const filePathDll = "./deps/rocketmq/lib/rocketmq-client-cpp.dll";
        const filePathLib = "./deps/rocketmq/lib/rocketmq-client-cpp.lib";
        const fileURLDll = `${MIRROR_ROOT}windows/${cppSDKVersion}${OS_MAP.windowsDLL}`;
        const fileURLLib = `${MIRROR_ROOT}windows/${cppSDKVersion}${OS_MAP.windowsLIB}`;
        httpclient.request(fileURLDll, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                process.exit(4);
                throw err;
            }
            fs.writeFile(filePathDll, data, error => {
                if(error) {
                    process.exit(4);
                }
            });
        });
        httpclient.request(fileURLLib, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                process.exit(4);
                throw err;
            }
            fs.writeFile(filePathLib, data, error => {
                if(error) {
                    process.exit(4);
                }
            });
        });
    } else if(osType === "darwin") {
        // macOS: dynamic library downloads to deps/lib/librocketmq.dylib
        const filePath = "./deps/rocketmq/lib/librocketmq.dylib";
        const fileURL = `${MIRROR_ROOT}mac/${cppSDKVersion}${OS_MAP.macOS}`;
        httpclient.request(fileURL, {
            timeout: 1000000
        }, (err, data) => {
            if(err) {
                process.exit(4);
                throw err;
            }
            fs.writeFile(filePath, data, error => {
                if(error) {
                    process.exit(4);
                }
            });
        });
    } else if(osType === "linux") {
        // Linux: static library downloads to deps/lib/librocketmq.a
        const filePath = "./deps/rocketmq/lib/rocketmq-client-cpp.a";
        let fileURL = "";
        osInfo().then(result => {
            if(result.id === "centos") {
                // TODO the lib of centos
            } else if(result.id === "redhat") {
                console.log("the version is");
                console.log(result.version_id);
                const versionHead = result.version_id.split(",")[0];
                if(versionHead === "5") {
                    fileURL = `${MIRROR_ROOT}linux/${cppSDKVersion}${OS_MAP.linuxRHEL5}`;
                } else if(versionHead === "6") {
                    fileURL = `${MIRROR_ROOT}linux/${cppSDKVersion}${OS_MAP.linuxRHEL6}`;
                } else if(versionHead === "7") {
                    fileURL = `${MIRROR_ROOT}linux/${cppSDKVersion}${OS_MAP.linuxRHEL7}`;
                }
            }
            httpclient.request(fileURL, {
                timeout: 1000000
            }, (err, data) => {
                if(err) {
                    process.exit(4);
                    throw err;
                }
                fs.writeFile(filePath, data, error => {
                    if(error) {
                        process.exit(4);
                    }
                });
            });
        }).catch(err => console.error(`Error reading OS release info: ${err}`));
    } else {
        // other platform
    }
}
