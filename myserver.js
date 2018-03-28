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