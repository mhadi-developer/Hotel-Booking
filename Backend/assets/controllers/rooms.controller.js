import { prisma } from "../config/db.js";

export const getAllRooms = async (req, res) => {
  try {
      const fetchedRooms = await prisma.Room.findMany({
          include: {
              images: true
          }
      });
      
      console.log({ fetchedRooms });

      

      
      
      
      res.status(200).json({
          message: "All rooms fetched Successfully",
          success: true,
          fetchedRooms
      })
      
  } catch (error) { 
      console.log(error);
      res.status(500).json({
          message: error?.message || "Something went room",
          success: false
      })
      
    }
    
};

// *************************************************


