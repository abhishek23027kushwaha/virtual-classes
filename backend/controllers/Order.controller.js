import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js"
const RazorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const order = await RazorpayInstance.orders.create({
      amount: Number(course.price) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


export const verifyPayment = async(req,res)=>{
     try {
          const {courseId,userId,razorpay_order_id} = req.body;
          console.log(courseId,userId,razorpay_order_id);
     const orderInfo = await RazorpayInstance.orders.fetch(
          razorpay_order_id
     )
     if(orderInfo.status==='paid'){
          const user = await User.findById(userId)
          if(!user.enrolledCourses.includes(courseId)){
              await user.enrolledCourses.push(courseId)
              await user.save()
          }
          const course = await Course.findById(courseId).populate("lectures");
          if(!course.enrolledStudents.includes(userId)){
             await  course.enrolledStudents.push(userId);
             await course.save()
          }
          return res.status(200).json({message:"payment successfully"})
     }
          
     } catch (error) {
          console.log(error);
          return res.status(400).json({message:"payment failed"})
         
     }

}
