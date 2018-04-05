fs = require('fs');
const querystring = require('querystring');
const url = require('url');


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
    const testFolder = './Books/';
    const fs = require('fs');
    var maincontent = '';
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            let title = file.split('.');
            maincontent += '<a href="/readbook?book=' + encodeURI(file) + '">'+title[0]+'</a><br>';
            //console.log(file);
        });
        //console.log(maincontent);

        fs.readFile('C:/NodeServerOne/nodeserver/index.html', function(err,data) {
            if(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Error');
                
            } else {
                var name = 'Hackers'; 
                let nData = eval('`'+data+'`');
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(nData);
            }
        });
    });
    },


//Readbook controller finds the book and returns an html containing the book so the user can read it
 '/readbook' : (req,res,qstr) => {
     //console.log(__dirname + '../Books/' + qstr.book);
     fs.readFile('C:/NodeServerOne/nodeserver/readpdf.html', function(err,data) {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error' + __dirname + '/Books/' + qstr.book );
            
        } else {
            //var bookName = decodeURI(qstr.book === ); 
            var theURL = url.parse(req.url,true);
            let bookName = decodeURI(theURL.search.split('=')[1]);
            //console.log('The bookname is ' + decodeURI(theURL.search) + '  the query is ' + theURL.query.split('=')[1]);
            let nData = eval('`'+data+'`');
            res.writeHead(200,{ 'Content-Type': 'text/html' });
            res.end(nData);
        }
    });
    },

    '/books' : (req,res,qstr) => {
        const testFolder = './Books/';
        const fs = require('fs');
        var maincontent = '';
    fs.readdir(testFolder, (err, files) => {
      
      files.forEach(file => {
          let title = file.split('.');
          maincontent += '<a href=/readbook?book=' + file + '>'+title[0]+'</a><br>';
          //console.log(file);
      });
      //console.log(maincontent);
    });
    
    /*
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
       */
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello books!!!\n');
    }
}




module.exports = GET;
