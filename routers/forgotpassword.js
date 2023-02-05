const express = require('express');

const router = express.Router();

const forgotpasController=require('../controllers/forgotpassword')

router.get('/updatepassword/:resetpasswordid', forgotpasController.updatepassword)

router.get('/resetpassword/:id', forgotpasController.resetpassword)

router.use('/forgotpassword',  forgotpasController.forgotPassword);


module.exports=router;
