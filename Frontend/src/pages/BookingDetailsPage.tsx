import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OffCanvas from "../components/Home/OffCanvas";
import Header from "../components/Home/Header";
import Breadcrumb from "../components/Rooms/BreadCrumb";
import axiosInstance from "../resources/axios.Instance.create";
import "../styles/BookingDetailsPage.css"
import type { room } from "../types/schema/room";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface BookingDetail {
  id: string;
  roomName: string;
  roomId: string;
  userId: string;
    guest: number;
    room: room;
  checkIn: string;
  checkOut: string;
  pricePerDay: number;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const STATUS_META: Record<string, { color: string; label: string; desc: string }> = {
  PENDING:   { color: "#c09b53", label: "Pending",   desc: "Awaiting confirmation from our team." },
  CONFIRMED: { color: "#4caf87", label: "Confirmed", desc: "Your stay has been confirmed." },
  CANCELLED: { color: "#c05050", label: "Cancelled", desc: "This reservation has been cancelled." },
  COMPLETED: { color: "#7a8fa6", label: "Completed", desc: "Your stay has been completed." },
};

const calcNights = (checkIn: string, checkOut: string) => {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
};

const fmt = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

const fmtShort = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit", month: "short", year: "numeric",
  });

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function BookingDetail() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking,  setBooking]  = useState<BookingDetail | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [visible,  setVisible]  = useState(false);

  // ── Fetch ────────────────────────────────────────────────
  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError(null);

        // ────────────────────────────────────────────────────
        // BACKEND — Fetch single booking by ID
        // Replace with your actual route
        // Expected response: { booking: BookingDetail }
        // ────────────────────────────────────────────────────
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_BACKEND_URL}/get/booking/${bookingId}`
        );
        setBooking(data?.fetchedBookingById?? data);
        // ────────────────────────────────────────────────────
      } catch (err: any) {
        setError(err?.response?.data?.message || "Could not load booking details.");
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 80);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const nights = booking ? calcNights(booking.checkIn, booking.checkOut) : 0;
  const status = booking ? (STATUS_META[booking.status] ?? STATUS_META["PENDING"]) : null;

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
     

      <OffCanvas />
      <Header />
      <Breadcrumb />

      <div className="bd-page">
        <div className="container" style={{ maxWidth: "860px" }}>

          {/* Back */}
          <div style={{ paddingTop: "2.5rem" }}>
            <button className="bd-back" onClick={() => navigate(-1)}>
              <span className="bd-back-arrow">←</span>
              Back to Bookings
            </button>
          </div>

          {/* ── Loading ───────────────────────────── */}
          {loading && (
            <div className="bd-state-box">
              <div className="bd-spinner" />
              <p className="bd-state-sub">Loading reservation details…</p>
            </div>
          )}

          {/* ── Error ─────────────────────────────── */}
          {!loading && error && (
            <div className="bd-state-box">
              <div className="bd-state-icon">⚠️</div>
              <h2 className="bd-state-title">Could not load booking</h2>
              <p className="bd-error-box">{error}</p>
            </div>
          )}

          {/* ── Booking Detail ─────────────────────── */}
          {!loading && !error && booking && (
            <>
              {/* Hero */}
              <div className={`bd-hero ${visible ? "visible" : ""}`}>
                <div>
                  <p className="bd-eyebrow">Grand Maison · Reservation</p>
                  <h1 className="bd-room-name">
                    {booking?.room?.name.split(" ").slice(0, -1).join(" ")}{" "}
                    <em>{booking?.room?.name.split(" ").slice(-1)}</em>
                  </h1>
                </div>
                <div className="bd-hero-right">
                  <p className="bd-total-label">Total Charged</p>
                  <div className="bd-total-amount">${booking.totalPrice}</div>
                  <p className="bd-total-nights">{nights} night{nights !== 1 ? "s" : ""} · {booking.guest} guest{booking.guest !== 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Status banner */}
              {status && (
                <div
                  className={`bd-status-banner ${visible ? "visible" : ""}`}
                  style={{
                    borderColor: `${status.color}30`,
                    background: `${status.color}08`,
                  }}
                >
                  <div className="bd-status-dot" style={{ background: status.color }} />
                  <span className="bd-status-text" style={{ color: status.color }}>
                    {status.label}
                  </span>
                  <span className="bd-status-desc">{status.desc}</span>
                </div>
              )}

              {/* Dates strip */}
              <div className={`bd-dates-strip ${visible ? "visible" : ""}`}>
                <div className="bd-date-block">
                  <p className="bd-date-tag">Check In</p>
                  <div className="bd-date-main">{fmtShort(booking.checkIn)}</div>
                  <div className="bd-date-day">
                    {new Date(booking.checkIn).toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                </div>

                <div className="bd-dates-divider">
                  <div className="bd-dates-line" />
                  <div className="bd-nights-count">{nights}</div>
                  <div className="bd-nights-label">Nights</div>
                  <div className="bd-dates-line" />
                </div>

                <div className="bd-date-block right">
                  <p className="bd-date-tag">Check Out</p>
                  <div className="bd-date-main">{fmtShort(booking.checkOut)}</div>
                  <div className="bd-date-day">
                    {new Date(booking.checkOut).toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                </div>
              </div>

              {/* Detail cells */}
              <div className={`bd-grid ${visible ? "visible" : ""}`}>
                <div className="bd-cell">
                  <p className="bd-cell-label">Room</p>
                  <div className="bd-cell-value">{booking?.room?.name}</div>
                  <div className="bd-cell-sub">Room ID · {booking?.room?.id}</div>
                </div>
                <div className="bd-cell">
                  <p className="bd-cell-label">Guests</p>
                  <div className="bd-cell-value">{booking.guest}</div>
                  <div className="bd-cell-sub">
                    {booking.guest === 1 ? "Single occupancy" : "Multiple occupancy"}
                  </div>
                </div>
                <div className="bd-cell">
                  <p className="bd-cell-label">Check In</p>
                  <div className="bd-cell-value" style={{ fontSize: "1rem" }}>{fmt(booking.checkIn)}</div>
                </div>
                <div className="bd-cell">
                  <p className="bd-cell-label">Check Out</p>
                  <div className="bd-cell-value" style={{ fontSize: "1rem" }}>{fmt(booking.checkOut)}</div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className={`bd-pricing ${visible ? "visible" : ""}`}>
                <p className="bd-pricing-title">Pricing Breakdown</p>

                <div className="bd-pricing-row">
                  <span className="bd-pricing-key">Rate per Night</span>
                  <span className="bd-pricing-val">${booking?.room?.price}</span>
                </div>
                <div className="bd-pricing-row">
                  <span className="bd-pricing-key">Nights</span>
                  <span className="bd-pricing-val">{nights}</span>
                </div>
                <div className="bd-pricing-row">
                  <span className="bd-pricing-key">Subtotal</span>
                  <span className="bd-pricing-val">${booking?.room?.price * nights}</span>
                </div>

                <div className="bd-pricing-total-row">
                  <span className="bd-pricing-total-key">Grand Total</span>
                  <span className="bd-pricing-total-val">${booking.totalPrice}</span>
                </div>
              </div>

              {/* Reference */}
              <div className={`bd-reference ${visible ? "visible" : ""}`}>
                <p className="bd-reference-title">Booking Reference</p>
                <div className="bd-id-block">
                  <span className="bd-id-value">{booking.id}</span>
                  {booking.createdAt && (
                    <span className="bd-created">
                      Reserved on{" "}
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit", month: "long", year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}