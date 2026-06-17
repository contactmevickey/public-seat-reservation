import { useQuery } from "@tanstack/react-query";
import { getSeats } from "../api/seatApi";

export const useSeats = () => {
  return useQuery({
    queryKey: ["seats"],
    queryFn: getSeats,

    refetchInterval: 60 * 1000,
  });
};
