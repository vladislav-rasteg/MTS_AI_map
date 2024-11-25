import { ITicket } from "src/feautures/Ticket/models";
import { Typography } from "src/shared/ui/Typography";
import s from "./Ticket.module.scss";

interface TicketProps {
  ticket: ITicket;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disableIncrement: boolean;
  isDisabled: boolean;
}

export const Ticket = ({
  ticket,
  count,
  onIncrement,
  onDecrement,
  disableIncrement,
  isDisabled,
}: TicketProps) => {
  return (
    <div className={`${s.ticket} ${isDisabled ? s.disabled : ''}`}>
      <div className={s.ticketContent}>
        <Typography theme="light" variant="p3" className={s.name} color="invert">
          {ticket.name}
        </Typography>
        <Typography theme="light" variant="p2" className={s.price} color="invert">
          {ticket.price.regular} ₽
        </Typography>
        <Typography theme="light" variant="p4" color="invert" className={s.description}>
          {ticket.description}
        </Typography>
      </div>
      <div className={s.rounded_dashed_border}></div>
      <div className={s.ticketControls}>
        <button
          className={`${s.button} ${disableIncrement ? s.disabled : ''}`}
          onClick={onIncrement}
          disabled={disableIncrement}
        >
          +
        </button>
        <Typography theme="light" variant="h2" color="invert">
          {count}
        </Typography>
        <button
          className={`${s.button} ${count <= 0 ? s.disabled : ''}`}
          onClick={onDecrement}
          disabled={count <= 0}
        >
          -
        </button>
      </div>
    </div>
  );
};
