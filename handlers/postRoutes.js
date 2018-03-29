const POST = {
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
    res.end('Hello Post Root!!!\n');
}
}