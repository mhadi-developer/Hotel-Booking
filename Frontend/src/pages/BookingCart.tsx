/* eslint-disable react-hooks/immutability */
import { useAuth } from "../hooks/useAuth";
import OffCanvas from "../components/Home/OffCanvas";
import Breadcrumb from "../components/Rooms/BreadCrumb";
import Header from "../components/Home/Header";


const BookingCart = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { loggedInUser } = useAuth();
    const currentUser = loggedInUser as { email?: string } | null | undefined;

    if (  !loggedInUser  && !currentUser?.email) {
      window.location.href = ('/login');
      return null;
    };
  // 🔥 Dummy cart data
  const cartItems = [
    {
      id: 1,
      roomName: "Premium King Room",
      guests: 2,
      checkIn: "2026-05-20",
      checkOut: "2026-05-22",
      pricePerDay: 99,
      totalPrice: 198,
    },
    {
      id: 2,
      roomName: "Deluxe Room",
      guests: 3,
      checkIn: "2026-05-21",
      checkOut: "2026-05-23",
      pricePerDay: 86,
      totalPrice: 172,
    },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
    );
    
    

  return (
    <>
      <OffCanvas />
      <Header/>
      <Breadcrumb/>
       <div className="container py-5">

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="fw-bold">Your Booking Cart 🛒</h2>
          <p className="text-muted">
            Review your selected rooms before checkout
          </p>
        </div>
      </div>

      <div className="row g-4">

        {/* Left - Cart Items */}
        <div className="col-lg-8">

          {cartItems.map((item) => (
            <div key={item.id} className="card shadow-sm mb-3 border-0">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  {/* Room Info */}
                  <div>
                    <h5 className="mb-1">{item.roomName}</h5>

                    <p className="mb-1 text-muted">
                      Guests: <strong>{item.guests}</strong>
                    </p>

                    <p className="mb-1 text-muted">
                      Check-in: <strong>{item.checkIn}</strong>
                    </p>

                    <p className="mb-1 text-muted">
                      Check-out: <strong>{item.checkOut}</strong>
                    </p>

                    <span className="badge bg-primary mt-2">
                      ${item.pricePerDay} / day
                    </span>
                  </div>

                  {/* Price + Actions */}
                  <div className="text-end">

                    <h5 className="text-success mb-3">
                      ${item.totalPrice}
                    </h5>

                    <button className="btn btn-outline-danger btn-sm">
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Right - Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h4 className="card-title mb-4">Booking Summary</h4>

              <div className="mb-3 d-flex justify-content-between text-muted">
                <span>Rooms selected</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="mb-3 d-flex justify-content-between text-muted">
                <span>Total cost</span>
                <strong>${totalAmount}</strong>
              </div>

              <div className="mt-auto pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center fw-bold">
                  <span>Grand Total</span>
                  <span className="text-success fs-5">${totalAmount}</span>
                </div>
                <button className="btn btn-primary w-100 mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default BookingCart;