const PUT = {
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
  
   '/' : (req,res,qstr) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello PUT Root!!!\n');
      }
  }
  
  
  
  
  module.exports = PUT;