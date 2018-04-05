const PUT = {
    '/' : (req,res,qstr) =>{
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
        //res.setHeader('Set-Cookie','GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/; HttpOnly; secure')
        res.end('Hello Post Root!!!\n');
    },
    '/about' : (req,res,qstr) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello PUT about!!!\n');
      },
   '/browse' : (req,res,qstr) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello PUT Browse!!!\n');
   },
  
   '/login' : (req,res,qstr) => {
    var body ="";
    req.on('data', (chunk) =>{
          body +=chunk
    }); 
    req.on('end', () => {
        let p = 'cryptocipher=QWERasdf1234!@#$'
        if(p === body)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Set-Cookie','GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/; HttpOnly; secure')
            res.end(`
            Wecome please go to the Site here <br>
            <a href="/startpage">Your good!!!</a>
            `);
        }else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`
            Sorry you are not authorized!!!
            `);
        }


        console.log(JSON.stringify(body));
    });

    //var myHeader = JSON.stringify(req.headers);
    //console.log("myHeader " + myHeader);
    //var myJSON = JSON.parse(myHeader);
    //console.log("Hey jason " + myJSON.host);
    //res.statusCode = 200;
    
    //res.setHeader('Content-Type', 'text/plain');
    //res.setHeader('Set-Cookie','GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/; HttpOnly; secure')
    //res.end('Hello Post Root!!!\n');
    }
  }
  
  
  
  
  module.exports = PUT;