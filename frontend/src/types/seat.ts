export type SeatStatus =
  | "AVAILABLE"
  | "HELD"
  | "RESERVED";

export interface Seat {
  id: number;
  seatNumber: string;
  status: SeatStatus;

  heldBy?: number;
  reservationId?: number;
  expiresAt?: string;
};
