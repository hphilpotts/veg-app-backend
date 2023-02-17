// ! abstracting out creation of JWT: not yet implemented
const jwt = require("jsonwebtoken");
exports.createJWT = (userForPayload) => {

   const payload = {
      user: {
         id: userForPayload._id,
         username: userForPayload.userName
      }
   }

   jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '3 days' },
      (err, token) => {
          if (err) throw err;
          res.json({ token });
      }
   )

};