const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

const createAuthor = async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.email || !req.body.password)
      return res.status(400).send("name,email,passwords are a required field");
    
    const savedData = await authorModel.create(req.body);
    
    return res.status(200).send({ msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.createAuthor = createAuthor;




//===================================================Phase-2============================================================

const login = async function(req,res){
  try{
      let data = req.body
      let{email,password} = data

      if(!email)
      return res.status(404).send({status:false,msg:"email id is missing"})

      if(!password)
      return res.status(404).send({status:false,msg:"password is missing"})

      let mailId = await authorModel.findOne({email:email, password:password})
      if(!mailId)
      return res.status(404).send({status:false,msg:"mail or passsword is wrong"})

      

      // let passkey = await authorModel.findOne({email:email, password:password})
      // if(!passkey.password)
      // return res.status(404).send({status:false,msg:"invalid password"})

      //let author = await authorModel.findOne({email : email, password:password})
      let token = jwt.sign({
          author_Id : mailId._id.toString()
      }, "project-one");

      res.setHeader("x-api-key", token);
      res.status(200).send({ status: true, data: token });

  }
  catch(err){
      console.log(err.message)
      res.status(500).send({error:err.message})

  }
}
module.exports.login =login