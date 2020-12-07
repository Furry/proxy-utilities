<div style="text-align: center">
    <h1>
        Proxy-Utilities
    </h1>


<a href="https://discord.gg/S8sw2ud">
    <img src="https://discordapp.com/api/guilds/769020183540400128/widget.png?style=banner2" alt="Discord Banner 2"/>
</a>

![Discord Shield](https://img.shields.io/github/commit-activity/m/furry/2captcha)
![Size](https://img.shields.io/bundlephobia/min/2captcha)
![Downloads](https://img.shields.io/npm/dw/2captcha)

</div>

<hr>

## Motive
Captcha-Utilities is a simple library to make proxy checking & proxy filtering easier and quick.
This library has no stable release yet, all features may be subject to unexpected change.
## Features

- Promise based testing
- Supports credentialed proxies
- Light weight ( 2 dependencies )
- Fluent typings & JSDocs
- Http checking
- Https checking
- Google Checking

## Planned Features

- Documentation Site
- Bulk testing
- Proxy filtering
- Get Proxy ping
- Get Proxy geolocation
- Get Proxy anonimity
- And many others.

## Install
```sh
npm install proxy-utilities
```
```sh
yarn add proxy-utilities
```

## Usage

```js
const { ProxyManager } = require("proxy-utilities")

// Fastcheck utilizes the class' static properties.
ProxyManager.fastCheck("51.68.207.81", 443)
.then((res) => {
    console.log(res)
})
```

## Commit Guidelines
There's really no guidelines, if the code makes sense, and is an obvious improvement, feel free to make a PR for it!

<hr>
<div style="text-align: center">
<a href="https://www.buymeacoffee.com/ether" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</div>