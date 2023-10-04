const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
router.post("/createuser", [
    body('email').isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 }),
    body('name').isLength({ min: 5 })]
    , async (req, res) => {
        console.log(req.body.name,
            req.body.email,
            req.body.password,
            req.body.location
        )
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       
        try {
            await user.create({
                name: req.body.name,
                password: req.body.password,
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
            let userdata = await user.findOne(email);
            if (!userdata) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" });
            }
            if (!req.body.password === userdata.password) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" });
            }
            return res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


module.exports = router;