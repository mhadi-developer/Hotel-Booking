
import { io } from "../../server.js";
import { prisma } from "../config/db.js"
import { sendEmail } from "../utils/email.js"
import {bookingStatusEmail} from "../utils/emailTemplate.js"
export const getAllUserBooking = async (req, res) => {
    try {
        console.log(req.user.userId);
        const userId = req.user.userId

        if (!req.user.userId) {
           return res.status(401).json({
                message:"user not found"
            })
        }
        const fetchedAllUserBookings = await prisma.Booking.findMany({
            where: {
                userId: userId
            },
            include: {
                room: {
                    include: {
                        images:true
                    }
                },
                user:true
            }
        });
     
        res.status(200).json({
          message: "Get all booking successfully",
          success: true,
          fetchedAllUserBookings,
        });
  
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: error?.message || "Server Error",
            success:false
        })
    }
    
}
// **************************************************************

export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.staus(401).json({
                messsage: "Booking not found",
                success: false
            })
        }
        const fetchedBookingById = await prisma.Booking.findUnique({
          where: {
            id: id,
          },
          include: {
            room: {
              include: {
                images: true,
              },
            },
            user: true,
          },
        });


        res.status(200).json({
            message: " fetched Booking Derails",
            success: true,
            fetchedBookingById
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: error?.message || "Something went wrong",
            success: false
        })
    }
}

// ************************************************************


export const cancelBookingByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const cancelledBooking = await prisma.Booking.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
            include: {
                user: true,
                room: {
                    include: {
                        images: true
                    }
                }
            },
            
        });



   await sendEmail({
     to: cancelledBooking?.user?.email,
     subject: `Booking Status: ${cancelledBooking.status.toUpperCase()}`,
     html: bookingStatusEmail(
       cancelledBooking.user.lastName || "USER",
       cancelledBooking.status,
       cancelledBooking.room.name,
     ),
   });
        
        console.log("emiting event");
        
        const io = req.app.get("io");
        
        io.to("admin").emit("booking-cancelled", {
            message: `User : ${cancelledBooking.user.lastName} cancelled the booking`,
            userId: cancelledBooking.user.id,
            bookingId: cancelledBooking.id,
        });


        res.status(201).json({
            message: `Booking with Id: ${id} is cancelled`,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error?.message || "Server Error",
            success: false
        })
        
    }
} 