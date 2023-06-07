const { ErrorHandler } = require("../middleware/error")
const Task = require("../model/task")

const newtitle = async (req, res, next) => {
    try {
        const { title, description } = req.body

    console.log('1')
    await Task.create({
        title,
        description,
        user: req.user
    })

    console.log('2')

    res.status(201).json({
        success: true,
        message: "title added"
    })
    } catch (error) {
        next(error)
    }
    

}


const getMyTitle = async (req, res, next) => {
    try {
        const userId = req.user._id

    const tasks = await Task.find({ user: userId })

    res.status(201).json({
        success: "true",
        tasks,
    })
        
    } catch (error) {
     next(error)   
    }
    
}


const updateTitle = async (req, res, next) => {

    try {
        
    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Invalid",404));

    task.isCompleted = !task.isCompleted;

    await task.save()

    res.status(201).json({
        success: true,
        message: "update Title"
    })
    } catch (error) {
        next(error)
    }


}


const deleteTitle = async(req,res,next) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task) return next(new ErrorHandler("Invalid Id",404))
    
        await task.deleteOne()
    
        res.status(201).json({
            success:true,
            message:"title deleted"
        })    
    } catch (error) {
        next(error)
    }
    


}
module.exports = { newtitle, getMyTitle ,updateTitle, deleteTitle }