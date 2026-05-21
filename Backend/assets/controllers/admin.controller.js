import { prisma } from "../config/db.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";



export const createRoom = async (req, res) => {
    try {
        const { name, type, price, isBooked } = req.body;
        const files = req.files;

        const parsePrice = Number(price);
        const parsedIsBooked = isBooked === "true";

        const uploadedImages = await Promise.all(
          files.map((file) => uploadToCloudinary(file.buffer)),
        );

        const images = uploadedImages.map((img) => ({
          public_id: img.public_id,
          secure_url: img.secure_url,
        }));
     
        console.log({ images });
        
        const roomPayload = {
          name,
          type,
          price: parsePrice, // ✅ NUMBER
          isBooked: parsedIsBooked, // ✅ BOOLEAN
          images,
        };

        const cretedRoom = await prisma.Room.create({
            data: {
                name,
                type,
                price: parsePrice,
                isBooked: parsedIsBooked,
                images: {
                    create:images
                },
            },
            include: {
                images:true
            }
        });
         

        res.status(201).json({
            message: "Room added successfully",
            success: true
        });


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: error?.message || "Something went wrong",
            success: false
      })   
    }
}