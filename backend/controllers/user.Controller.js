import userModel from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req,res) => {
  try {
    const {userName,email,password} = req.body

    //Validation
    if(!userName || !password || !email){
      return res.status(400).send({
        success:false,
        message:"Kindly enter all Details",
      })
    }

    //Existing User
    const eexistingUser = await userModel.findOne({email})
    if(eexistingUser){
      return res.status(400).send({
        success:false,
        message:"User already Exist",
      })
    }

    const salt = await bcrypt.genSalt(10) //salt generation
    const hashedPassword = await bcrypt.hash(password,salt)
    //saving user
    const newUser = new userModel({
      userName,
      password:hashedPassword,
      email
    })

    await newUser.save()
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"RegisterAPI",
      error
    })
  }
}

//login

export const loginController = async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    //validation
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Invalid Credentials"
      })
    }
    //mnatch
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(404).send({
        success:false,
        message:"Invallid Credentials"
      })
    }

    //token
    const token =await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.status(200).send({
      success:true,
      message:"Login SuccessFully",
      token,
      user
    })
  } catch (error) {
    console.log(error),
    res.status(500).send({
      success:false,
      message:"Login Api",
      error
    })
  }
}