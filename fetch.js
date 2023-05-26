h={
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'max-age=0',
  'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'x-forwarded-for': '27.218.197.108',
  'x-forwarded-proto': 'https',
  'x-replit-user-bio': '',
  'x-replit-user-id': '',
  'x-replit-user-name': '',
  'x-replit-user-profile-image': '',
  'x-replit-user-roles': '',
  'x-replit-user-teams': '',
  'x-replit-user-url': ''
}

const express = require('express');
const app = express();
const http=require('http')
const server=http.createServer(app)
const {Buffer}=require('buffer');
c="https://vpn.sifecleak.repl.co/"
app.use("/",(req,res)=>{
  var {host,...f}=req.headers
  f.referer=req.url.replace("/","").replace("/","//");
  console.log(req.url)
  //if(f.host){f.host=new URL(req.url.replace("/","").replace("/","//")).host};
  console.log(f)
  res.setHeader("Access-Control-Allow-Origin","*")
  if(new URL(req.url.replace("/","").replace("/","//"))){fetch(req.url.replace("/","").replace("/","//"),{headers:f}).then(i=>i.text()).then(j=>res.send(j))}else{console.log("Not URL")}
})
app.listen(3000)