import type { Seat } from "../types/seat";

import "../styles/SeatCard.css";

type Props = {
  seat: Seat;
  currentUserId: number | null;
  onReserve: (seat: Seat) => void;
  onPay: (reservationId: number) => void;
};

export default function SeatCard({
  seat,
  currentUserId,
  onReserve,
  onPay,
}: Props) {
  const isHeldByMe =
    seat.status === "HELD" &&
    seat.heldBy === currentUserId;

  const reservationId = seat.reservationId;

  const getClass = () => {
    switch (seat.status) {
      case "AVAILABLE":
        return "seat-card available";

      case "HELD":
        return isHeldByMe
          ? "seat-card held held-me"
          : "seat-card held";

      case "RESERVED":
        return "seat-card reserved";

      default:
        return "";
    }
  };

  return (
    <div className={getClass()}>
      <h2 className="seat-number">
        {seat.seatNumber}
      </h2>

      <p className="status">
        {seat.status}
      </p>

      {seat.status === "AVAILABLE" && (
        <button
          className="reserve-btn"
          onClick={() => onReserve(seat)}
        >
          Reserve
        </button>
      )}

      {isHeldByMe && reservationId && (
        <button
          className="pay-btn"
          onClick={() =>
            onPay(reservationId)
          }
        >
          Pay Now
        </button>
      )}

      {!isHeldByMe &&
        seat.status === "HELD" && (
          <div>Blocked</div>
        )}

      {seat.status === "RESERVED" && (
        <div>Booked</div>
      )}
    </div>
  );
}
