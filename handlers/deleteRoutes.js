const DELETE = {
    '/about' : (req,res,qstr) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello DELETE about!!!\n');
      },
   '/browse' : (req,res,qstr) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello DELETE Browse!!!\n');
   },
  
   '/' : (req,res,qstr) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello DELETE Root!!!\n');
      }
  }
  
  
  
  
  module.exports = DELETE;