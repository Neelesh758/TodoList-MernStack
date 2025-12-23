import todoModel from "../models/todo.Model.js";

export const createTodo = async (req,res) => {
  try {
    const {title,description} = req.body;
    const createdBy = req.user.id
    if(!title|| !description || !createdBy){
      return res.status(400).send({
        success:false,
        message:"Please Provide all Details"
      })
    }
    const todo = new todoModel({
      title,
      description,
      createdBy
    })

    const result = await todo.save();

    res.status(201).send({
      success:true,
      message:"Todo Saved Successfully",
      result
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Server Error"
    })
  }
}
//Get Todo

export const getTodo = async (req,res) => {
  try {
    const userId = req.user.id
    //validate
    if(!userId){
      return res.status(404).send({
        success:false,
        message:"No user Found"
      })
    }
    //finding task
    const todo = await todoModel.find({createdBy:userId})

    if(todo.length === 0){
      return res.status(200).send({
        success:true,
        todo:[],
        message:"You Have No Todo"
      })
    }
    res.status(200).send({
      success:true,
      message:"Fetch Successfully",
      todo
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error in Get Todo"
    })
    
  }
}

//Delete api

export const deleteTodo = async (req,res) => {
  try {
    //find Id 
    const {id} = req.params

    if(!id){
      return res.status(404).send({
        success:false,
        message:"No Todo Found With This"
      })
    }

    const todo = await todoModel.findByIdAndDelete({_id:id})
    if(!todo){
      return res.status(404).send({
        success:false,
        message:"No Todo Found"
      })
    }
    res.status(200).send({
      success:true,
      message:"Todo Deleted Successfully"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error in delete Todo Api"
    })
  }
  
}

export const updateTodo = async (req,res) => {
  try {
    const {id} = req.params
    if(!id){
      return res.status(404).send({
        success:false,
        message:"No id Found"
      })
    }
    const data = req.body

    const todo = await todoModel.findByIdAndUpdate(id,{$set:data},{new:true})
    return res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error In Update Todo Api"
    })
  }
}