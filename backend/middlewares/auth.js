const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const IDtoken = req.cookies.IDtoken;

    try {
        const decoded_uid = await jwt.verify(IDtoken, secret);
        console.log(decoded_uid)
        req.decoded_uid = decoded_uid.id;
        next();
      } catch (error) {
        console.log(error);
        next();
      }

}

module.exports = {authenticate}