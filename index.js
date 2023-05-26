const express = require('express');
const app = express();
const http=require('http')
const server=http.createServer(app)
const {Buffer}=require('buffer');
c="https://vpn.sifecleak.repl.co/"
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*")
    //res.setHeader("Content-Type","application/json")
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
    //var fh={"content-type":[...r.headers.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {})["content-type"]}
    var fh=Object.fromEntries([...r.headers.entries()])
    if(req.url.search("baidu.com")!=-1){console.log([...r.headers.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {}))}
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
          if(head&&head.includes("text/html")){
            res.end(dhtml+replac(k,uri))
          }
          else{
            res.end(Buffer.from(k))
          }
        }
      })
}

replac=function(k,url){
    return k.replace(/ src=\"(.+?)\"/g,function(a,b){
        if(b.slice(0,4)=="data"){return " src=\""+b+"\""};
        if(b=="//"){return " src=\""+c+new URL("/",url).toString()+"\""}
        return " src=\""+c+new URL(b,url).toString()+"\""
    }).replace(/ src=\'(.+?)\'/g,function(a,b){
        if(b.slice(0,4)=="data"){return " src=\'"+b+"\'"};
        if(b=="//"){return " src=\'"+c+new URL("/",url).toString()+"\'"}
        return " src=\'"+c+new URL(b,url).toString()+"\'"
    }).replace(/ href=\"(.+?)\"/g,function(a,b){
        if(b.slice(0,4)=="data"){return " href=\""+b+"\""};
        if(b=="//"){return " href=\""+c+new URL("/",url).toString()+"\""}
        return " href=\""+c+new URL(b,url).toString()+"\""
    }).replace(/ href=\'(.+?)\'/g,function(a,b){
        if(b.slice(0,4)=="data"){return " href=\'"+b+"\'"};
        if(b=="//"){return " href=\'"+c+new URL("/",url).toString()+"\'"}
        return " href=\'"+c+new URL(b,url).toString()+"\'"
    }).replace(/ action=\"(.+?)\"/g,function(a,b){
        if(b.slice(0,4)=="data"){return " action=\""+b+"\""};
        if(b=="//"){return " action=\""+c+new URL("/",url).toString()+"\""}
        return " action=\""+c+new URL(b,url).toString()+"\""
    }).replace(/ action=\'(.+?)\'/g,function(a,b){
        if(b.slice(0,4)=="data"){return " action=\'"+b+"\'"};
        if(b=="//"){return " action=\'"+c+new URL("/",url).toString()+"\'"}
        return " action=\'"+c+new URL(b,url).toString()+"\'"
    }).replace(/["']{1}(http[s]{0,1}|ftp):\/\/[a-zA-Z0-9\.\-]+\.([a-zA-Z]{2,4})(:\d+)?(\/[a-zA-Z0-9\.\-~!@#$%^&amp;*+?:_/=<>]*)?["']{1}/gi,function(a){if(a.search(c)==0){return a}else{return "\""+c+a.slice(1,-1)+"\""}})
}

dhtml=`<script>if(!ProxyVPN){
var ProxyVPN={fetch:fetch,xml:XMLHttpRequest.prototype.open,geturl:()=>{
        var t=location.href.replace("https://vpn.sifecleak.repl.co/","");
        if(t.match("/+")[0].length==1){
            t=t.replace("/","//")
        }
        return t
    },add:(a)=>"https://vpn.sifecleak.repl.co/"+new URL(a,ProxyVPN.geturl()).toString(),
    worker:Worker
};
fetch=function(){var f=Object.values(arguments);f[0]=ProxyVPN.add(f[0]);return ProxyVPN.fetch.apply(null,f)}
XMLHttpRequest.prototype.open=function(){var f=Object.values(arguments);f[1]=ProxyVPN.add(f[1]);return ProxyVPN.xml.apply(this,f)}
Worker=function(){var f=arguments;f[0]=ProxyVPN.add(f[0]);if(f[1]){return new ProxyVPN.worker(f[0],f[1])}else {return new ProxyVPN.worker(f[0])}}


ProxyVPN.proxye=(str,b)=>({
    set(n){
        if(!b.ProxyVPNdata){b.ProxyVPNdata={}};
        b.ProxyVPNdata[str]=ProxyVPN.add(n);return b.ProxyVPNdata[str]
    },
    get(){
        if(!b.ProxyVPNdata){
            b.ProxyVPNdata={}
        };
        return b.ProxyVPNdata[str]; 
    },
    configurable: false
});
Object.defineProperty(HTMLAnchorElement.prototype,'href',ProxyVPN.proxye('href',HTMLAnchorElement.prototype));/*<a>.href*/
Object.defineProperty(HTMLScriptElement.prototype,'src',ProxyVPN.proxye('src',HTMLScriptElement.prototype));/*<script>.src*/
Object.defineProperty(HTMLImageElement.prototype,'src',ProxyVPN.proxye('src',HTMLImageElement.prototype));/*<img>.src*/
Object.defineProperty(HTMLImageElement.prototype,'srcset',{
    set(n){
        var b=HTMLImageElement.prototype;
        var str="srcset";
        if(!b.ProxyVPNdata){b.ProxyVPNdata={}};
        var t=n.split(",").map(e=>e.split(" ").filter(p=>p!="")).map(k=>ProxyVPN.add(k[0])+" "+k[1]).join(",")
        b.ProxyVPNdata[str]=t;return b.ProxyVPNdata[str]
    },
    get(){
        var b=HTMLImageElement.prototype;
        var str="srcset";
        if(!b.ProxyVPNdata){
            b.ProxyVPNdata={}
        };
        return b.ProxyVPNdata[str]; 
    },
    configurable: false
});/*<img>.srcset*/}</script>`