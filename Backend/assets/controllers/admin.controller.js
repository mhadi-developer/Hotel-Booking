import { prisma } from "../config/db.js";
import { sendEmail } from "../utils/email.js";
import { bookingStatusEmail } from "../utils/emailTemplate.js";
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
// ***********************************************************

export const getAllBookings = async (req, res) => {
    try {
        const fetchedBookings = await prisma.Booking.findMany({
            include: {
                user: true,
                room: {
                    include: {
                        images: true
                    }
                }
            }
        });

        res.status(200).json({
            message: 'fetched all booking',
            success: true,
            fetchedBookings
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "something went wrong ! Server Error ",
            success: false
        })
        
    }
}

// *******************************************************

export const getBookingById = async (req, res) => {
    try {
        const  {id}  = req.params;
       
        

        const fetchedBookingById = await prisma.Booking.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                room: {
                    include: {
                        images: true
                    }
                }
            }
        });


        res.status(200).json({
            message: `fetched bookingId by id: ${id}`,
            success: true,
            fetchedBookingById
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || "Server Error",
            success: false
        })
    }
}
//************************************************************************** */

export const updateBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(id , status);
        

        const updatedBooking = await prisma.Booking.update({
            where: {
                id: id
            },
            data: {
                status: status.toUpperCase()
            },
            include: {
                user: true,
                room: {
                    include: {
                        images:true
                    }
                }
            }
        });
       
        await sendEmail({
            to: updatedBooking?.user?.email,
            subject: `Booking Status: ${updatedBooking.status.toUpperCase()}`,
            html: bookingStatusEmail(
                updatedBooking.user.lastName || "USER",
                updatedBooking.status,
                updatedBooking.room.name
            )
        });

        res.status(202).json({
          message: `booking with id:${id} has been updated`,
          success: true,
          updatedBooking,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Something went wrong , server error",
            success: false
        })
        
    }
}

// ********************************************************************************************/

export const deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.Booking.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: `The booking with id:${id} is deleted successfully`,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || 'Server Error'
        });
        
    }
}