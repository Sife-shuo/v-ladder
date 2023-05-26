# v-ladder自搭翻墙梯子

## 运行方式
- 在replit上云部署 [![replit](https://img.shields.io/badge/Open%20in-Replit-1A1E27?logo=replit)](https://replit.com/@SifeCleak/VPN)

- 在国外服务器上部署index.js

## 调用方式
部署完成后，使用`部署链接+网站链接`的方式调用

例子：在replit上运行，访问google：`https://vpn.sifecleak.repl.co/https://google.com`

## 技术细节
- 会插入js控制Worker，fetch，XMLHttpRequest，Element的原型链
- 会自动替换页面链接

## 未解决的：
详见bugs.md 