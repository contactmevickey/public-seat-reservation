import api from "./axios";

export const payReservation = async (
  reservationId: number
) => {
  const response = await api.post(
    "/payments",
    {
      reservationId,
    }
  );

  return response.data;
};
