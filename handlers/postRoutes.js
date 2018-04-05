const MongoClient = require('mongodb').MongoClient;
const mongo_url = 'mongodb://localhost:27017';

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
    //res.setHeader('Set-Cookie','GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/; HttpOnly; secure')
    res.end('Hello Post Root!!!\n');
    },

    '/testform' : (req,res,qstr) =>{
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
        res.end('Thanks for submitting the form!!!\n');
    },
    '/login' : (req,res,qstr) => {
        console.log("Trying to log in");
        var body ="";
        req.on('data', (chunk) =>{
              body +=chunk
        }); 
        req.on('end', () => {
            let p = 'cryptocipher=QWERasdf1234!@#$';
            let formarray = unescape(body).split('&');
            req.body = {};
            for ( key in formarray){ let sk = formarray[key].split('='); req.body[sk[0]]=sk[1];}
            let comp = req.body.fname+'='+req.body.password;
            if(p === comp)
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
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
    
    
            //console.log(JSON.stringify(body));
        });
    
        //var myHeader = JSON.stringify(req.headers);
        //console.log("myHeader " + myHeader);
        //var myJSON = JSON.parse(myHeader);
        //console.log("Hey jason " + myJSON.host);
        //res.statusCode = 200;
        
        //res.setHeader('Content-Type', 'text/plain');
        //res.setHeader('Set-Cookie','GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/; HttpOnly; secure')
        //res.end('Hello Post Root!!!\n');
        },
    '/register' : (req,res,qstr) => {
        var body ="";
        req.on('data', (chunk) =>{
                body +=chunk
        }); 
        req.on('end', () => {

            console.log(JSON.stringify(body));
            let formarray = unescape(body).split('&');
            console.log(unescape(body));
            req.body = {};
            for ( key in formarray){ let sk = formarray[key].split('='); req.body[sk[0]]=sk[1];}
            var user = [{'email': req.body.email, 'username': req.body.username,'password':req.body.password,'passwordConf': req.body.pconf}];
            MongoClient.connect(mongo_url, function(err, client) {
                // Use the admin database for the operation
                const adminDb = client.db('test').collection('test');
                adminDb.insert(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Thanks for submitting the form!!!\n');
            });
        /*
        var user = [{'email': req.body.email, 'username': req.body.uname,'password':req.body.password,'passwordConf': req.body.passconf}];
        MongoClient.connect(url, function(err, client) {
            // Use the admin database for the operation
            const adminDb = client.db('test').collection('test');
            adminDb.insert(user);
    
          });
        */
       });
    }

}

module.exports=POST;