const uuid = require('uuid');
const mailgun = require("mailgun-js");
const DOMAIN = 'YOUR_DOMAIN_NAME';
// const mg = mailgun({apiKey: process.env.APIkey, domain: process.env.DOMAIN});

const bcrypt = require('bcrypt');

const User = require('../models/user');
const Forgotpass = require('../models/forgotpassword');

exports.forgotPassword= async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findByEmail(email);
        if(user){
            const urlId = uuid.v4();            
            const password=new Forgotpass( urlId,true,user._id );
            password.save().then((result)=>{
                console.log(result)
            }).catch((err)=>{
                console.log(err);
            })
            // 
            const data = {
                from: 'noreply@hello.com',
                to: email,
                subject: 'Activation link',
                html: `<h2>Reset password</h2>
                <p>http://localhost:3000/password/resetpassword/${id}</p>`
            };
            mg.messages().send(data, function (error, body) {
                if(error){
                    return res.json({error:error})
                }
                console.log(body);
                return res.status(202).json({message:"Check you email to reset password",body});
                
            });               
            
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}


exports.resetpassword = (req, res) => {
    const proid =  req.params.id;
    Forgotpass.updateById(proid,false)
    .then(forgotpasswordrequest => {
        if(forgotpasswordrequest){            
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();


                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button onclick="formsubmitted()">reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpass.findByUrlid(resetpasswordid)
        .then(resetpasswordrequest => {
            User.findById(resetpasswordid.urlId)
            .then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            User.updatePass( resetpasswordid.urlId, hash ).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}