import type { Seat } from "../types/seat";

import "../styles/SeatCard.css";

type Props = {
  seat: Seat;
  currentUserId: number;
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

  const getClass = () => {
    switch (seat.status) {
      case "AVAILABLE":
        return "seat available";

      case "HELD":
        return isHeldByMe
          ? "seat held-me"
          : "seat held";

      case "RESERVED":
        return "seat reserved";

      default:
        return "";
    }
  };

  return (
    <div className={`seat-card ${seat.status.toLowerCase()}`}>
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

      {isHeldByMe && (
        <button
          className="pay-btn"
          onClick={() =>
            onPay(seat.reservationId!)
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
