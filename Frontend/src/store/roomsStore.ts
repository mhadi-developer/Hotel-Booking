import type { room } from "../types/schema/room";
import { create } from "zustand";
import axiosInstance from "../resources/axios.Instance.create";

type RoomStore = {
  fetchedRooms: room[];
  loading: boolean;
  error: string | null;

  getFetchedRooms: () => Promise<void>;
};

export const useRoomStore = create<RoomStore>(
  (set) => ({
    fetchedRooms: [],

    loading: false,

    error: null,

    getFetchedRooms: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axiosInstance.get(
            `${import.meta.env.VITE_BACKEND_URL}/get/rooms`
          );

        set({
          fetchedRooms:
            response?.data?.fetchedRooms ??
            [],

          loading: false,

          error: null,
        });
      } catch (error) {
        console.log(error);

        set({
          fetchedRooms: [],

          loading: false,

          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch rooms",
        });
      }
    },
  })
);