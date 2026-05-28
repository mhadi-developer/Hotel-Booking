import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import OffCanvas from "../components/Home/OffCanvas";
import Breadcrumb from "../components/Rooms/BreadCrumb";
import Header from "../components/Home/Header";
import axiosInstance from "../resources/axios.Instance.create";
import "../styles/bookingCart.css";
import type { room } from "../types/schema/room";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────


interface BookingItem {
  id: string;

  roomName: string;
  roomImage?: string;

  guest: number;

  room: room;
  checkIn: string;
  checkOut: string;

  totalPrice: number;

  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

const BookingCart = () => {
  const { loggedInUser } = useAuth();

  const currentUser = loggedInUser as
    | { id?: string; email?: string }
    | null;

  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // ───────────────────────────────────────────────────────────
  // FETCH BOOKINGS
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          `${import.meta.env.VITE_BACKEND_URL}/get/bookings`
        );

        setCartItems(response?.data?.fetchedAllUserBookings || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load reservations."
        );
      } finally {
        setLoading(false);

        setTimeout(() => {
          setVisible(true);
        }, 80);
      }
    };

    fetchBookings();
  }, []);

  // ───────────────────────────────────────────────────────────
  // REMOVE / CANCEL BOOKING
  // ───────────────────────────────────────────────────────────

  const handleRemove = async (id: string) => {
    setRemovingId(id);

    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`
      );

      setCartItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Could not cancel booking."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ───────────────────────────────────────────────────────────
  // STATUS COLORS
  // ───────────────────────────────────────────────────────────

  const statusColor: Record<string, string> = {
    PENDING: "#c09b53",
    CONFIRMED: "#4caf87",
    CANCELLED: "#c05050",
    COMPLETED: "#7a8fa6",
  };

  // ───────────────────────────────────────────────────────────
  // FORMAT DATE
  // ───────────────────────────────────────────────────────────

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ───────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────


  console.log(cartItems);
  
  return (
    <>
      <OffCanvas />
      <Header />
      <Breadcrumb />

      <div className="gm-cart-page">
        <div className="container">

          {/* HEADER */}
          <div className="gm-page-header">
            <p className="gm-eyebrow">
              Grand Maison
            </p>

            <h1 className="gm-page-title">
              Your <em>Reservations</em>
            </h1>

            <p className="gm-page-subtitle">
              View and manage all your hotel bookings.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="gm-error">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="gm-state-box">
              <div className="gm-spinner" />

              <p className="gm-state-subtitle">
                Retrieving your reservations…
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            // EMPTY STATE
            <div className="gm-state-box">
              <div className="gm-state-icon">
                🛎️
              </div>

              <h2 className="gm-state-title">
                No reservations found
              </h2>

              <p className="gm-state-subtitle">
                You have not booked any rooms yet.
              </p>

              <button
                className="gm-checkout-btn mt-4"
                style={{
                  maxWidth: "220px",
                  margin: "2rem auto 0",
                }}
                onClick={() => {
                  window.location.href = "/rooms";
                }}
              >
                Explore Rooms
              </button>
            </div>
          ) : (
            // BOOKINGS GRID
            <div className="row g-4">

              {cartItems.map((item) => (
                <div
                  className="col-12"
                  key={item.id}
                >
                  <div
                    className={`gm-booking-item ${
                      visible ? "visible" : ""
                    }`}
                  >
                    <div className="gm-booking-card">

                      {/* IMAGE */}
                      <div className="gm-booking-image-wrapper">
                        <img
                          src={
                            item?.room?.images[0]?.secure_url
                          }
                          alt={item.roomName}
                          className="gm-booking-image"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="gm-booking-content">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-4">

                          {/* LEFT */}
                          <div className="flex-grow-1">

                            <h3 className="gm-room-name">
                              {item.roomName}
                            </h3>

                            <div className="gm-booking-meta">

                              <p>
                                <strong>
                                  Check In:
                                </strong>{" "}
                                {formatDate(
                                  item.checkIn
                                )}
                              </p>

                              <p>
                                <strong>
                                  Check Out:
                                </strong>{" "}
                                {formatDate(
                                  item.checkOut
                                )}
                              </p>

                              <p>
                                <strong>
                                  Guests:
                                </strong>{" "}
                                {item.guest}
                              </p>

                              <p>
                                <strong>
                                  Total Price:
                                </strong>{" "}
                                $
                                {item.totalPrice}
                              </p>
                            </div>

                            {/* STATUS */}
                            <span
                              className="gm-status-badge"
                              style={{
                                color:
                                  statusColor[
                                    item.status
                                  ] || "#aaa",

                                borderColor:
                                  statusColor[
                                    item.status
                                  ] || "#aaa",

                                background: `${
                                  statusColor[
                                    item.status
                                  ]
                                }15`,
                              }}
                            >
                              {item.status}
                            </span>
                          </div>

                          {/* ACTIONS */}
                          <div className="gm-booking-actions">

                            {/* VIEW DETAILS */}
                            <button
                              className="gm-view-btn"
                              onClick={() => {
                                window.location.href = `/booking/details/${item.id}`;
                              }}
                            >
                              View Details
                            </button>

                            {/* CANCEL */}
                            {item.status ===
                              "PENDING" && (
                              <button
                                className="gm-btn-remove"
                                onClick={() =>
                                  handleRemove(
                                    item.id
                                  )
                                }
                                disabled={
                                  removingId ===
                                  item.id
                                }
                              >
                                {removingId ===
                                item.id
                                  ? "Cancelling..."
                                  : "Cancel Booking"}
                              </button>
                            )}
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingCart;