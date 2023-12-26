import mongoose from "mongoose";

export const connectToDb = async()=> {
   try {
      await mongoose.connect(process.env.REACT_APP_MONGODB_URI)
      console.log('mongodb has been connected successfully')
   } catch (error) {
     console.log('Error', error?.message)
     process.exit(1)
   }
}