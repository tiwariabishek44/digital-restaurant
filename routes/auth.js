const express = require('express');
const User = require('../models/users');
const authRouter = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const SecreteKey ='6D5A713374367739'
const auth = require("../midileware/auth")

//signup

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, password, phone, type } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same Phone no. already exists!" });
    }


    let user = new User({
      password,
      name,
      phone,
      type,
    });
    user = await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


//sign in

authRouter.post("signin", async (req, res) => {
  try {
    const { phone, password } = req.body;
     
    const existingUsr = await User.findOne({ phone });
    if (!existingUsr) {
      return res.status(400).json({ msg: "user does not exist" });
    }

    const ismatch = await bcrypt.compare(password, existingUsr.password);
    if (!ismatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = jwt.sign({ id: existingUsr._id }, SecreteKey); 
    res.json({ token, ...existingUsr._doc });
  } catch (e) {
    res.status(5000).json({error:e.message})
    }
})

//token check


authRouter.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, SecreteKey);
    if (!verified)
      return res.json(false);
    const user = await User.findById(verified.id);
    if (!user)
      return res.json(false);
    res.json(true);
  
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({...this.use._doc, token:req.token})
}) 

module.exports = authRouter;
