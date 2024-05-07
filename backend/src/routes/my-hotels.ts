import express, { Router,Request,Response } from "express";
import multer from 'multer';
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel'
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
//api endpoint that let user create,obtain and view hotels
const router=express.Router();
const storage=multer.memoryStorage();
const upload =multer({
    storage:storage,
    limits:{
        fileSize:5 * 1024 * 1024 //5MB

    }
})
//api/my-hotels
router.post("/",
verifyToken,[
    body("name").notEmpty().withMessage("name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("price per night is required"),
    body("facilities").notEmpty().isArray().withMessage("facilities is required"),
    body("image").notEmpty().withMessage("name is required"),



    ],
upload.array("imageFiles",6),
async(req:Request,res:Response)=>{
try{
    const imageFiles=req.files as Express.Multer.File[];

    const newHotel:HotelType=req.body;


    //1.upload th images to cloudinary
    const uploadPromises=imageFiles.map(async(image)=>{
        const b64=Buffer.from(image.buffer).toString("base64");
        let dataURI="data:"+image.mimetype+";base64,"+b64;
        const res=await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    })
    const imageUrls=await Promise.all(uploadPromises);
    newHotel.imageUrls=imageUrls
    newHotel.lastUpdated=new Date()
    newHotel.userId=req.userId;

    //2.if upload was successful,add the urls to the new hotel

    //3.save the  new hotel in our database
    const hotel=new Hotel(newHotel)
    await hotel.save();
    res.status(201).send(hotel);
    //4.return a 201 status


}catch(e){
    console.log("error creating Hotel:",e);
    res.status(500).json({message:"Something went wrong"});
}

})

router.get("/",verifyToken,async(req:Request,res:Response)=>{
    
    try{
        const hotels=await Hotel.find({userId:req.userId})
        res.json(hotels);
    }catch(error){
        res.status(500).json({message:"Error fetching hotels"});
    }
})

export default router;
