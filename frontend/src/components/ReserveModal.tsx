import "../styles/ReserveModal.css";

interface Props {
  seatNumber: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReserveModal({
  seatNumber,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-content"
        onClick={(e) => e.stopPropagation()}>

        <h2 className="modal-title">
          Reserve Seat {seatNumber}
        </h2>

        <p className="modal-message">
          Do you want to reserve this seat?
        </p>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}