import JWT from "jsonwebtoken";

export const authMiddleware = async (req,res,next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({
      success:false,
      message:"Please provide Auth Token"
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Invalid Auth Token"
      });
    }
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
      if(err){
        return res.status(401).send({
          success:false,
          message:"Unauthorized"
        })
      }else{
        // req.body.createdBy = decode.id;
        req.user = { id: decode.id };
        next();
      }
    })
  } catch (error) {
    res.status(400).send({
      success:false,
      message:'Please provide Auth Token',
      error
    })
  }
  
}