import { ITicket } from 'src/feautures/Ticket/models';
import { ProgressiveImage } from 'src/shared/ui/ProgressiveImage';
import s from './TicketFields.module.scss';
import { Typography } from 'src/shared/ui/Typography';
import { TextInput } from 'src/shared/ui/TextInput';

interface TicketProps {
  ticket: ITicket;
  icon: string;
  value: string;
  preview?: string | undefined;
  index: number;
  onChange: (index: number, ownerName: string) => void;
}

export const TicketFields = ({
  ticket,
  icon,
  preview,
  index,
  onChange,
  value
}: TicketProps) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(index, value);
  };

  return (
    <div className={s.ticket}>
      <ProgressiveImage
        className={s.bg_image}
        src={icon}
        placeholderSrc={preview}
        alt="Красивая картинка билета"
      />
      <div className={s.ticket_content}>
        <div className={s.ticket_header}>
          <Typography color="invert" theme="light" variant="p2" className={s.ticket_info}>
            Билет №{index + 1}
          </Typography>
          <Typography color="invert" theme="light" variant="p3" className={s.ticket_name}>
            {ticket.name}
          </Typography>
        </div>
        <TextInput
          fullWidth
          className={s.ticket_input}
          placeholder="Имя Фамилия"
          on_color
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
