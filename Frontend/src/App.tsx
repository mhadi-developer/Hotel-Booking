import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home.tsx"
import Footer from "./components/Footer/Footer.tsx"
import Page404 from "./pages/PageNotFound.tsx"
import { LoginForm } from "./pages/LoginPage.tsx"
import RegisterForm from "./pages/RegistartionPage.tsx"
import { useAuth } from "./hooks/useAuth.ts"
import { useEffect } from "react"
import Rooms from "./pages/Rooms.tsx"
import RoomDetail from "./pages/RoomDetail.tsx"
import AboutUs from "./pages/AboutUs.tsx"
import BookingCart from "./pages/BookingCart.tsx"
import BookingPage from "./pages/BookNow.tsx"
import PaymentSuccess from "./pages/PaymentSuccess.tsx"
import PaymentCancel from "./pages/PaymentCancel.tsx"
import BookingDetail from "./pages/BookingDetailsPage.tsx"
import UserProfile from "./pages/UserProfile.tsx"

export function App() {

  const { getLoggedInUser } = useAuth()
  
  useEffect(() => {
    getLoggedInUser();
  }, [])
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/details/:id?" element={<RoomDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/book-now" element={<BookingPage />} />
        <Route path="/profile" element={<UserProfile />} />
        

        <Route path="/booking/cart" element={<BookingCart />} />
        <Route path="/booking/details/:bookingId" element={<BookingDetail />} />




        <Route path="/login" element={<LoginForm />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />



        <Route path="*" element={<Page404/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
  
}