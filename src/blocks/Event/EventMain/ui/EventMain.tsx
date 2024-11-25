import { Button } from "src/shared/ui/Button"
import s from "./EventMain.module.scss"
import { useNavigate } from "react-router-dom"
import { LikeIcon } from "src/shared/ui/Icons/LikeIcon"
import { useAddToWishlistMutation } from "src/shared/api/EventsAPI"
import { useEffect, useState } from "react"
import { LikeFilledIcon } from "src/shared/ui/Icons/LikeFilledIcon"
import { ChevronLeftIcon } from "src/shared/ui/Icons/ChevronLeftIcon"
import { ShareIcon } from "src/shared/ui/Icons/ShareIcon"
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Autoplay, Pagination } from "swiper/modules"
import { format, isValid, parse } from "date-fns"
import { classNames } from "src/shared/lib/classNames/classNames"
import { Typography } from "src/shared/ui/Typography"
import { CalendarIcon } from "src/shared/ui/Icons/CalendarIcon"
import { ru } from "date-fns/locale"
import { TimeIcon } from "src/shared/ui/Icons/TimeIcon"
import { LocationIcon } from "src/shared/ui/Icons/LocationIcon"
import { ChevronDownIcon } from "src/shared/ui/Icons/ChevronDownIcon"
import { CalendarButton } from "src/shared/ui/CalendarButton"
import { toast } from "react-toastify"
import { ShareModal } from "src/widgets/ShareModal"
import { IEvent } from "src/feautures/Event/models"
import { TicketsModal } from "src/widgets/TicketsModal"
import { ORDER_ROUTE } from "src/shared/utils/consts"

interface MainBlockProps {
    event: IEvent
}
  

