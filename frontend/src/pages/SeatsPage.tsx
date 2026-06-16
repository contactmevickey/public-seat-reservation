import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import { reserveSeat } from "../api/seatApi";
import { payReservation } from "../api/paymentApi";

import SeatCard from "../components/SeatCard";
import ReserveModal from "../components/ReserveModal";
import Navbar from "../components/Navbar";

import { useSeats } from "../hooks/useSeats";
import type { Seat } from "../types/seat";
import { getCurrentUserId } from "../utils/jwt";

import { useNavigate } from "react-router-dom";

import "../styles/SeatsPage.css";

export default function SeatsPage() {
  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  const { data: seats = [] } =
    useSeats();

  const [selectedSeat, setSelectedSeat] =
    useState<Seat | null>(null);

  const currentUserId = getCurrentUserId();

  const reserveMutation =
    useMutation({
      mutationFn: reserveSeat,

      onSuccess: () => {
        toast.success(
          "Seat reserved. Complete payment within 5 minutes."
        );

        queryClient.invalidateQueries({
          queryKey: ["seats"],
        });

        setSelectedSeat(null);
      },

      onError: () => {
        toast.error(
          "Seat already reserved"
        );
      },
    });

  const paymentMutation =
    useMutation({
      mutationFn: payReservation,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["seats"],
        });

        navigate("/success");
      },
    });

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h2 className="seat-grid-title">
          Available Seats
        </h2>
      </div>

      <div className="seat-grid">
        {seats.map((seat: Seat) => (
          <SeatCard
            key={seat.id}
            seat={seat}
            currentUserId={currentUserId}
            onReserve={(seat) =>
              setSelectedSeat(seat)
            }
            onPay={(reservationId) =>
              paymentMutation.mutate(
                reservationId
              )
            }
          />
        ))}
      </div>

      {
        selectedSeat && (
          <ReserveModal
            seatNumber={selectedSeat.seatNumber}
            onClose={() => setSelectedSeat(null)}
            onConfirm={() =>
              reserveMutation.mutate(selectedSeat.id)
            }
          />
        )
      }
    </div>
  );
}
