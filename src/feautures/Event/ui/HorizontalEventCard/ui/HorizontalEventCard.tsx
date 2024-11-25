import { IEvent } from "src/feautures/Event/models"
import s from "./HorizontalEventCard.module.scss"
import { Typography } from "src/shared/ui/Typography"
import { format, isValid, parse } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "src/shared/ui/Icons/CalendarIcon"
import { TimeIcon } from "src/shared/ui/Icons/TimeIcon"
import { LocationIcon } from "src/shared/ui/Icons/LocationIcon"
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage"
import { classNames } from "src/shared/lib/classNames/classNames"
import { Skeleton } from "src/shared/ui/Skeleton"


interface IEventCardProps{
    event?: IEvent
}

export const HorizontalEventCard = ({ event }: IEventCardProps) => {

    if(!event){
        return(
            <div className={classNames(s.card)}>
                <Skeleton className={s.card_image} type="block" />
                <div className={s.info_wrapper}>
                    <Skeleton type="line" className={s.line}/>
                    <Skeleton type="line" className={s.line}/>
                    <Skeleton type="line" className={s.line}/>
                </div>
                <Skeleton type="line" className={s.price_line}/>
            </div>
        )
    }
    // Парсим дату
    const parsedDate = parse(event.due_datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS', new Date());

    return (
        <div className={classNames(s.card)}>
            {
                event?.age_restriction &&
                <Typography theme="light" color="invert" className={s.age_tag} variant="p4">{event.age_restriction}+</Typography>
            }
            <div className={s.card_image}>
                <ProgressiveImage
                    src={event.icon} // Высококачественное изображение
                    placeholderSrc={event.preview}
                    alt="Фото мероприятия"
                />
            </div>
            <div className={s.info_wrapper}>
                <Typography theme="light" variant="p3" className={s.name}>{event.name}</Typography>
                <div className={s.info}>                    
                    {
                        (event.place || event.address) &&
                        <div className={s.group}>
                            <LocationIcon size={2} />
                            <Typography theme="light" className={s.place} color="secondary" variant="p4">
                                {event.place || event.address}
                            </Typography>
                        </div>
                    }
                    <div className={s.info_row}>
                        <div className={s.group}>
                            <CalendarIcon size={2} />
                            <Typography theme="light" color="secondary" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, 'MM.dd', { locale: ru }) : 'Скоро'}
                            </Typography>
                        </div>
                        <div className={s.group}>
                            <TimeIcon size={2} />
                            <Typography theme="light" color="secondary" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, 'HH:mm', { locale: ru }) : '--:--'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};