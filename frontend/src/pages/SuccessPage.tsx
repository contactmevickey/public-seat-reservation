import "../styles/SuccessPage.css";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <h1 className="success-title">
          ✅  Reservation Confirmed
        </h1>

        <p className="success-message">
          Your seat has been booked successfully.
        </p>

        <div className="success-details">
          <p>
            Booking Status:
            <strong> Confirmed</strong>
          </p>

          <p>
            Payment Status:
            <strong> Paid</strong>
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/seats")}
        >
          Back To Seats
        </button>

      </div>
    </div>
  );
}
