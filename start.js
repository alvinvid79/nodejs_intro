const MyServer = require('./myserver.js'),
MyRouter = require('./myrouter')
const hostname = '127.0.0.1';
const port = 3000;
const router = new MyRouter();

const server = new MyServer(hostname,port,router);


//Add the routes 

router.addroute('GET','/about',function(req,res,qstr){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello about!!!\n');
});


router.addroute('GET','/', function(req,res,qstr){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Root!!!\n');
});

router.addroute('POST','/',function(req,res,qstr){
    var body ="";
    req.on('data', (chunk) =>{
          body +=chunk
    }); 
    req.on('end', () => {
        console.log(JSON.stringify(body));
    });

    var myHeader = JSON.stringify(req.headers);
    console.log("myHeader " + myHeader);
    var myJSON = JSON.parse(myHeader);
    console.log("Hey jason " + myJSON.host);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Post Root!!!\n');
});



server.start();
