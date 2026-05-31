import { useEffect, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import "../utils/css/manageBookingById.css";
import axiosInstance from "../resources/axiosInstance";
import { useParams } from "react-router";

/* ══════════════════════════════════════════════════
   ENUMS  (match your backend exactly)
══════════════════════════════════════════════════ */

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type UserRole = "admin" | "user";

/* ══════════════════════════════════════════════════
   INTERFACES  (your backend schema, unchanged)
══════════════════════════════════════════════════ */

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

/* ══════════════════════════════════════════════════
   INTERNAL-ONLY TYPES  (UI state, not from backend)
══════════════════════════════════════════════════ */

interface StatusMeta {
  label: string;
  dot: string;
}

interface AdminNote {
  text: string;
  time: string;
}

interface QuickAction {
  icon: string;
  label: string;
  danger?: boolean;
}

type TabKey = "overview" | "guest" | "room" | "billing" | "history";

/* ══════════════════════════════════════════════════
   REACT HOOK FORM — Booking Edit
══════════════════════════════════════════════════ */

interface BookingEditFormValues {
  checkIn: string;
  checkOut: string;
  guest: number;
}

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */

const STATUS_OPTIONS: BookingStatus[] = ["pending", "confirmed", "cancelled"];

const STATUS_META: Record<BookingStatus, StatusMeta> = {
  pending:   { label: "Pending",   dot: "#D4A017" },
  confirmed: { label: "Confirmed", dot: "#27AE60" },
  cancelled: { label: "Cancelled", dot: "#E53935" },
};

const TABS: TabKey[] = ["overview", "guest", "room", "billing", "history"];

const QUICK_ACTIONS: QuickAction[] = [
  { icon: "✏️", label: "Edit Booking Dates" },
  { icon: "🛏",  label: "Change Room" },
  { icon: "➕", label: "Add-On Services" },
  { icon: "💬", label: "Contact Guest" },
  { icon: "💰", label: "Issue Refund" },
  { icon: "🚫", label: "Cancel Booking", danger: true },
];

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */

function calcNights(checkIn?: string, checkOut?: string): number {
  if (!checkIn || !checkOut) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay,
  );
}

function getInitials(user: User): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  return user.email ? user.email[0].toUpperCase() : "?";
}

function isAvatarUrl(avatar?: string): boolean {
  if (!avatar) return false;
  return avatar.startsWith("http://") || avatar.startsWith("https://");
}

function fmtDate(dateStr?: string, opts?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", opts);
}

/** Convert a JS Date or ISO string to the value="YYYY-MM-DD" format for <input type="date"> */
function toInputDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().split("T")[0];
}

/* ══════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════ */

interface StatusBadgeProps {
  status?: BookingStatus;
  size?: "md" | "sm";
}

function StatusBadge({ status, size = "md" }: StatusBadgeProps): JSX.Element {
  if (!status) return <span className="bmp-badge bmp-badge--sm">—</span>;
  const meta = STATUS_META[status];
  return (
    <span className={`bmp-badge bmp-badge--${size} bmp-badge--${status}`}>
      <span className="bmp-badge__dot" style={{ background: meta?.dot }} />
      {meta?.label}
    </span>
  );
}

