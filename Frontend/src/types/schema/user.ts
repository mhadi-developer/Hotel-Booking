export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  avatar?: string | null;
  role: Role;
  createdAt?: Date;
  bookings?: Booking[];
}
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type Booking = {
  userId: string;
  roomId: string;
  guest: number;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
};