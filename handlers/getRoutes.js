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
    }
}

module.exports = GET;
