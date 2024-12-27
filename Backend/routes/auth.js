const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")

const JWTSecret = 'Nandhiniisagood$girl'

//ROUTE 1:create a user using:POST "/api/auth/createuser".Doesn't require login
router.post(
  "/createuser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry, a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWTSecret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 2: Authenticating a user using:POST "/api/auth/login". require login

router.post(
  "/login",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password cant be blank").exists(),
  ],async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
      let user = await  User.findOne({email});
      if(!user){
        success = false
        return res.status(400).json({error:"please try to login with correct credentials"})
      }
      const passwordcompare = await bcrypt.compare(password,user.password)
      if(!passwordcompare){
        success = false
        return res.status(400).json({error:"please try to login with correct credentials"})
      }
      const data={
        user:{
          id:user.id
        }
      }
            
            const authToken = jwt.sign(data,JWTSecret)
            success = true; // Set success to true on successful login
      res.json({ success, authToken });
     }
       catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Some Error");
    }

  }
);

//ROUTE 3: Get a user details using:POST "/api/auth/getuser". require Login

router.post(
  "/getuser",fetchuser,async (req, res) => {

try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password");
  res.send(user)

} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Some Error");
}
  }
);

module.exports = router;
