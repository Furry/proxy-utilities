const { ProxyManager } = require("../dist/index")

ProxyManager.fastCheck("51.68.207.81", 443)
.then((res) => {
    console.log(res)
})