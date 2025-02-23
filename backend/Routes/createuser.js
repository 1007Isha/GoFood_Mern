const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="mynameisishacsestudent"
router.post("/createuser", [
    body('email').isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 }),
    body('name').isLength({ min: 5 })]
    , async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       const salt= await bcrypt.genSalt(10);
       let secPassword=await bcrypt.hash(req.body.password,salt)
        try {
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 })]
    , async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await user.findOne({email});
            if (!userData) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" });
            }
            const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authtoken=jwt.sign(data,jwtSecret)
            return res.json({ success: true ,authtoken:authtoken});
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


module.exports = router;
