import { useState, type DragEvent, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../utils/css/addRoomPage.css"
import axiosInstance from "../resources/axiosInstance";
import { Bounce, toast, ToastContainer } from "react-toastify";

/* ─────────────────────────────────────────
   Zod Schema  (mirrors Prisma Room model)
───────────────────────────────────────── */
const roomSchema = z.object({
  name: z
    .string()
    .min(2, "Room name must be at least 2 characters.")
    .max(100, "Room name cannot exceed 100 characters."),

  type: z.enum(
    ["single", "double", "suite", "penthouse", "deluxe", "family"],
    {
      required_error: "Please select a room type.",
      invalid_type_error: "Please select a valid room type.",
    }
  ),

  price: z
    .number( "Price must be a number." )
    .int("Price must be a whole number.")
    .min(1, "Price must be at least $1.")
    .max(99999, "Price cannot exceed $99,999."),

  isBooked: z.boolean().default(false),
});

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type RoomFormData = z.infer<typeof roomSchema>;

type ImageItem = {
  file: File;
  previewUrl: string;
  id: string;
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function AddRoom() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      type: undefined,
      price: undefined,
      isBooked: false,
    },
  });

  /* ── Image helpers ─────────────────── */
  const addFiles = (files: FileList | null): void => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      setImages((prev) => [
        ...prev,
        {
          file,
          previewUrl: URL.createObjectURL(file),
          id: `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`,
        },
      ]);
    });
  };

  const removeImage = (id: string): void => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);

      if (img) {
        URL.revokeObjectURL(img.previewUrl);
      }

      return prev.filter((i) => i.id !== id);
    });
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  /* ── Submit ────────────────────────── */
  const onSubmit = async (data: RoomFormData): Promise<void> => {
    /* Build final payload matching the Prisma schema */
   const formData = new FormData();

  formData.append("name", data.name);
  formData.append("type", data.type);

  formData.append("price", String(data.price));

  formData.append(
    "isBooked",
    String(data.isBooked)
  );

  images.forEach((img) => {
    formData.append("images", img.file);
  });

    /* Simulate API call */
    try {
      const response = await axiosInstance.post(`http://localhost:7004/api/admin/add/room`, formData,
      {
        headers: {
           "Content-Type":"multipart/form-data"
         }
       }
     )
    if (response.statusText==="OK") {
      toast.success("room added successfully");
       reset();
    setImages([]);
     }
      
    } catch (error) {
      toast.error("unable to add room");
      console.log(error);
      
    }
    

    
  };

  const handleCancel = (): void => {
    reset();
    setImages([]);
  };

  /* ── Render ────────────────────────── */
  return (
    <div className="ar-root">
      {/* Ambient background orbs */}
      <div
        className="ar-orb ar-orb--1"
        aria-hidden="true"
      />
      <div
        className="ar-orb ar-orb--2"
        aria-hidden="true"
      />

      <div className="ar-container">
        {/* ── Header ── */}
        <header className="ar-header">
          <span className="ar-breadcrumb">
            Dashboard / Rooms / New
          </span>

          <h1 className="ar-heading">
            Add New Room
          </h1>

          <p className="ar-subheading">
            Complete the form below to register a
            new room in your property.
          </p>

          <div
            className="ar-divider"
            aria-hidden="true"
          />
        </header>

        {/* ── Success Toast ── */}
        {submitted && (
          <div
            className="ar-toast"
            role="status"
          >
            <span className="ar-toast__dot" />
            Room added successfully!
          </div>
        )}

        <form
          className="ar-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* ════════════════════════════════
              Section 1 — Room Details
          ════════════════════════════════ */}
          <section className="ar-section">
            <h2 className="ar-section__title">
              <span className="ar-section__num">
                01
              </span>
              Room Details
            </h2>

            {/* Name */}
            <div
              className={`ar-field ${
                errors.name
                  ? "ar-field--error"
                  : ""
              }`}
            >
              <label
                className="ar-label"
                htmlFor="name"
              >
                Room Name
              </label>

              <input
                id="name"
                type="text"
                className="ar-input"
                placeholder="e.g. Ocean Suite, Executive Penthouse"
                autoComplete="off"
                {...register("name")}
              />

              {errors.name && (
                <p className="ar-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Type + Price */}
            <div className="ar-row">
              <div
                className={`ar-field ${
                  errors.type
                    ? "ar-field--error"
                    : ""
                }`}
              >
                <label
                  className="ar-label"
                  htmlFor="type"
                >
                  Room Type
                </label>

                <div className="ar-select-wrap">
                  <select
                    id="type"
                    className="ar-select"
                    {...register("type")}
                  >
                    <option value="">
                      Select type…
                    </option>

                    <option value="single">
                      Single
                    </option>

                    <option value="double">
                      Double
                    </option>

                    <option value="suite">
                      Suite
                    </option>

                    <option value="penthouse">
                      Penthouse
                    </option>

                    <option value="deluxe">
                      Deluxe
                    </option>

                    <option value="family">
                      Family
                    </option>
                  </select>

                  <span
                    className="ar-select-arrow"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </div>

                {errors.type && (
                  <p className="ar-error">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div
                className={`ar-field ${
                  errors.price
                    ? "ar-field--error"
                    : ""
                }`}
              >
                <label
                  className="ar-label"
                  htmlFor="price"
                >
                  Price per Night
                </label>

                <div className="ar-price-wrap">
                  <span
                    className="ar-currency"
                    aria-hidden="true"
                  >
                    $
                  </span>

                  <input
                    id="price"
                    type="number"
                    min={1}
                    className="ar-input ar-input--price"
                    placeholder="0"
                    {...register("price", {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                {errors.price && (
                  <p className="ar-error">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              Section 2 — Availability
          ════════════════════════════════ */}
          <section className="ar-section">
            <h2 className="ar-section__title">
              <span className="ar-section__num">
                02
              </span>
              Availability
            </h2>

            <div className="ar-toggle-card">
              <div className="ar-toggle-info">
                <p className="ar-toggle-name">
                  Booking Status
                </p>

                <p className="ar-toggle-desc">
                  Enable if this room is already
                  occupied or reserved.
                </p>
              </div>

              <label
                className="ar-switch"
                htmlFor="isBooked"
              >
                <input
                  id="isBooked"
                  type="checkbox"
                  className="ar-switch__input"
                  {...register("isBooked")}
                />

                <span className="ar-switch__track">
                  <span className="ar-switch__thumb" />
                </span>

                <span className="ar-switch__label">
                  Booked
                </span>
              </label>
            </div>
          </section>

          {/* ════════════════════════════════
              Section 3 — Room Images
          ════════════════════════════════ */}
          <section className="ar-section">
            <h2 className="ar-section__title">
              <span className="ar-section__num">
                03
              </span>
              Room Images
            </h2>

            {/* Drop zone */}
            <label
              className={`ar-dropzone ${
                isDragging
                  ? "ar-dropzone--active"
                  : ""
              }`}
              htmlFor="imageInput"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() =>
                setIsDragging(false)
              }
              onDrop={onDrop}
            >
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                multiple
                className="ar-dropzone__input"
                onChange={(
                  e: ChangeEvent<HTMLInputElement>
                ) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              <div
                className="ar-dropzone__icon"
                aria-hidden="true"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                  />

                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                  />

                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>

              <p className="ar-dropzone__title">
                {isDragging
                  ? "Drop images here"
                  : "Click or drag to upload images"}
              </p>

              <p className="ar-dropzone__hint">
                JPG, PNG, WEBP — multiple files
                supported
              </p>
            </label>

            {/* Preview grid */}
            {images.length > 0 && (
              <div className="ar-preview">
                {images.map((img, i) => (
                  <div
                    className="ar-preview__thumb"
                    key={img.id}
                  >
                    <img
                      src={img.previewUrl}
                      alt={`Room image ${
                        i + 1
                      }`}
                      className="ar-preview__img"
                    />

                    <div className="ar-preview__overlay">
                      <button
                        type="button"
                        className="ar-preview__remove"
                        onClick={() =>
                          removeImage(img.id)
                        }
                        aria-label={`Remove image ${
                          i + 1
                        }`}
                      >
                        ✕
                      </button>
                    </div>

                    <span className="ar-preview__badge">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <p className="ar-image-count">
                {images.length} image
                {images.length !== 1
                  ? "s"
                  : ""}{" "}
                selected
              </p>
            )}
          </section>

          {/* ── Actions ── */}
          <div className="ar-actions">
            <button
              type="button"
              className="ar-btn ar-btn--ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="ar-btn ar-btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="ar-spinner"
                    aria-hidden="true"
                  />
                  Adding Room…
                </>
              ) : (
                "Add Room"
              )}
            </button>
          </div>
        </form>
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
  );
}