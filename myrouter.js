


/**
 * This class is a router or controller meant to be used by myserver.js.  The route added has priority over path resources.
 * To add a route method, path and callback has to be provided
 */
class MyRouter{


    constructor()
    {
        this.fs = require('fs');
        this.url = require('url');
        this.querystring = require('querystring');
        this.m = {
            GET : require('./handlers/getRoutes'),
            POST : require('./handlers/postRoutes'),
            PUT : require('./handlers/putRoutes'),
            DELETE : require('./handlers/deleteRoutes')
        }

    }

   
  /**
   * This method maps a callback function to the provided method and path/url
   * @param {GET,PUT,POST and delete are the only method supported} method 
   * @param {This is simply the url to serve} path 
   * @param {This is the function that will serve this url} callback 
   */
  addroute(method,path,callback)
  {
    this.m[method][path]=callback;
  }
  
  /**
   * This method serse an html static page if it exist or returns a 500 status code
   * 
   * @param {The response object from http.IncommingMessage} res 
   * @param {The fullpath name to look for the htmlfile} path 
   * @param {The contentType to return in the header section of the response} contentType 
   * @param {The html responseCode} responseCode 
   */
  serveStaticFile(res, path, contentType, responseCode) {
      if(!responseCode) responseCode = 200;

      if(!path.includes('.html') && path.endsWith('/'))
      {
        path = path.toLowerCase().substring(0,path.length-2) + '.html';
      }else if(path.endsWith('.htm'))
      {
          path = path.toLowerCase() + 'l';
      }else if(path.endsWith('.html'))
      {
          path = path.toLowerCase();
      }else
      {
          //path = path.toLowerCase() + '.html';
      }

      //console.log('Book path is ' +  decodeURI(path));
      this.fs.readFile(__dirname + decodeURI(path), function(err,data) {
      if(err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 - Internal Error' + __dirname + path);
      } else {
        var testme = 'This is using template literals';  
        //let nData = eval('`'+data+'`');
        if(path.includes('.pdf'))
        {
            contentType = 'application/pdf';
        }
        res.writeHead(responseCode,{ 'Content-Type': contentType });
        res.end(data);
      }
      });
  }

  /**
   * This method looks at the url requested from the server and tries to find a controller/method
   * to serve the request.  If no callback function is found it tries to see if there is a file requested
   * else a 500 status code is returned.
   * @param {The http.IncommingMessage request} req 
   * @param {The http.IncommingMessage response} res 
   */
  route(req, res){
        //Check if you have the proper session cookie else check if you PUT to the /login handler otherwise say your not authrized
        //var myHeader = JSON.stringify(req.headers);
        //console.log("myHeader " + req.url);
        try{
            if('GUID=37051800-9d87-4a03-b94a-04000cbff81e path=/' === req.headers.cookie )//|| req.method === 'PUT' && req.url === '/login' )
            {
                var theURL = this.url.parse(req.url,true);
                var thepath = theURL.pathname.split('/');
                //var theQ = this.querystring.parse(theURL.query);
                do
                {
                    var testpath = thepath.join('/');
                    //console.log(testpath);
                    if(this.m[req.method][testpath])
                    {
                        this.m[req.method][testpath](req,res,theURL.query);
                        return 0;
                    }

                    console.log(testpath);
                }while(thepath.pop());

                if(!thepath.length)
                {

                    //If your in here that means a router wasn't found
                    //We can try to find a resource or a file
                    console.log('Looking for static');
                    this.serveStaticFile(res, theURL.pathname, 'text/html');
                    return 0;
                }
            }else if(req.method === 'POST' && req.url === '/login' )
            {
                this.m[req.method]['/login'](req,res);
            }
            else
            {

                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'text/plain');
                //res.end('Sorry you are not authorized!!!\n');
                this.serveStaticFile(res, '/nodeserver/test.html', 'text/html');
            }

        }catch(error)
        {
            console.log(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Sorry please fix me!!!\n');
        }
        return 0;
    }
}

module.exports = MyRouter;