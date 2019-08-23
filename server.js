var jsonServer = require('json-server');
var server = jsonServer.create();
var middlewares = jsonServer.defaults();
var bodyParser = require(`body-parser`); 


// const config = require("config");
// const mongoose = require('mongoose');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://psyche2823:aaaaaaaa@cluster0-yov3s.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("접속")
//   client.close();
// });


server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))

var path=require('path')
server.use(middlewares);

//json 파일이 저장될 경로
var jsonSaveFolder = './db';
var fs = require('fs');

server.get('/call/:router',function(req,res){
  var router = req.params.router;
  var filename = router + ".json";

  getData(filename ,function(result){
    if(result != undefined) {
      res.send(JSON.parse(fs.readFileSync(jsonSaveFolder+ "/" + filename )))
    } else {
      res.status(400).send("plz check url")
    }
  })
})


 fs.readdir(jsonSaveFolder, function (error, filelist) {
  //console.log("error  == > " + error);
  for(var i in filelist) {
    console.log("file list : " + filelist[i])
    //server.use("/" + filelist[i].replace(".json", ""), jsonServer.router('./db/' + filelist[i]));
  }

 

})


/* TODO
  1. 파일로 저장기능
  2. 텍스트로 저장기능
  3. URL로 저장기능
  4. 저장 시 json 체크된 파일만 저장 되도록

  4. 5일 이상 접속하지  않은 파일은 삭제 

*/
server.get('/',function(req,res){
  var id = req.user
  res.sendfile(path.join(__dirname,"/index.html"))
})

server.get('/bg',function(req,res){
  res.sendfile(path.join(__dirname,"/public/image/bg.jpg"))
})

server.get('/app',function(req,res){
  res.sendfile(path.join(__dirname,"/public/js/app.js"))
})


server.get('/getlist',function(req,res){
      getList( function (err, content) {
      var data = {
        count: Object.keys(content).length,
        data : content
      }
     res.json(data)
   })
})



server.post('/upload',function(req,res){
  try {
    JSON.parse(req.body.json)
    createJsonFile(req);
    res.status(200).send("api 생성완료")

  } catch (e) {
    console.log("실패" + e)
    res.status(500).send("api 생성실패" + e)
  }

})


server.listen(3000, function r(request,response) {
  console.log('JSON Server is running');
})


//파일생성
function createJsonFile(data){
    var file = __dirname + "/db/" + data.body.title+".json";
  fs.writeFile(file ,data.body.json,(err)=>{
    if (err) throw err;
    console.log("save 완료")
  })
}


//파일삭제
function deleteJsonFile(){
  // const file = fs.statSync('db3.json')
  // console.log(file.birthtime)
}

function getList(callback) {
  return fs.readdir(jsonSaveFolder, function (error, filelist) {
       callback(null, filelist.map(obj=> obj.replace(".json","")));
  })  
}



function getData(filename, callbackFunc){
  fs.readdir(jsonSaveFolder, function (error, filelist) {
    callbackFunc(filelist.find(function(n){
       return n == filename
    })) 
  })
}



