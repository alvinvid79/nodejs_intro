fs = require('fs');


const GET = {
  '/about' : (req,res,qstr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello about!!!\n');
    },
 '/browse' : (req,res,qstr) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Browse!!!\n');
 },

 '/' : (req,res,qstr) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Root!!!\n');
    },

//Readbook controller finds the book and returns an html containing the book so the user can read it
 '/readbook' : (req,res,qstr) => {
     console.log(__dirname + '../Books/' + qstr.book);
     fs.readFile('C:/NodeServerOne/nodeserver/readpdf.html', function(err,data) {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error' + __dirname + '/Books/' + qstr.book );
            
        } else {
            var bookName = qstr.book; 
            let nData = eval('`'+data+'`');
            res.writeHead(200,{ 'Content-Type': 'text/html' });
            res.end(nData);
        }
    });
    }

}




module.exports = GET;
