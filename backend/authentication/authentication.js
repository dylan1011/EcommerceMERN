const jwt = require('jsonwebtoken');
const {secretKey} = require('./config');

const authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    // const token = req.header('x-auth-token');
    const token = req.headers.authorization;
    console.log("token, secret Key",token,secretKey);
    let splitTokenarr = token.split(" ");
    const splitToken = splitTokenarr[1];
    console.log(splitToken);
    // Check if the token is present
    if (!splitToken) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(splitToken, secretKey);
      console.log("decoded",decoded);
      // Attach the user object to the request for further use in the route
      req.user = decoded.user;
  
      // Continue to the next middleware or route
      next();
    } catch (err) {
      // If the token is not valid
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  module.exports = authenticateUser;