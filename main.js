const http = require('http'),
url = require('url'),
querystring = require('querystring'),
fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const myrouter = {
    GET : {},
    PUT : {},
    POST : {},
    DELETE : {}
}

myrouter.GET['/'] = function(req,res,qstr){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Root!!!\n');
}

myrouter.POST['/'] = function(req,res,qstr){
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
}

myrouter.GET['/about'] = function(req,res,qstr){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello about!!!\n');
}
//Register the routes


function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data) {
    if(err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Error');
    } else {
        res.writeHead(responseCode,
    { 'Content-Type': contentType });
        res.end(data);
    }
    });
}


const server = http.createServer((req, res) => {
   try{
       var theURL = url.parse(req.url);
       var thepath = theURL.pathname.split('/');
       var theQ = querystring.parse(theURL.query);
       //console.log(JSON.stringify(theQ));
       //console.log(req.rawHeaders);
       do
       {
           var testpath = thepath.join('/');
            if(myrouter[req.method][testpath])
            {
                console.log('I found my router');
                myrouter[req.method][testpath](req,res,theQ);
                break;
            }
       }while(thepath.pop());

       if(!thepath.length)
       {    //If your in here that means a router wasn't found
            //We can try to find a resource or a file
            //res.statusCode = 200;
            //res.setHeader('Content-Type', 'text/plain');
            //res.end(`Sorry please fix me I didn't finde a router!!!\n`);
            serveStaticFile(res, theURL.pathname, 'text/html');
       }

   }catch(error)
   {
    console.log(error);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Sorry please fix me!!!\n');
   }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});