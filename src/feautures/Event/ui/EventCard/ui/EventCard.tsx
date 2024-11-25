import { IEvent } from "src/feautures/Event/models"
import s from "./EventCard.module.scss"
import { Typography } from "src/shared/ui/Typography"
import { format, isValid, parse } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "src/shared/ui/Icons/CalendarIcon"
import { TimeIcon } from "src/shared/ui/Icons/TimeIcon"
import { LocationIcon } from "src/shared/ui/Icons/LocationIcon"
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage"
import { numberWithSpaces } from "src/shared/utils/numberWithSpaces"
import { classNames } from "src/shared/lib/classNames/classNames"
import { Skeleton } from "src/shared/ui/Skeleton"
import { LikeIcon } from "src/shared/ui/Icons/LikeIcon"
import { LikeFilledIcon } from "src/shared/ui/Icons/LikeFilledIcon"
import { useAddToWishlistMutation } from "src/shared/api/EventsAPI"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EVENT_ROUTE } from "src/shared/utils/consts"


interface IEventCardProps{
    size?: "small" | "medium"
    event?: IEvent
}

export const EventCard = ({ size = 'small', event }: IEventCardProps) => {

    const [addToWishlist, {isLoading}] = useAddToWishlistMutation();

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false)

    useEffect(() => {
        setIsWishlisted(!!event?.isWishlisted)
    }, [event?.isWishlisted])

    if(!event){
        return(
            <div className={classNames(s.card, {}, [s[size]])}>
                <Skeleton className={s.card_image} type="block" />
                <div className={s.info}>
                    <Skeleton type="line" className={s.line}/>
                    <Skeleton type="line" className={s.line}/>
                </div>
                <Skeleton type="line" className={s.price_line}/>
            </div>
        )
    }

    const isMobile = window.innerWidth <= 744
    // Парсим дату
    const parsedDate = parse(event.due_datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS', new Date());

    const tickets = event?.tickets ? JSON.parse(event.tickets) : []

    const min_price = tickets.length ? tickets.reduce((min: any, ticket: any) => {
        return parseFloat(ticket.price.regular) < parseFloat(min.price.regular) ? ticket : min;
    }, tickets[0]).price.regular : null

    const addToWishlistHandler = () => {
        const session = localStorage.getItem("session") || "-"
        setIsWishlisted(!isWishlisted)
        addToWishlist({session, event: event.id})
        .then((res: any) => {
            if (Object.prototype.hasOwnProperty.call(res, "error")) {
                toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
            }
        });
    }

    return (
        <Link to={EVENT_ROUTE + '/' + event.id_str} className={classNames(s.card, {}, [s[size]])}>
            <div className={s.card_image}>
                <button 
                    className={classNames(s.wishlist, {[s.active]: isWishlisted})}
                    onClick={(e) => {e.preventDefault(); e.stopPropagation(); addToWishlistHandler()}}
                    disabled={isLoading}
                >
                    {
                        isWishlisted ?
                            <LikeFilledIcon size={2} />
                        : 
                            <LikeIcon size={2} fill="--icon-invert"/>
                    }
                </button>
                {
                    event?.age_restriction &&
                    <Typography color="invert" className={s.age_tag} variant="p4">{event.age_restriction}+</Typography>
                }
                <ProgressiveImage
                    src={event.icon} // Высококачественное изображение
                    placeholderSrc={event.preview}
                    alt="Фото мероприятия"
                />
            </div>
            <div className={s.info_wrapper}>
                <div className={s.info}>
                    <Typography variant="p3" className={s.name}>{event.name}</Typography>
                    <div className={s.info_row}>
                        <div className={s.group}>
                            <CalendarIcon size={2} />
                            <Typography color="tetrinary" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, isMobile ? 'MM.dd' : 'd MMMM', { locale: ru }) : 'Скоро'}
                            </Typography>
                        </div>
                        <div className={s.group}>
                            <TimeIcon size={2} />
                            <Typography color="tetrinary" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, 'HH:mm', { locale: ru }) : '--:--'}
                            </Typography>
                        </div>
                    </div>
                    {
                        (event.place || event.address) &&
                        <div className={s.group}>
                            <LocationIcon size={2} />
                            <Typography className={s.place} color="tetrinary" variant="p4">
                                {event.place || event.address}
                            </Typography>
                        </div>
                    }

                </div>
                {min_price &&
                    <div className={s.price_wrapper}>
                        <div className={s.main_price}>
                            <Typography variant="p4" className={s.price}>
                                от {numberWithSpaces(min_price)} ₽
                            </Typography>
                        </div>
                    </div>
                }
            </div>
        </Link>
    );
};