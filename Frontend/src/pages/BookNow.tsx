import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/bookigPage.css";
import { useAuth } from "../hooks/useAuth";
import { useRooms } from "../hooks/useRooms";
import axiosInstance from "../resources/axios.Instance.create";

// ─────────────────────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────

type AppView = "home" | "form" | "checkout";

const TODAY = new Date().toISOString().split("T")[0];

const bookingSchema = z
  .object({
    userId: z.string().min(1, "User ID is missing. Please log in first."),
    roomId: z.string().min(1, "Please select a room."),
    guest: z.coerce.number().min(1, "Minimum 1 guest").max(8, "Maximum 8 guests"),
    checkIn: z.string().min(1, "Check-in date is required."),
    checkOut: z.string().min(1, "Check-out date is required."),
    checkInTime: z.string().min(1, "Check-in time is required."),
checkOutTime: z.string().min(1, "Check-out time is required."),
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
  })
  .refine((d) => !d.checkIn || !d.checkOut || new Date(d.checkOut) > new Date(d.checkIn), {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  })
  .refine((d) => !d.checkIn || d.checkIn >= TODAY, {
    message: "Check-in date cannot be in the past.",
    path: ["checkIn"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

interface PendingBooking extends BookingFormValues {
  totalPrice: number;
  roomName: string;
  roomImage: string|undefined;
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HotelBookingPage() {
  const { loggedInUser } = useAuth() as {
    loggedInUser: { id: string; email: string; lastName?: string } | null;
  };
  const { fetchedRooms, loading, error } = useRooms();

  const [view, setView] = useState<AppView>("home");
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      userId: loggedInUser?.id ?? "",
      roomId: "",
      guest: 1,
      checkIn: "",
      checkOut: "",
      status: "PENDING",
      checkInTime: "",
checkOutTime: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  // Sync userId if auth hook resolves after mount
  useEffect(() => {
    if (loggedInUser?.id) {
      setValue("userId", loggedInUser.id);
      trigger("userId");
    }
  }, [loggedInUser, setValue, trigger]);

  // ── Derived values ──────────────────────────────────────────
  const nights = (() => {
    if (!watchedValues.checkIn || !watchedValues.checkOut) return 0;
    const diff =
      new Date(watchedValues.checkOut).getTime() -
      new Date(watchedValues.checkIn).getTime();
    return Math.max(0, Math.floor(diff / 86_400_000));
  })();

  const selectedRoom = fetchedRooms?.find((r) => r.id === watchedValues.roomId);
  const estimatedTotal = selectedRoom ? selectedRoom.price * nights : 0;

  // ── Handlers ────────────────────────────────────────────────

  const onSubmit = (data: BookingFormValues) => {
    setPendingBooking({
      ...data,
      totalPrice: estimatedTotal,
      roomName: selectedRoom?.name ?? "Unknown Room",
      roomImage:selectedRoom?.images[0].secure_url
    });
    setCheckoutError(null);
    setView("checkout");
  };

  const confirmBooking = async () => {
    if (!pendingBooking) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      // ────────────────────────────────────────────────────────
      // BACKEND — Create Stripe Checkout Session
      // Replace "/api/bookings/checkout" with your actual route
      // ────────────────────────────────────────────────────────
      const {data , status} = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/booking/checkout/session`, {
        roomId: pendingBooking.roomId,
        userId: pendingBooking.userId,
      checkIn: new Date(
  `${pendingBooking.checkIn}T${pendingBooking.checkInTime}`
),

checkOut: new Date(
  `${pendingBooking.checkOut}T${pendingBooking.checkOutTime}`
),
        guest: pendingBooking.guest,
        totalPrice: pendingBooking.totalPrice,
        roomName: pendingBooking.roomName,
        roomImage:pendingBooking.roomImage
      });
      if (status === 402) {
        setCheckoutError(data.message);
      }

      window.location.href = data.url;
      // ────────────────────────────────────────────────────────
    } catch (err: any) {
      setCheckoutError(
        err?.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  // VIEW: HOME
  // ─────────────────────────────────────────────────────────
  if (view === "home") {
    return (
      <div className="hotel-page">
        <div className="hotel-hero">
          <div className="container">
            <h1 className="hero-title">
              Welcome to <span>Grand Maison</span>
            </h1>
            <button
              className="btn-home-cta"
              onClick={() => loggedInUser ? setView("form") : null}
              style={{ opacity: loggedInUser ? 1 : 0.5, cursor: loggedInUser ? "pointer" : "not-allowed" }}
              title={!loggedInUser ? "Please log in to reserve a room" : undefined}
            >
              Reserve A Room →
            </button>
            {!loggedInUser && (
              <p className="mt-3 text-warning small">Please log in to make a reservation.</p>
            )}
          </div>
        </div>

        <div className="container py-5">
          {loading && <p className="text-center">Loading rooms...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="row g-4">
            {fetchedRooms?.map((room) => (
              <div className="col-md-4" key={room.id}>
                <div className="booking-card p-3 text-center">
                  <div>
                    <img src={room.images?.[0]?.secure_url} alt={room.name} />
                  </div>
                  <h3>{room.name}</h3>
                  <p className="price-amount">${room.price} /night</p>
                  {loggedInUser ? (
                    <button
                      className="btn-book mt-3"
                      onClick={() => {
                        setValue("roomId", room.id);
                        setView("form");
                      }}
                    >
                      Book Now
                    </button>
                  ) : (
                    <p className="text-danger small mt-3 mb-0">Log in to book this room</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // VIEW: CHECKOUT
  // ─────────────────────────────────────────────────────────
  if (view === "checkout" && pendingBooking) {
    return (
      <div className="hotel-page container py-5">
        <div className="booking-card p-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="section-head mb-4 text-center">Confirm Your Stay</h2>

          <div className="price-summary p-3 bg-light rounded mb-4 text-dark">
            <p><strong>Room:</strong> {pendingBooking.roomName}</p>
            <p>
              <strong>Dates:</strong> {pendingBooking.checkIn} → {pendingBooking.checkOut}{" "}
              <span className="text-muted">({nights} nights)</span>
            </p>
            <p><strong>Guests:</strong> {pendingBooking.guest}</p>
            <hr />
            <p className="h4 text-success mb-0">Total: ${pendingBooking.totalPrice}</p>
          </div>

          {checkoutError && (
            <div className="alert alert-danger mb-3">{checkoutError}</div>
          )}

          <div className="d-flex gap-3">
            <button
              className="btn-book w-100"
              onClick={confirmBooking}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Redirecting to Payment..." : "Confirm & Pay →"}
            </button>
            <button
              className="btn-outline-gold w-100"
              onClick={() => setView("form")}
              disabled={checkoutLoading}
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // VIEW: FORM
  // ─────────────────────────────────────────────────────────

  // Auth guard — blocks direct access to the form if not logged in
  if (!loggedInUser) {
    return (
      <div className="hotel-page container py-5">
        <div className="booking-card p-5 text-center mx-auto" style={{ maxWidth: "500px" }}>
          <h4 className="mb-2">Login Required</h4>
          <p className="text-muted mb-4">You must be logged in to reserve a room.</p>
          <button className="btn-book" onClick={() => setView("home")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hotel-page container py-5">
      <div className="booking-card p-4">
        <h2 className="section-head mb-4">Booking Details</h2>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger mb-4">
            <h5 className="alert-heading">Please fix the following:</h5>
            <ul className="mb-0">
              {Object.entries(errors).map(([field, err]) => (
                <li key={field}>
                  <strong>{field}:</strong> {err?.message || (err as any).root?.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("userId")} />
          <input type="hidden" {...register("status")} />

          {/* Room Select */}
          <div className="mb-4">
            <label className="field-label">Select Room</label>
            <select
              className={`form-select ${errors.roomId ? "is-invalid" : ""}`}
              {...register("roomId")}
            >
              <option value="">Choose Room...</option>
              {fetchedRooms?.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — ${r.price}/night
                </option>
              ))}
            </select>
            {errors.roomId && (
              <p className="text-danger small mt-1">{errors.roomId.message}</p>
            )}
          </div>

          {/* Dates */}
          <div className="row g-3 mb-4">

  <div className="col-md-6">
    <label className="field-label">Check In Date</label>

    <input
      type="date"
      min={TODAY}
      className={`form-control ${errors.checkIn ? "is-invalid" : ""}`}
      {...register("checkIn")}
    />

    {errors.checkIn && (
      <p className="text-danger small mt-1">
        {errors.checkIn.message}
      </p>
    )}
  </div>

  <div className="col-md-6">
    <label className="field-label">Check In Time</label>

    <input
      type="time"
      className={`form-control ${errors.checkInTime ? "is-invalid" : ""}`}
      {...register("checkInTime")}
    />

    {errors.checkInTime && (
      <p className="text-danger small mt-1">
        {errors.checkInTime.message}
      </p>
    )}
  </div>

  <div className="col-md-6">
    <label className="field-label">Check Out Date</label>

    <input
      type="date"
      min={watchedValues.checkIn || TODAY}
      className={`form-control ${errors.checkOut ? "is-invalid" : ""}`}
      {...register("checkOut")}
    />

    {errors.checkOut && (
      <p className="text-danger small mt-1">
        {errors.checkOut.message}
      </p>
    )}
  </div>

  <div className="col-md-6">
    <label className="field-label">Check Out Time</label>

    <input
      type="time"
      className={`form-control ${errors.checkOutTime ? "is-invalid" : ""}`}
      {...register("checkOutTime")}
    />

    {errors.checkOutTime && (
      <p className="text-danger small mt-1">
        {errors.checkOutTime.message}
      </p>
    )}
  </div>
</div>

          {/* Guests */}
          <div className="mb-4 text-center">
            <label className="field-label d-block">Guests</label>
            <Controller
              name="guest"
              control={control}
              render={({ field }) => (
                <div className="guest-counter d-inline-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  >
                    −
                  </button>
                  <span className="h5 mb-0 px-2">{field.value}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      field.onChange(Math.min(selectedRoom?.capacity || 8, field.value + 1))
                    }
                  >
                    +
                  </button>
                </div>
              )}
            />
            {errors.guest && (
              <p className="text-danger small mt-1">{errors.guest.message}</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="price-summary text-center mb-4">
            <p className="price-label m-0">Estimated Total</p>
            <p className="price-amount font-weight-bold h3">${estimatedTotal}</p>
            {nights > 0 && (
              <p className="text-muted small">
                {nights} night{nights > 1 ? "s" : ""} × ${selectedRoom?.price}/night
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="d-flex gap-3">
            <button type="submit" className="btn-book flex-grow-1">
              Proceed to Checkout →
            </button>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() => setView("home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}