const admin=require("../config/firebaseConfig")
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const returnuser = async (req, res) => {
    const { decoded_uid } = req;
    
    if (
      decoded_uid === undefined ||
      decoded_uid === null
    ) {
      return res.status(500).json({error:"Not authenticated."})
    }
  
    const user = await admin.auth().getUser(decoded_uid);
    console.log(user);
    res.status(200).json(user);
  };

  

  const login = async (req, res) => {
    const { uid } = req.body;

    if (
      uid === undefined ||
      uid === null
    ) {
      res.status(500).json({error:"Not authenticated."})
    }
  
    const user = await admin.auth().getUser(uid);

    if (user === undefined || user === null){
      res.status(500).json({error:"Not authenticated."})
    }

    console.log(user);

    const IDtoken = jwt.sign({ id: user.uid }, secret, {
      expiresIn: 365 * 24 * 60 * 60 * 1000,
    });

    console.log(IDtoken)

    res.cookie("IDtoken", IDtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    
    res.status(200).json(user);
  };

  const logout = (req, res) => {
    return res
      .clearCookie("IDtoken", { path: "/" })
      .sendStatus(200);
  };


  module.exports={returnuser,login, logout}