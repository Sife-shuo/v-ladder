const express = require('express');
const app = express();
const http=require('http')
const server=http.createServer(app)
const {Buffer}=require('buffer');
c="https://vpnexp.sifecleak.repl.co/"
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*")
    if(req.method === 'GET'){next()}
    else if(req.method === 'POST'){
      let bodyParams=''
      req.on('data',(param)=>{
          bodyParams+=param
      })
      req.on('end',()=>{
        req.body=bodyParams;
        next()
      })
    }
})
app.use("/",(req,res)=>{
  var uri=req.url.slice(1).replace("/","//")
  console.log(uri)
  if(url_check(uri)){
    try{
      main(uri,req,res)
    }catch(err){res.status(408);res.send("408 Timeout")}
  }
  else{res.send(uri)}
})
server.listen(3000);
console.log('服务已启动,3000');

url_check=(a)=>/http[s]{0,1}:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/gi.test(a)

main=async function(uri,req,res){
  var {host,...hhf}=req.headers
  hhf.referer=uri;
  var head="";
  var lock=1;
  return await fetch(uri,{method:req.method,headers:hhf,body:req.body}).then(r=>{
    var headall=[...r.headers.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {});
    if(headall["content-type"]){
      var fh={"content-type":[...r.headers.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {})["content-type"]}
    }else{
      fh={};
    }
    //var fh=Object.fromEntries([...r.headers.entries()])
    res.writeHead(r.status,fh)
    if(r.headers.get("location")){
        console.log(r.headers)
        main(r.headers.get("location"),req,res)
        return new Promise(()=>lock=0)
    }else{
        console.log(r.headers.get("content-type"))
        head=r.headers.get("content-type")
        if(head&&head.includes("text/html")){
        return r.text()
        }
        return r.arrayBuffer()
    }
    }).then(k=>{
    if(lock){
        res.end(Buffer.from(k))
    }
    })
}