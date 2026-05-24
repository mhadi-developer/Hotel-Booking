import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/bookigPage.css";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../resources/axios.Instance.create";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

type AppView = "home" | "form" | "checkout" | "list";

interface RoomImage {
  id: string;
  imageUrl: string;
}

interface Room {
  id: string;
  name: string;
  price: number;
  description?: string;
  capacity?: number;
  images?: RoomImage[];
}

interface LoggedInUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

const STATUS_META: Record<
  BookingStatus,
  { label: string; badgeClass: string }
> = {
  PENDING: {
    label: "Pending",
    badgeClass: "bg-warning text-dark",
  },

  CONFIRMED: {
    label: "Confirmed",
    badgeClass: "bg-success text-white",
  },

  CANCELLED: {
    label: "Cancelled",
    badgeClass: "bg-danger text-white",
  },

  COMPLETED: {
    label: "Completed",
    badgeClass: "bg-secondary text-white",
  },
};

const TODAY = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────
// ZOD SCHEMA
// ─────────────────────────────────────────────────────────────

const bookingSchema = z
  .object({
    userId: z.string().min(1, "Please login first"),

    roomId: z.string().min(1, "Please select a room"),

    guest: z.coerce
      .number({
        invalid_type_error: "Guests must be a number",
      })
      .min(1, "At least 1 guest required")
      .max(8, "Maximum 8 guests allowed"),

    checkIn: z.string().min(1, "Check-in date is required"),

    checkOut: z.string().min(1, "Check-out date is required"),

    status: z.enum([
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
    ]),
  })

  .refine(
    (d) =>
      !d.checkIn ||
      !d.checkOut ||
      new Date(d.checkOut) > new Date(d.checkIn),

    {
      message: "Check-out must be after check-in",
      path: ["checkOut"],
    }
  )

  .refine((d) => !d.checkIn || d.checkIn >= TODAY, {
    message: "Check-in cannot be in the past",
    path: ["checkIn"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

type SavedBooking = BookingFormValues & {
  id: string;
  totalPrice: number;
  createdAt: string;
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function calcNights(
  checkIn: string,
  checkOut: string
): number {
  if (!checkIn || !checkOut) return 0;

  const diff =
    new Date(checkOut).getTime() -
    new Date(checkIn).getTime();

  return Math.max(0, Math.floor(diff / 86_400_000));
}

function calcTotal(
  rooms: Room[],
  roomId: string,
  nights: number
): number {
  const room = rooms.find((r) => r.id === roomId);

  return room ? room.price * nights : 0;
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HotelBookingPage() {
  const { loggedInUser } = useAuth() as {
    loggedInUser: LoggedInUser | null;
  };

  // ───── STATES ─────

  const [view, setView] =
    useState<AppView>("home");

  const [rooms, setRooms] = useState<Room[]>([]);

  const [roomsLoading, setRoomsLoading] =
    useState(true);

  const [roomsError, setRoomsError] =
    useState<string | null>(null);

  const [bookings, setBookings] = useState<
    SavedBooking[]
  >([]);

  const [submitted, setSubmitted] =
    useState(false);

  const [pendingBooking, setPendingBooking] =
    useState<
      (BookingFormValues & {
        totalPrice: number;
      }) | null
    >(null);

  // ───────────────────────────────────────────────────────────
  // FETCH ROOMS
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    (async () => {
      try {
        setRoomsLoading(true);

        setRoomsError(null);

        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BACKEND_URL}/get/rooms`
        );

        if (res.status !== 200) {
          throw new Error("Failed to fetch rooms");
        }

        const fetchedRooms =
          res.data.fetchedRooms;

        console.log(
          "FETCHED ROOMS =>",
          fetchedRooms
        );

        setRooms(fetchedRooms);

      } catch (err) {
        console.log(err);

        setRoomsError(
          (err as Error).message
        );
      } finally {
        setRoomsLoading(false);
      }
    })();
  }, []);

  // ───────────────────────────────────────────────────────────
  // REACT HOOK FORM
  // ───────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,

    formState: { errors, isValid },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      userId: loggedInUser?.id ?? "",
      roomId: "",
      guest: 1,
      checkIn: "",
      checkOut: "",
      status: "PENDING",
    },

    mode: "onChange",
  });

  const watchedValues = watch();

  const nights = calcNights(
    watchedValues.checkIn,
    watchedValues.checkOut
  );

  const estimatedTotal =
    watchedValues.roomId && nights > 0
      ? calcTotal(
          rooms,
          watchedValues.roomId,
          nights
        )
      : 0;

  const selectedRoom = rooms.find(
    (r) => r.id === watchedValues.roomId
  );

  // ───────────────────────────────────────────────────────────
  // SUBMIT
  // ───────────────────────────────────────────────────────────

  const onSubmit = (
    data: BookingFormValues
  ) => {
    const finalPayload = {
      ...data,

      totalPrice: estimatedTotal,

      bookedBy: loggedInUser?.lastName,

      bookedByEmail: loggedInUser?.email,

      bookingDate: new Date().toISOString(),
    };

    console.log(
      "FINAL BOOKING PAYLOAD =>",
      finalPayload
    );

    setPendingBooking({
      ...data,
      totalPrice: estimatedTotal,
    });

    setView("checkout");
  };

  // ───────────────────────────────────────────────────────────
  // CONFIRM BOOKING
  // ───────────────────────────────────────────────────────────

  const confirmBooking = () => {
    if (!pendingBooking) return;

    const newBooking: SavedBooking = {
      ...pendingBooking,

      id: `BK-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`,

      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [
      newBooking,
      ...prev,
    ]);

    setSubmitted(true);

    reset({
      userId: loggedInUser?.id ?? "",
      roomId: "",
      guest: 1,
      checkIn: "",
      checkOut: "",
      status: "PENDING",
    });

    setTimeout(() => {
      setSubmitted(false);

      setView("list");
    }, 1500);
  };

  // ───────────────────────────────────────────────────────────
  // HOME VIEW
  // ───────────────────────────────────────────────────────────

  if (view === "home") {
    return (
      <div className="hotel-page">
        <div className="hotel-hero">
          <div className="container">

            {/* USER PROFILE */}
            {loggedInUser && (
              <div className="guest-info-banner mb-4">
                <span className="guest-info-avatar">
                  {loggedInUser?.lastName
                    ?.charAt(0)
                    .toUpperCase()}
                </span>

                <div>
                  <p className="guest-info-name">
                    {loggedInUser?.lastName}
                  </p>

                  <p className="guest-info-email">
                    {loggedInUser.email}
                  </p>
                </div>

                <span className="guest-info-badge">
                  Logged In Guest
                </span>
              </div>
            )}

            <p className="hero-eyebrow">
              Est. 1924 · Rawalpindi
            </p>

            <h1 className="hero-title">
              Welcome{" "}
              {loggedInUser
                ?   loggedInUser?.lastName
                : "Guest"}{" "}
              to <span>Grand Maison</span>
            </h1>

            <p className="hero-sub">
              Luxury rooms with premium comfort.
            </p>

            <button type="button"
              className="btn-home-cta"
              onClick={() => setView("form")}
            >
              Reserve A Room →
            </button>
          </div>
        </div>

        {/* ROOMS */}
        <div className="container py-5">

          <div className="text-center mb-5">
            <h2 className="section-head">
              Our Rooms & Suites
            </h2>
          </div>

          {roomsLoading && (
            <div className="text-center">
              Loading rooms...
            </div>
          )}

          {roomsError && (
            <div className="text-danger text-center">
              {roomsError}
            </div>
          )}

          {!roomsLoading &&
            !roomsError &&
            rooms.length > 0 && (
              <div className="row g-4">

                {rooms.map((room) => (
                  <div
                    className="col-md-4"
                    key={room.id}
                  >
                    <div className="booking-card p-3">

                      {/* ROOM IMAGE */}
                      {room.images?.[0]
                        ?.imageUrl && (
                        <img
                          src={
                            room.images[0]
                              .imageUrl
                          }
                          alt={room.name}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            marginBottom: "1rem",
                          }}
                        />
                      )}

                      <h3>{room.name}</h3>

                      <p>
                        {room.description}
                      </p>

                      <h4>
                        ${room.price}
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "#999",
                          }}
                        >
                          {" "}
                          /night
                        </span>
                      </h4>

                      {room.capacity && (
                        <p>
                          Up to{" "}
                          {room.capacity} guests
                        </p>
                      )}

                      <button
                        className="btn-book mt-3"
                        onClick={() =>
                          setView("form")
                        }
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────
  // FORM VIEW
  // ───────────────────────────────────────────────────────────

  return (
    <div className="hotel-page">
      <div className="container py-5">

        <div className="booking-card p-4">

          <h2 className="section-head mb-4">
            Booking Details
          </h2>

          {/* USER INFO */}
          {loggedInUser && (
            <div className="guest-info-banner mb-4">
              <span className="guest-info-avatar">
                {loggedInUser?.lastName
                  ?.charAt(0)
                  .toUpperCase()}
              </span>

              <div>
                <p className="guest-info-name">
                  {loggedInUser?.lastName}
                </p>

                <p className="guest-info-email">
                  {loggedInUser.email}
                </p>
              </div>

              <span className="guest-info-badge">
                Booking As This Guest
              </span>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* HIDDEN USER ID */}
            <input
              type="hidden"
              {...register("userId")}
            />

            {/* ROOM */}
            <div className="mb-4">
              <label className="field-label">
                Room
              </label>

              <select
                className={`form-select ${
                  errors.roomId
                    ? "is-invalid"
                    : ""
                }`}
                {...register("roomId")}
              >
                <option value="">
                  Select Room
                </option>

                {rooms.map((room) => (
                  <option
                    key={room.id}
                    value={room.id}
                  >
                    {room.name} - $
                    {room.price}
                  </option>
                ))}
              </select>

              {errors.roomId && (
                <p className="field-error">
                  {errors.roomId.message}
                </p>
              )}
            </div>

            {/* DATES */}
            <div className="row g-3 mb-4">

              <div className="col-md-6">
                <label className="field-label">
                  Check In
                </label>

                <input
                  type="date"
                  min={TODAY}
                  className={`form-control ${
                    errors.checkIn
                      ? "is-invalid"
                      : ""
                  }`}
                  {...register("checkIn")}
                />

                {errors.checkIn && (
                  <p className="field-error">
                    {errors.checkIn.message}
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <label className="field-label">
                  Check Out
                </label>

                <input
                  type="date"
                  min={
                    watchedValues.checkIn ||
                    TODAY
                  }
                  className={`form-control ${
                    errors.checkOut
                      ? "is-invalid"
                      : ""
                  }`}
                  {...register("checkOut")}
                />

                {errors.checkOut && (
                  <p className="field-error">
                    {errors.checkOut.message}
                  </p>
                )}
              </div>
            </div>

            {/* GUEST COUNTER */}
            <div className="mb-4">
              <label className="field-label">
                Guests
              </label>

              <Controller
                name="guest"
                control={control}
                render={({ field }) => (
                  <div className="guest-counter">
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange(
                          Math.max(
                            1,
                            field.value - 1
                          )
                        )
                      }
                    >
                      −
                    </button>

                    <span>{field.value}</span>

                    <button
                      type="button"
                      onClick={() =>
                        field.onChange(
                          Math.min(
                            selectedRoom?.capacity ??
                              8,
                            field.value + 1
                          )
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              />

              {errors.guest && (
                <p className="field-error">
                  {errors.guest.message}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div className="mb-4">
              <label className="field-label">
                Status
              </label>

              <select
                className="form-select"
                {...register("status")}
              >
                {(Object.keys(
                  STATUS_META
                ) as BookingStatus[]).map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {
                        STATUS_META[status]
                          .label
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* TOTAL */}
            <div className="price-summary mt-4">
              <p className="price-label">
                Estimated Total
              </p>

              <p className="price-amount">
                ${estimatedTotal}
              </p>

              {selectedRoom && nights > 0 && (
                <p className="price-per">
                  {nights} nights × $
                  {selectedRoom.price}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="d-flex gap-3 mt-4">
              <button
                type="submit"
                disabled={!isValid}
                className="btn-book"
              >
                Proceed To Checkout →
              </button>

              <button
                type="button"
                className="btn-outline-gold"
                onClick={() =>
                  setView("home")
                }
              >
                Back
              </button>
            </div>
          </form>

          {/* CHECKOUT PREVIEW */}
          {view === "checkout" &&
            pendingBooking && (
              <div className="mt-5">

                <h3>Booking Summary</h3>

                <pre>
                  {JSON.stringify(
                    pendingBooking,
                    null,
                    2
                  )}
                </pre>

                <button
                  className="btn-book"
                  onClick={confirmBooking}
                >
                  {submitted
                    ? "Confirmed ✓"
                    : "Confirm Booking"}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}