export const EventMain = ({event}: MainBlockProps) => {

    const [addToWishlist] = useAddToWishlistMutation();

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false)
    const [imageClass, setImageClass] = useState<string>("square")
    const [showFullDescription, setShowFullDescription] = useState(false)

    const [showShareModal, setShowShareModal] = useState(false)
    const [showTicketModal, setShowTicketModal] = useState(false)

    const isMobile = window.innerWidth <= 744

    const navigate = useNavigate()

    useEffect(() => {
        setIsWishlisted(!!event?.isWishlisted)
    }, [event?.isWishlisted])

    useEffect(() => {
        if (event?.photos && event.photos.length > 0) {
            const img = new Image();
            img.src = event.photos[0];
            img.onload = () => {
                if (img.width > img.height) {
                    setImageClass("horizontal");
                } else if (img.width < img.height) {
                    setImageClass("vertical");
                } else {
                    setImageClass("square");
                }
            };
        }
    }, [event?.photos]);

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

    const parsedDate = parse(event.due_datetime, 'yyyy-MM-dd HH:mm:ss.SSSSSS', new Date());

    const tickets = event?.tickets ? JSON.parse(event.tickets) : []
    const min_price = tickets.length ? tickets.reduce((min: any, ticket: any) => {
        return parseFloat(ticket.price.regular) < parseFloat(min.price.regular) ? ticket : min;
    }, tickets[0]).price.regular : null
    

    return(
        <div className={s.block_wrapper}>
            {showShareModal && <ShareModal show={showShareModal} onClose={() => {setShowShareModal(false)}} url={window.location.href} />}
            {showTicketModal && <TicketsModal show={showTicketModal} onClose={() => {setShowTicketModal(false)}} event={event} />}
            <div className={s.block}>
                {
                    (imageClass !== 'vertical' || isMobile) &&
                    <div className={s.block_heading}>
                        <Button color="tetrinary" iconOnly onClick={() => {navigate(-1); navigate("/")}} className={s.rounded_button}>
                            <ChevronLeftIcon className={s.icon_secondary} size={1.6} />
                        </Button>
                        <div className={s.group}>
                            <Button color="tetrinary" iconOnly className={s.rounded_button} onClick={() =>  setShowShareModal(true)}>
                                <ShareIcon className={s.icon_secondary} size={2.4} />
                            </Button>
                            <Button color="tetrinary" iconOnly className={s.rounded_button} onClick={() => addToWishlistHandler()}>
                                {
                                    !isWishlisted ?
                                        <LikeIcon className={s.icon_secondary} size={2.4} />
                                    :
                                        <LikeFilledIcon size={2.4} />
                                }
                            </Button>
                        </div>
                    </div>
                }
                <div className={s.block_content}>
                    {
                        (event?.photos && event?.photos.length > 0) ?
                            <div className={classNames(s.images_wrapper, {}, [s[imageClass]])}>
                                <Swiper
                                    className={s.swiper}
                                    modules={[Pagination, A11y, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                                    speed={1000}
                                >
                                    {
                                        event.photos.map((link: string, index) => {
                                            return (
                                                <SwiperSlide key={link + index} className={s.image}>
                                                    <ProgressiveImage
                                                        src={link}
                                                        alt="Фото мероприятия"
                                                    />
                                                </SwiperSlide>
                                            );
                                        })
                                    }
                                </Swiper>
                                <Swiper
                                    className={s.swiper_bg}
                                    modules={[Pagination, A11y, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                                    speed={1000}
                                >
                                    {
                                        event.photos.map((link: string, index) => {
                                            return (
                                                <SwiperSlide key={link + index} className={s.image}>
                                                    <ProgressiveImage
                                                        src={link}
                                                        alt="Фото мероприятия"
                                                    />
                                                </SwiperSlide>
                                            );
                                        })
                                    }
                                </Swiper>
                            </div>
                        :
                            <div className={classNames(s.images_wrapper, {}, [s[imageClass]])}>
                                <ProgressiveImage
                                    src={event?.icon}
                                    placeholderSrc={event?.preview}
                                    alt="Фото мероприятия"
                                />
                            </div>
                    }

                    <div className={s.block_info}>
                        <div className={s.event_top_info}>
                            {
                                (imageClass === 'vertical' && !isMobile) &&
                                <div className={s.block_heading}>
                                    <Button color="tetrinary" iconOnly onClick={() => {navigate(-1); navigate("/")}} className={s.rounded_button}>
                                        <ChevronLeftIcon className={s.icon_secondary} size={1.6} />
                                    </Button>
                                    <div className={s.group}>
                                        <Button color="tetrinary" iconOnly className={s.rounded_button} onClick={() => setShowShareModal(true)}>
                                            <ShareIcon className={s.icon_secondary} size={2.4} />
                                        </Button>
                                        <Button color="tetrinary" iconOnly className={s.rounded_button} onClick={() => addToWishlistHandler()}>
                                            {
                                                !isWishlisted ?
                                                    <LikeIcon className={s.icon_secondary} size={2.4} />
                                                :
                                                    <LikeFilledIcon size={2.4} />
                                            }
                                        </Button>
                                    </div>
                                </div>
                            }
                            <div className={s.event_row_info}>
                                <Typography variant="p4" className={s.category}>{event.categoryInfo?.name}</Typography>
                                <Typography variant="p4" color="invert" className={s.age}>{event.age_restriction}+</Typography>
                            </div>
                            <Typography variant="h2" className={s.name}>{event.name}</Typography>
                            <div className={s.event_additional_info}>
                                <div className={s.event_row_info}>
                                    <div className={s.icon_group}>
                                        <CalendarIcon size={2.4} className={s.icon_tetrinary} />
                                        <Typography color="tetrinary" variant="p3">
                                            {isValid(parsedDate) ? format(parsedDate, 'd MMMM', { locale: ru }) : 'Скоро'}
                                        </Typography>
                                    </div>
                                    <div className={s.icon_group}>
                                        <TimeIcon size={2.4} className={s.icon_tetrinary} />
                                        <Typography color="tetrinary" variant="p3">
                                            {isValid(parsedDate) ? format(parsedDate, 'HH:mm', { locale: ru }) : '--:--'}
                                        </Typography>
                                    </div>
                                </div>
                                {
                                    (event.place || event.address) &&
                                    <div className={s.icon_group}>
                                        <LocationIcon size={2.4} className={s.icon_tetrinary} />
                                        <Typography color="tetrinary" variant="p3">
                                            {event.place || event.address}
                                        </Typography>
                                    </div>
                                }
                            </div>
                            {   (Number(event?.ticketCount || 0) > 0 && !isMobile) && 
                                <div className={s.event_row_info}>
                                    {
                                        Number(event?.ticketCount || 0) > 0 &&
                                        <div className={s.sold_tickets}>
                                            <Typography variant="p3" className={s.count}>{Number(event?.ticketCount || 0)}</Typography>
                                            <Typography color="tetrinary" variant="p4">уже идут</Typography>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className={s.buttons}>
                            {
                                min_price ?
                                    <Button 
                                        className={s.buy_button}
                                        onClick={() => isMobile ? navigate(ORDER_ROUTE+"/"+event.id_str) : setShowTicketModal(true)}
                                    >Билеты от {min_price}₽</Button>
                                :
                                    <Button className={s.buy_button}>Билеты бесплатно</Button>
                            }
                            {
                                (isValid(parsedDate) && event.end_datetime) &&
                                <CalendarButton
                                    name={event.name}
                                    description={event.description || ""}
                                    startDate={format(parsedDate, 'yyyy-MM-dd', { locale: ru })}
                                    endDate={format(event.end_datetime, 'yyyy-MM-dd', { locale: ru })}
                                    startTime={format(parsedDate, 'HH:mm', { locale: ru })}
                                    endTime={format(event.end_datetime, 'HH:mm', { locale: ru })}
                                    location={event.address || ""}
                                    event_url={window.location.href}
                                    className={s.calendar_button}
                                />
                            }

                        </div>
                        {   (Number(event?.ticketCount || 0) > 0 && isMobile) && 
                                <div className={s.event_number_info}>
                                    {
                                        Number(event?.ticketCount || 0) > 0 &&
                                        <div className={s.sold_tickets}>
                                            <Typography variant="p3" className={s.count}>{Number(event?.ticketCount || 0)}</Typography>
                                            <Typography color="tetrinary" variant="p4">уже идут</Typography>
                                        </div>
                                    }
                                </div>
                            }
                        {
                            event.description &&
                            <div className={s.description_wrapper}>
                                <Typography variant="h3" color="primary">Описание</Typography>
                                <Typography variant="p4" className={classNames(s.description, {[s.expanded]: showFullDescription})} color="secondary">
                                    <span
                                        dangerouslySetInnerHTML={{
                                        __html: event.description.replace(/\\r\\n|\\n|\\r/g, '\n')
                                        }}
                                    />
                                </Typography>
                                <div className={s.icon_group} onClick={() => {setShowFullDescription(!showFullDescription)}}>
                                    <Typography variant="p4" className={s.more}>Подробнее</Typography>
                                    <div className={classNames(s.icon,{[s.expanded]: showFullDescription})} >
                                        <ChevronDownIcon fill="--icon-green" size={1.4} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}