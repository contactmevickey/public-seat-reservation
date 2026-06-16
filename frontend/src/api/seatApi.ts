import api from "./axios";

export const getSeats = async () => {
  const response = await api.get("/seats");
  return response.data;
};

export const reserveSeat = async (
  seatId: number
) => {
  const response = await api.post(
    "/reservations",
    {
      seatId,
    }
  );

  return response.data;
};
