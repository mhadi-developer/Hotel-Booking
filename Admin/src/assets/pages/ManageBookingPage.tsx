import "bootstrap/dist/css/bootstrap.min.css";
import "../utils/css/bookingManagmentPage.css";
import { useEffect, useState } from "react";
import axiosInstance from "../resources/axiosInstance";
import { Link } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
export type UserRole = "USER" | "ADMIN";

export interface RoomImage {
  id: string;
  public_id: string;
  secure_url: string;
  roomId: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  images: RoomImage[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guest: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  room?: Room;
  user?: User;
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/get/bookings`
        );
        setBookings(response?.data?.fetchedBookings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllBookings();
  }, []);

function fmtDateTime(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    day:      "2-digit",
    month:    "short",
    year:     "numeric",
    hour:     "2-digit",
    minute:   "2-digit",
    hour12: true,
  });
}

  const handleDelete = async (bookingId: string): Promise<void> => {
    setDeletingId(bookingId);
    try {
     const  response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/delete/booking/${bookingId}`
      );
      // Remove the deleted booking from local state
      toast.success(response?.data?.message);
      if (response.status === 500) {
        toast.error(response.data.message);
      }
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Failed to delete booking:", error);
        } finally {
      setDeletingId(null);
    }
  };

  const totalIncome = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  return (
    <div className="booking-page container-fluid py-4 px-3 px-lg-5">
      {/* Header */}
      <div className="booking-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
        <div>
          <h1 className="page-title">Grand Maison</h1>
          <p className="page-subtitle mb-0">Booking Orchestration Center</p>
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search booking..."
          />
          <button className="btn premium-btn px-4 rounded-pill">
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-xl-3">
          <div className="premium-card">
            <span className="stat-icon">🏨</span>
            <h2 className="stat-number mt-3">{bookings.length}</h2>
            <p className="text-secondary mb-0">Active Bookings</p>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="premium-card">
            <span className="stat-icon">💰</span>
            <h2 className="stat-number mt-3">{totalIncome} $</h2>
            <p className="text-secondary mb-0">Total Income</p>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="premium-card">
            <span className="stat-icon">⭐</span>
            <h2 className="stat-number mt-3">4.9/5</h2>
            <p className="text-secondary mb-0">Guest Rating</p>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="premium-card">
            <span className="stat-icon">📈</span>
            <h2 className="stat-number mt-3">86%</h2>
            <p className="text-secondary mb-0">Occupancy Rate</p>
          </div>
        </div>
      </div>

      {/* Booking Table */}
      <div className="premium-table-wrapper">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h3 className="fw-bold mb-1">Recent Reservations</h3>
            <p className="text-secondary mb-0 small">
              Manage and orchestrate guest bookings.
            </p>
          </div>
          <button className="btn btn-outline-light rounded-pill px-4">
            Export Report
          </button>
        </div>

        <div className="table-responsive">
          <table className="table premium-table align-middle">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking?.user?.lastName}</td>
                  <td>{booking.room?.name}</td>
                  <td>{fmtDateTime(booking.checkIn)}</td>
                  <td>{fmtDateTime(booking.checkOut)}</td>
                  <td>{booking.totalPrice}/$</td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        booking.status === "CONFIRMED"
                          ? "bg-success-subtle text-success"
                          : booking.status === "PENDING"
                          ? "bg-warning-subtle text-warning"
                          : "bg-danger-subtle text-danger"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      {/* Delete button — replaces the old View button */}
                      <button
                        className="btn btn-sm btn-danger rounded-pill px-3"
                        onClick={() => handleDelete(booking.id)}
                        disabled={booking.status === "CONFIRMED"}
                      >
                        {deletingId === booking.id ? "Deleting…" : "Delete"}
                      </button>

                      <Link
                        className="btn btn-sm premium-btn rounded-pill px-3"
                        to={`/manage/booking/${booking.id}`}
                      >
                        Manage
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}