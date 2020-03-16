const {verify} = require('jsonwebtoken');
const {secretKey} = require('./../app.config.json');

const excludeRoutes = [
   {
      route: '/login',
      method: 'POST'
   }, 
   {
      route: '/check-connection',
      method: 'POST'
   }
]

const checkAuth = (req, res, next) => {
   const baseUrl = req._parsedUrl.pathname;
   if (excludeRoutes.find((excludeRoute) => excludeRoute.route === baseUrl && excludeRoute.method === req.method)) {
      next();
      return;
   }

   try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader.substr('Bearer '.length, authorizationHeader.length);
      verify(token, secretKey);
      next();
   } catch (error) {
      res.statusCode = 401;
      res.send('Unauthorized.');
   }
};

module.exports.checkAuthMiddleware = checkAuth;