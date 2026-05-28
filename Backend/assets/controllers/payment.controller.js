import { prisma } from "../config/db.js";
import { sendEmail } from "../utils/email.js";
import { bookingStatusEmail } from "../utils/emailTemplate.js";
import { stripe } from "../utils/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { bookingId, roomName, totalPrice, roomImage, roomId } = req.body;
    console.log({ roomId });

    const data = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: roomName, // ✅ was "roomTitle" (undefined variable)
              images: [roomImage],
            },
            unit_amount: totalPrice * 100, // ✅ was "price" (undefined variable)
          },
          quantity: 1,
        },
      ],

      // Links the Stripe session back to your booking record
      metadata: {
        bookingId,
      },

      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&room_Id=${roomId}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

    data.checkIn = new Date(data.checkIn);
    data.checkOut = new Date(data.checkOut);

    const bookingPayload = {
      userId: data.userId,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      totalPrice: data.totalPrice,
      guest: data.guest

    }

    const bookingData = await prisma.Booking.create({ data: bookingPayload });
    

    const userToSendMail = await prisma.User.findUnique({
      where: {
        id: bookingData.userId
      }
    });

    const roomBooked = await prisma.Room.findUnique({
      where: {
        id: bookingData.roomId
      }
    });

    
    await sendEmail({
      to: userToSendMail.email,
      subject: `Booking Status: ${bookingData.status.toUpperCase()}`,
      html: bookingStatusEmail(
        userToSendMail.lastName || "USER",
        bookingData.status,
        roomBooked.name
      )
    })

    return res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message });
  }
};
