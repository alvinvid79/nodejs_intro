/*
const http = require('http'),
Router = require('./myrouter');

class MyServer { 
    constructor(ipadd,hport,myrouter)
    {
        this.hostname = ipadd;
        this.port = hport;
        this.server = http.createServer((req,res) =>{ myrouter.route(req,res)});
    }

    start(){
        this.server.listen(this.port, this.hostname, () => {
        console.log(`Server running at http://${this.hostname}:${this.port}/`);
        });
    }
}

module.exports = MyServer; 
*/

//const https = require('https'),
const https = require('http'),
fs = require('fs'),
Router = require('./myrouter');

function MyServer(ipadd,hport,myrouter){ 
        let hostname = ipadd;
        let port = hport;
        /*
        let options = {
            key: fs.readFileSync('./key.pem'),
            cert: fs.readFileSync('./certificate.pem')
          };
          
        let server = https.createServer(options,(req,res) =>{ myrouter.route(req,res)});
*/
    let server = https.createServer((req,res) =>{ 

        //console.log(req.headers['x-forwarded-proto']);
        if(req.headers['x-forwarded-proto'] === 'https')
        {
            myrouter.route(req,res);
        }else {

            let secureContent = req.headers.host;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Hacker</title>
            </head>
            <body>
                <h1> Sorry please go to the secure site below:<br>
                <a href="https://${secureContent}">https://${secureContent}</a>
                </h1>
            </body>
            </html>`);
        }
        });
    
        
        this.start = function(){
        server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

module.exports = MyServer; 

