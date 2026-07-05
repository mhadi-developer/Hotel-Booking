/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import OffCanvas from "../components/Home/OffCanvas";
import Breadcrumb from "../components/Rooms/BreadCrumb";
import Header from "../components/Home/Header";
import axiosInstance from "../resources/axios.Instance.create";
import "../styles/bookingCart.css";
import type { room } from "../types/schema/room";
import { Bounce, toast, ToastContainer } from "react-toastify";

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
// CONFIRMATION MODAL
// ─────────────────────────────────────────────────────────────

interface CancelConfirmModalProps {
  roomName: string;
  isRemoving: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function CancelConfirmModal({
  roomName,
  isRemoving,
  onConfirm,
  onClose,
}: CancelConfirmModalProps) {
  return (
    <div className="gm-modal-backdrop" onClick={onClose}>
      <div
        className="gm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gm-modal-title"
      >
        {/* Icon */}
        <div className="gm-modal-icon">🛎️</div>

        {/* Text */}
        <h2 id="gm-modal-title" className="gm-modal-title">
          Cancel Reservation?
        </h2>
        <p className="gm-modal-body">
          Are you sure you want to cancel your booking for{" "}
          <strong>{roomName}</strong>? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="gm-modal-actions">
          <button
            className="gm-modal-btn-secondary"
            onClick={onClose}
            disabled={isRemoving}
          >
            Keep Booking
          </button>
          <button
            className="gm-modal-btn-danger"
            onClick={onConfirm}
            disabled={isRemoving}
          >
            {isRemoving ? "Cancelling…" : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

const BookingCart = () => {
  const { loggedInUser } = useAuth();
  const currentUser = loggedInUser as { id?: string; email?: string } | null;

  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // ID of the booking pending cancellation — drives the modal
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

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
      } catch (err: unknown) {
        setError(
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to load reservations."
        );
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 80);
      }
    };

    fetchBookings();
  }, []);

  // ───────────────────────────────────────────────────────────
  // CANCEL BOOKING  (only fires after modal confirmation)
  // ───────────────────────────────────────────────────────────
const handleConfirmCancel = async () => {
  if (!confirmCancelId) return;

  setRemovingId(confirmCancelId);

  try {
    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/cancel/booking/${confirmCancelId}`,
      {
        status: "CANCELLED",
      }
    );
    if (response.status === 201) {
      toast.success(response?.data?.message);
    }

    if (response.status === 500) {
      toast.error(response?.data.message)
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === confirmCancelId
          ? {
              ...item,
              status: "CANCELLED",
            }
          : item
      )
    );

    setConfirmCancelId(null);
  } catch (err: unknown) {
    toast.error(err);
  } finally {
    setRemovingId(null);
  }
};

  // ───────────────────────────────────────────────────────────
  // STATUS COLORS
  // ───────────────────────────────────────────────────────────

  const statusColor: Record<string, string> = {
    PENDING:   "#c09b53",
    CONFIRMED: "#4caf87",
    CANCELLED: "#c05050",
    COMPLETED: "#7a8fa6",
  };

  // ───────────────────────────────────────────────────────────
  // FORMAT DATE
  // ───────────────────────────────────────────────────────────

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      day:   "numeric",
      month: "short",
      year:  "numeric",
    });

  // ───────────────────────────────────────────────────────────
  // DERIVED: booking awaiting confirmation
  // ───────────────────────────────────────────────────────────

  const bookingToCancel = cartItems.find((item) => item.id === confirmCancelId);

  // ───────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────
  return (
    <>
      <OffCanvas />
      <Header />
      <Breadcrumb />

      {/* ── Confirmation modal ── */}
      {confirmCancelId && bookingToCancel && (
        <CancelConfirmModal
          roomName={bookingToCancel.roomName}
          isRemoving={removingId === confirmCancelId}
          onConfirm={handleConfirmCancel}
          onClose={() => !removingId && setConfirmCancelId(null)}
        />
      )}

      <div className="gm-cart-page">
        <div className="container">

          {/* HEADER */}
          <div className="gm-page-header">
            <p className="gm-eyebrow">Grand Maison</p>
            <h1 className="gm-page-title">
              Your <em>Reservations</em>
            </h1>
            <p className="gm-page-subtitle">
              View and manage all your hotel bookings.
            </p>
          </div>

          {/* ERROR */}
          {error && <div className="gm-error">{error}</div>}

          {/* LOADING / EMPTY / BOOKINGS (extracted) */}
          {(() => {
            if (loading) {
              return (
                <div className="gm-state-box">
                  <div className="gm-spinner" />
                  <p className="gm-state-subtitle">Retrieving your reservations…</p>
                </div>
              );
            }

            if (cartItems.length === 0) {
              return (
                <div className="gm-state-box">
                  <div className="gm-state-icon">🛎️</div>
                  <h2 className="gm-state-title">No reservations found</h2>
                  <p className="gm-state-subtitle">You have not booked any rooms yet.</p>
                  <button
                    className="gm-checkout-btn mt-4"
                    style={{ maxWidth: "220px", margin: "2rem auto 0" }}
                    onClick={() => { globalThis.location.href = "/rooms"; }}
                  >
                    Explore Rooms
                  </button>
                </div>
              );
            }

            return (
              <div className="row g-4">
                {cartItems.map((item) => (
                  <div className="col-12" key={item.id}>
                    <div className={`gm-booking-item ${visible ? "visible" : ""}`}>
                      <div className="gm-booking-card">
                        <div className="gm-booking-image-wrapper">
                          <img
                            src={item?.room?.images[0]?.secure_url}
                            alt={item.roomName}
                            className="gm-booking-image"
                          />
                        </div>

                        <div className="gm-booking-content">
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-4">
                            <div className="flex-grow-1">
                              <h3 className="gm-room-name">{item.roomName}</h3>

                              <div className="gm-booking-meta">
                                <p>
                                  <strong>Check In:</strong>{" "}
                                  {formatDate(item.checkIn)}
                                </p>
                                <p>
                                  <strong>Check Out:</strong>{" "}
                                  {formatDate(item.checkOut)}
                                </p>
                                <p>
                                  <strong>Guests:</strong> {item.guest}
                                </p>
                                <p>
                                  <strong>Total Price:</strong> ${item.totalPrice}
                                </p>
                              </div>

                              <span
                                className="gm-status-badge"
                                style={{
                                  color: statusColor[item.status] || "#aaa",
                                  borderColor: statusColor[item.status] || "#aaa",
                                  background: `${statusColor[item.status]}15`,
                                }}
                              >
                                {item.status}
                              </span>
                            </div>

                            <div className="gm-booking-actions">
                              <button
                                className="gm-view-btn"
                                onClick={() => { globalThis.location.href = `/booking/details/${item.id}`; }}
                              >
                                View Details
                              </button>

                              {item.status === "PENDING" && (
                                <button
                                  className="gm-btn-remove"
                                  onClick={() => setConfirmCancelId(item.id)}
                                  disabled={removingId === item.id}
                                >
                                  Cancel Booking
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
            );
          })()}
        </div>
         <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
      </div>
    </>
  );
};

export default BookingCart;