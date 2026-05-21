import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OffCanvas from "../components/Home/OffCanvas";
import Header from "../components/Home/Header";
import Breadcrumb from "../components/Rooms/BreadCrumb";

// ======================
// ZOD SCHEMA
// ======================

const bookingSchema = z.object({
  roomName: z
    .string()
    .min(3, "Room name is required"),

  persons: z
    .number()
    .min(1, "At least 1 person required")
    .max(10, "Maximum 10 persons allowed"),

  checkIn: z
    .string()
    .min(1, "Check-in date is required"),

  checkOut: z
    .string()
    .min(1, "Check-out date is required"),
});

// ======================
// TYPES
// ======================

type BookingFormData = z.infer<typeof bookingSchema>;

// ======================
// COMPONENT
// ======================

export default function BookingPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      roomName: "",
      persons: 1,
      checkIn: "",
      checkOut: "",
    },
  });

  // ======================
  // SUBMIT FUNCTION
  // ======================

  const onSubmit = (data: BookingFormData) => {

    console.log("Booking Data:", data);

    /*
      axios.post("/api/booking", data)
    */
  };

    return (
      
        <>
            <OffCanvas />
            <Header />
            <Breadcrumb />
            
            <div>
                 <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              {/* HEADER */}
              <div className="text-center mb-5">

                <h1 className="fw-bold mb-2">
                  Hotel Booking
                </h1>

                <p className="text-muted">
                  Reserve your luxury room
                </p>

              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* ROOM NAME */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Room Name
                  </label>

                  <input
                    type="text"
                    placeholder="Deluxe King Room"
                    className={`form-control form-control-lg rounded-3 ${
                      errors.roomName ? "is-invalid" : ""
                    }`}
                    {...register("roomName")}
                  />

                  {errors.roomName && (
                    <div className="invalid-feedback">
                      {errors.roomName.message}
                    </div>
                  )}

                </div>

                {/* PERSONS */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Persons
                  </label>

                  <input
                    type="number"
                    className={`form-control form-control-lg rounded-3 ${
                      errors.persons ? "is-invalid" : ""
                    }`}
                    {...register("persons", {
                      valueAsNumber: true,
                    })}
                  />

                  {errors.persons && (
                    <div className="invalid-feedback">
                      {errors.persons.message}
                    </div>
                  )}

                </div>

                {/* CHECK IN */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Check In Date
                  </label>

                  <input
                    type="date"
                    className={`form-control form-control-lg rounded-3 ${
                      errors.checkIn ? "is-invalid" : ""
                    }`}
                    {...register("checkIn")}
                  />

                  {errors.checkIn && (
                    <div className="invalid-feedback">
                      {errors.checkIn.message}
                    </div>
                  )}

                </div>

                {/* CHECK OUT */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Check Out Date
                  </label>

                  <input
                    type="date"
                    className={`form-control form-control-lg rounded-3 ${
                      errors.checkOut ? "is-invalid" : ""
                    }`}
                    {...register("checkOut")}
                  />

                  {errors.checkOut && (
                    <div className="invalid-feedback">
                      {errors.checkOut.message}
                    </div>
                  )}

                </div>

                {/* INFO BOX */}
                <div className="bg-light rounded-4 p-4 mb-4">

                  <h5 className="fw-bold mb-3">
                    Booking Information
                  </h5>

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item bg-transparent px-0">
                      ✔ Secure reservation
                    </li>

                    <li className="list-group-item bg-transparent px-0">
                      ✔ Instant confirmation
                    </li>

                    <li className="list-group-item bg-transparent px-0">
                      ✔ Free cancellation available
                    </li>

                  </ul>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100 rounded-3"
                >
                  Book Now
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

</div>
</>
   
  );
}