interface SectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps): JSX.Element {
  return (
    <div className="bmp-section">
      <div className="bmp-section__header">
        <span className="bmp-section__icon">{icon}</span>
        <span className="bmp-section__title">{title}</span>
      </div>
      <div className="bmp-section__body">{children}</div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string | number;
  accent?: boolean;
  mono?: boolean;
}

function InfoRow({ label, value, accent = false, mono = false }: InfoRowProps): JSX.Element {
  const valueClass = [
    "bmp-info-row__value",
    accent ? "bmp-info-row__value--accent" : "",
    mono   ? "bmp-info-row__value--mono"   : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bmp-info-row">
      <span className="bmp-info-row__label">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

interface AvatarProps {
  user: User;
}

function Avatar({ user }: AvatarProps): JSX.Element {
  if (isAvatarUrl(user.avatar)) {
    return (
      <img
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        className="bmp-avatar bmp-avatar--img"
      />
    );
  }
  return <div className="bmp-avatar">{getInitials(user)}</div>;
}

interface RoomGalleryProps {
  images: RoomImage[];
  roomName: string;
}

function RoomGallery({ images, roomName }: RoomGalleryProps): JSX.Element | null {
  const [active, setActive] = useState<number>(0);
  if (!images || !images.length) return null;

  return (
    <div className="bmp-gallery">
      <div className="bmp-gallery__main">
        <img
          src={images[active]?.secure_url}
          alt={`${roomName} — view ${active + 1}`}
          className="bmp-gallery__main-img"
        />
      </div>
      {images.length > 1 && (
        <div className="bmp-gallery__thumbs">
          {images.map((img, i) => (
            <button
              key={img.id}
              className={`bmp-gallery__thumb${active === i ? " bmp-gallery__thumb--active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={img.secure_url} alt={`Thumbnail ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   BOOKING EDIT MODAL  (React Hook Form + PATCH)
══════════════════════════════════════════════════ */

interface BookingEditModalProps {
  booking: Booking;
  onClose: () => void;
  onSaved: (updated: Booking) => void;
}

function BookingEditModal({ booking, onClose, onSaved }: BookingEditModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingEditFormValues>({
    defaultValues: {
      checkIn:  toInputDate(booking.checkIn),
      checkOut: toInputDate(booking.checkOut),
      guest:    booking.guest,
    },
  });

  const watchedCheckIn  = watch("checkIn");
  const watchedCheckOut = watch("checkOut");
  const previewNights   = calcNights(watchedCheckIn, watchedCheckOut);

  const onSubmit = async (data: BookingEditFormValues): Promise<void> => {
    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_API_BASE_URL}/admin/update/booking/${booking.id}`,
      {
        checkIn:  data.checkIn,
        checkOut: data.checkOut,
        guest:    Number(data.guest),
      },
    );

    // Adjust to your actual response shape if needed
    const updatedBooking: Booking = response?.data?.updatedBooking ?? {
      ...booking,
      checkIn:  data.checkIn,
      checkOut: data.checkOut,
      guest:    Number(data.guest),
    };

    onSaved(updatedBooking);
    onClose();
  };

  return (
    /* ── Backdrop ── */
    <div className="bmp-modal-backdrop" onClick={onClose}>
      {/* ── Modal card ── */}
      <div
        className="bmp-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bmp-modal-title"
      >
        {/* Header */}
        <div className="bmp-modal__header">
          <div className="bmp-modal__header-icon">✏️</div>
          <div>
            <div id="bmp-modal-title" className="bmp-modal__title">Edit Booking</div>
            <div className="bmp-modal__subtitle">Modify dates &amp; guest count</div>
          </div>
          <button
            className="bmp-modal__close"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="bmp-modal__body">

            {/* Check-In / Check-Out row */}
            <div className="bmp-modal__row">
              {/* Check-In */}
              <div className="bmp-modal__field">
                <label htmlFor="bmp-checkIn" className="bmp-modal__label">
                  Check-In Date
                </label>
                <input
                  id="bmp-checkIn"
                  type="date"
                  className={`bmp-modal__input${errors.checkIn ? " bmp-modal__input--error" : ""}`}
                  {...register("checkIn", {
                    required: "Check-in date is required",
                  })}
                />
                {errors.checkIn && (
                  <span className="bmp-modal__error">{errors.checkIn.message}</span>
                )}
              </div>

              {/* Check-Out */}
              <div className="bmp-modal__field">
                <label htmlFor="bmp-checkOut" className="bmp-modal__label">
                  Check-Out Date
                </label>
                <input
                  id="bmp-checkOut"
                  type="date"
                  className={`bmp-modal__input${errors.checkOut ? " bmp-modal__input--error" : ""}`}
                  {...register("checkOut", {
                    required: "Check-out date is required",
                    validate: (val) =>
                      !watchedCheckIn ||
                      new Date(val) > new Date(watchedCheckIn) ||
                      "Check-out must be after check-in",
                  })}
                />
                {errors.checkOut && (
                  <span className="bmp-modal__error">{errors.checkOut.message}</span>
                )}
              </div>
            </div>

            {/* Computed-nights badge */}
            <div className="bmp-modal__nights-badge">
              <span className="bmp-modal__nights-label">Duration</span>
              <span className="bmp-modal__nights-value">
                {previewNights > 0
                  ? `${previewNights} night${previewNights !== 1 ? "s" : ""}`
                  : "—"}
              </span>
            </div>

            {/* Guests */}
            <div className="bmp-modal__field" style={{ maxWidth: 200 }}>
              <label htmlFor="bmp-guest" className="bmp-modal__label">
                Number of Guests
              </label>
              <input
                id="bmp-guest"
                type="number"
                min={1}
                max={20}
                className={`bmp-modal__input${errors.guest ? " bmp-modal__input--error" : ""}`}
                {...register("guest", {
                  required: "Guest count is required",
                  min: { value: 1, message: "At least 1 guest" },
                  max: { value: 20, message: "Maximum 20 guests" },
                  valueAsNumber: true,
                })}
              />
              {errors.guest && (
                <span className="bmp-modal__error">{errors.guest.message}</span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bmp-modal__footer">
            <button
              type="button"
              className="bmp-btn-outline-gold"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bmp-btn-dark-gold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════════ */

export default function BookingManagePage(): JSX.Element {
  const { bookingId } = useParams<{ bookingId: string }>();

  const [booking, setBooking]               = useState<Booking | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>();
  const [noteText, setNoteText]             = useState<string>("");
  const [notes, setNotes]                   = useState<AdminNote[]>([]);
  const [saving, setSaving]                 = useState<boolean>(false);
  const [saved, setSaved]                   = useState<boolean>(false);
  const [searchId, setSearchId]             = useState<string>("");
  const [activeTab, setActiveTab]           = useState<TabKey>("overview");
  const [loading, setLoading]               = useState<boolean>(true);
  const [showEditModal, setShowEditModal]   = useState<boolean>(false);   // ← NEW

  useEffect(() => {
    async function getBookingById() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/get/booking/${bookingId}`,
        );
        const fetchedData = response?.data?.fetchedBookingById;
        setBooking(fetchedData);
        if (fetchedData) {
          setSelectedStatus(fetchedData.status);
        }
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) {
      getBookingById();
    }
  }, [bookingId]);

  /* Derived values straight from backend fields */
  const nights: number       = calcNights(booking?.checkIn, booking?.checkOut);
  const roomTotal: number    = (booking?.room?.price ?? 0) * nights;
  const userData             = booking?.user;
  const roomData             = booking?.room;

  /* ── Status PATCH ── */
  const handleStatusUpdate = async (): Promise<void> => {
    if (!booking || selectedStatus === booking.status) return;
    setSaving(true);
    try {
      const response = await axiosInstance.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/update/booking/${booking.id}`,
        { status: selectedStatus },
      );

      // Use the server's updated booking if returned; otherwise apply locally
      const updatedBooking: Booking =
        response?.data?.updatedBooking ?? { ...booking, status: selectedStatus! };

      setBooking(updatedBooking);
      setSelectedStatus(updatedBooking.status);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Failed to update booking status:", error);
    } finally {
      setSaving(false);
    }
  };

  /* ── Booking-edit saved callback ── */
  const handleBookingEdited = (updatedBooking: Booking): void => {
    setBooking(updatedBooking);
  };

  /* Quick Actions dispatcher */
  const handleQuickAction = (label: string): void => {
    if (label === "Edit Booking Dates") {
      setShowEditModal(true);
    }
    // Other actions can be wired up here
  };

  const handleAddNote = (): void => {
    if (!noteText.trim()) return;
    setNotes((prev) => [
      ...prev,
      { text: noteText, time: new Date().toLocaleString() },
    ]);
    setNoteText("");
  };

  const tabLabel = (t: string): string =>
    t.charAt(0).toUpperCase() + t.slice(1);

  const applyBtnClass = (): string => {
    if (saving) return "bmp-status-apply-btn bmp-status-apply-btn--saving";
    if (saved)  return "bmp-status-apply-btn bmp-status-apply-btn--saved";
    if (selectedStatus === booking?.status)
      return "bmp-status-apply-btn bmp-status-apply-btn--disabled";
    return "bmp-status-apply-btn bmp-status-apply-btn--idle";
  };

  const applyBtnLabel = (): string => {
    if (saving) return "Updating…";
    if (saved)  return "✓ Status Updated";
    return "Apply Status Change";
  };

  if (loading) {
    return (
      <div
        className="bmp-page"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
          color: "#D4A017",
        }}
      >
        <h3>Loading Luxury Suite Management Panel...</h3>
      </div>
    );
  }

  if (!booking) {
    return (
      <div
        className="bmp-page"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
          color: "#E53935",
        }}
      >
        <h3>Booking record could not be recovered. Verify Registry Log.</h3>
      </div>
    );
  }

  return (
    <div className="bmp-page">

      {/* ─── Edit Modal ─── */}
      {showEditModal && (
        <BookingEditModal
          booking={booking}
          onClose={() => setShowEditModal(false)}
          onSaved={handleBookingEdited}
        />
      )}

      {/* ─── Header ─── */}
      <header className="bmp-header">
        <div className="bmp-header__inner">
          <div className="bmp-header__top">
            <div>
              <div className="bmp-header__brand-name">GRAND MAISON</div>
              <div className="bmp-header__brand-sub">HOTEL MANAGEMENT SYSTEM</div>
            </div>

            <div className="bmp-header__controls">
              <div className="bmp-search-box">
                <input
                  className="bmp-search-box__input"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Booking ID"
                />
                <button className="bmp-search-box__btn">FIND</button>
              </div>
              <div className="bmp-header__avatar">A</div>
            </div>
          </div>

          <nav className="bmp-tabs" aria-label="Booking sections">
            {TABS.map((t) => (
              <button
                key={t}
                className={`bmp-tab${activeTab === t ? " bmp-tab--active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {tabLabel(t)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="bmp-main">
        {/* Booking ID Bar */}
        <div className="bmp-id-bar">
          <div className="bmp-id-bar__left">
            <div>
              <div className="bmp-id-bar__label">Booking ID</div>
              <div className="bmp-id-bar__id">{booking.id}</div>
            </div>
            <div className="bmp-id-bar__divider" />
            <StatusBadge status={booking.status} />
            <div className="bmp-id-bar__meta">
              Created{" "}
              {fmtDate(booking.createdAt, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="bmp-id-bar__actions">
            <button className="bmp-btn-outline-gold">🖨 Print</button>
            <button className="bmp-btn-dark-gold">✉ Email Guest</button>
          </div>
        </div>

        {/* Two-column grid */}
        <div className="bmp-grid">
          {/* ══ LEFT COLUMN ══ */}
          <div>
            {/* ── GUEST ── */}
            {(activeTab === "overview" || activeTab === "guest") && userData && (
              <Section title="Guest Information" icon="👤">
                <div className="bmp-guest-header">
                  <Avatar user={userData} />
                  <div>
                    <div className="bmp-guest-name">
                      {userData.firstName} {userData.lastName}
                    </div>
                    <div className="bmp-guest-loyalty">
                      {userData.role === "admin"
                        ? "Administrator"
                        : "Registered Guest"}
                    </div>
                  </div>
                  <span className="bmp-loyalty-pill">
                    {userData.role === "admin" ? "🔑 Admin" : "🧳 Guest"}
                  </span>
                </div>

                <InfoRow label="User ID"      value={userData.id}        mono />
                <InfoRow label="Email"        value={userData.email} />
                <InfoRow label="First Name"   value={userData.firstName} />
                <InfoRow label="Last Name"    value={userData.lastName} />
                <InfoRow label="Role"         value={userData.role} />
                <InfoRow
                  label="Member Since"
                  value={fmtDate(userData.createdAt, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                />
              </Section>
            )}

            {/* ── ROOM ── */}
            {(activeTab === "overview" || activeTab === "room") && roomData && (
              <Section title="Room Details" icon="🛏">
                <RoomGallery images={roomData.images} roomName={roomData.name} />

                <div className="bmp-room-card">
                  <div>
                    <div className="bmp-room-card__id-label">Room ID</div>
                    <div className="bmp-room-card__id">{roomData.id}</div>
                  </div>
                  <div>
                    <div className="bmp-room-card__name">{roomData.name}</div>
                    <div className="bmp-room-card__sub">{roomData.type}</div>
                  </div>
                </div>

                <InfoRow label="Room Type"    value={roomData.type} />
                <InfoRow label="Rate per Night" value={`£${roomData.price}`} accent />
                <InfoRow
                  label="Availability"
                  value={roomData.isBooked ? "Currently Booked" : "Available"}
                />
                <InfoRow
                  label="Last Updated"
                  value={fmtDate(roomData.updatedAt, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                />
                <InfoRow label="Room ID" value={roomData.id} mono />
                <InfoRow
                  label="Images"
                  value={`${roomData.images?.length ?? 0} photo${
                    roomData.images?.length !== 1 ? "s" : ""
                  }`}
                />
              </Section>
            )}

            {/* ── BILLING ── */}
            {(activeTab === "overview" || activeTab === "billing") && roomData && (
              <Section title="Billing Summary" icon="💳">
                <div className="bmp-billing-row">
                  <span className="bmp-billing-row__name">
                    {roomData.name} × {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span className="bmp-billing-row__price">
                    £{roomTotal.toLocaleString()}
                  </span>
                </div>

                {booking.totalPrice > roomTotal && (
                  <div className="bmp-billing-row">
                    <span className="bmp-billing-row__name">Additional Charges</span>
                    <span className="bmp-billing-row__price">
                      £{(booking.totalPrice - roomTotal).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="bmp-billing-total">
                  <span className="bmp-billing-total__label">Total Charged</span>
                  <span className="bmp-billing-total__amount">
                    £{booking.totalPrice.toLocaleString()}
                  </span>
                </div>

                <InfoRow
                  label="Guests"
                  value={`${booking.guest} guest${booking.guest !== 1 ? "s" : ""}`}
                />
                <InfoRow
                  label="Nights"
                  value={`${nights} night${nights !== 1 ? "s" : ""}`}
                />
                <InfoRow label="Rate / night" value={`£${roomData.price}`} accent />
              </Section>
            )}

            {/* ── HISTORY ── */}
            {activeTab === "history" && (
              <Section title="Status History" icon="📋">
                <div className="bmp-history-item" style={{ paddingBottom: 0 }}>
                  <div className="bmp-history-item__timeline">
                    <div
                      className="bmp-history-item__dot"
                      style={{ background: STATUS_META[booking.status]?.dot }}
                    />
                  </div>
                  <div>
                    <StatusBadge status={booking.status} size="sm" />
                    <div className="bmp-history-item__date">
                      {fmtDate(booking.createdAt, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="bmp-history-item__by">
                      Created · Booking #{booking.id}
                    </div>
                  </div>
                </div>

                <div className="bmp-notes-label" style={{ marginTop: 20 }}>
                  Internal Admin Notes
                </div>
                {notes.length === 0 && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 12,
                    }}
                  >
                    No notes yet.
                  </p>
                )}
                {notes.map((n, i) => (
                  <div key={i} className="bmp-note-card">
                    <div className="bmp-note-card__text">{n.text}</div>
                    <div className="bmp-note-card__time">{n.time}</div>
                  </div>
                ))}
                <div className="bmp-notes-form">
                  <input
                    className="bmp-notes-form__input"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add internal admin note…"
                  />
                  <button className="bmp-notes-form__btn" onClick={handleAddNote}>
                    ADD
                  </button>
                </div>
              </Section>
            )}

            {/* ── OVERVIEW ONLY: Booking summary card ── */}
            {activeTab === "overview" && (
              <Section title="Booking Summary" icon="📋">
                <InfoRow label="Booking ID" value={booking.id}       mono />
                <InfoRow label="User ID"    value={booking.userId}   mono />
                <InfoRow label="Room ID"    value={booking.roomId}   mono />
                <InfoRow label="Guests"     value={booking.guest} />
                <InfoRow
                  label="Created At"
                  value={fmtDate(booking.createdAt, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                />
              </Section>
            )}
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <aside>
            {/* Stay Summary */}
            <div className="bmp-stay-card">
              <div className="bmp-stay-card__label">Stay Summary</div>
              <div className="bmp-stay-grid">
                {[
                  {
                    label: "Check-In",
                    value: fmtDate(booking.checkIn, {
                      day: "2-digit",
                      month: "short",
                    }),
                  },
                  {
                    label: "Check-Out",
                    value: fmtDate(booking.checkOut, {
                      day: "2-digit",
                      month: "short",
                    }),
                  },
                  { label: "Nights", value: String(nights) },
                  { label: "Guests", value: String(booking.guest) },
                ].map((s) => (
                  <div key={s.label} className="bmp-stay-stat">
                    <div className="bmp-stay-stat__label">{s.label}</div>
                    <div className="bmp-stay-stat__value">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="bmp-stay-card__total-row">
                <span className="bmp-stay-card__total-label">Total Price</span>
                <span className="bmp-stay-card__total-amount">
                  £{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status Management */}
            <div className="bmp-status-panel">
              <div className="bmp-panel-title">Update Status</div>
              <div className="bmp-status-current">
                <div className="bmp-status-current-label">Current</div>
                <StatusBadge status={booking?.status} />
                <span>{booking?.status}</span>
              </div>

              <div className="bmp-status-change-label">Change To</div>
              <div className="bmp-status-options">
                {STATUS_OPTIONS.filter((s) => s !== booking.status).map((s) => (
                  <label
                    key={s}
                    className={`bmp-status-option${
                      selectedStatus === s ? " bmp-status-option--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      checked={selectedStatus === s}
                      onChange={() => setSelectedStatus(s)}
                    />
                    <StatusBadge status={s} size="sm" />
                  </label>
                ))}
              </div>

              <button
                className={applyBtnClass()}
                onClick={handleStatusUpdate}
                disabled={saving || selectedStatus === booking.status}
              >
                {applyBtnLabel()}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bmp-actions-panel">
              <div className="bmp-panel-title">Quick Actions</div>
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className={`bmp-action-btn${
                    a.danger ? " bmp-action-btn--danger" : ""
                  }`}
                  onClick={() => handleQuickAction(a.label)}
                >
                  <span className="bmp-action-btn__icon">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}