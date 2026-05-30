
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './assets/pages/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "lineicons/dist/lineicons.css";
import AddRoomForm from './assets/pages/AddRoomForm';
import NotFound from './assets/pages/PageNotFound';
import BookingManagment from './assets/pages/ManageBookingPage';
import BookingManageId from './assets/pages/ManageBookingById';

function App() {
 
  return <>
  <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add/room' element={<AddRoomForm />} />
        <Route path='/manage/bookings' element={<BookingManagment />} />
        <Route path='/manage/booking/:bookingId' element = {<BookingManageId/>}/>

        
        <Route path='/*' element={<NotFound />} />

        
       </Routes>
      </BrowserRouter>
  </>
}

export default App
