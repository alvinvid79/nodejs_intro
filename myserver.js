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

const https = require('https'),
fs = require('fs'),
Router = require('./myrouter');

function MyServer(ipadd,hport,myrouter){ 
        let hostname = ipadd;
        let port = hport;
        let options = {
            key: fs.readFileSync('./key.pem'),
            cert: fs.readFileSync('./certificate.pem')
          };
          
        let server = https.createServer(options,(req,res) =>{ myrouter.route(req,res)});


    this.start = function(){
        server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

module.exports = MyServer; 

