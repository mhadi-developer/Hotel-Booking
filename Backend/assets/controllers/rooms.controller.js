import { prisma } from "../config/db.js";

export const getAllRooms = async (req, res) => {
  try {
      const fetchedRooms = await prisma.Room.findMany({
          include: {
              images: true
          }
      });
      
      

      
      
      
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

export const getRoomDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(402).json({
                message: " Not found the room"
            })
        };

        const fetchedRoomById = await prisma.Room.findUnique({
            where: {
                id: id
            },
            include: {
                images: true
            }
        });

      
        res.status(200).json({
            message: "room fetched sucessfully",
            success: true,
            fetchedRoomById
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error?.message || "server error ! something went wrong" 
        })
        
    }
}


