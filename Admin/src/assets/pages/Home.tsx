import { useEffect } from "react";
import Dashboard from "../components/Home/Dashboard";
import Layout from "../components/Home/Layout";
import socket from "../resources/socket";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type socketData = {
  message: string,
  userId: string,
  bookingId: string,
  roomId?:string
}

const Home = () => {
  useEffect(() => {
    console.log("connecting socket", socket);
    
    socket.connect(); // ensure connection

    socket.emit("join-admin-room");

    const onBookingCreated = (data:socketData) => {
      console.log("booking-created:", data);
      toast.success(data.message || "New booking received")
      toast.success(`USER ID: ${data.userId}`);
      toast.success(`Booking ID: ${data.bookingId}`);
      toast.success(`RoomID: ${data.roomId}`)
    };

    const onBookingCancelled = (data:socketData) => {
      console.log("booking-cancelled:", data);
      toast.error(data.message || "Booking cancelled");
      toast.error(`USER ID: ${data.userId}`);
      toast.error(`BookingID: ${data.bookingId}`);
    };

    socket.on("booking-created", onBookingCreated);
    socket.on("booking-cancelled", onBookingCancelled);

    return () => {
      socket.off("booking-created", onBookingCreated);
      socket.off("booking-cancelled", onBookingCancelled);
    };
  }, []);

  return (
    <div>
      <Layout>
        <Dashboard />
      </Layout>

      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default Home;