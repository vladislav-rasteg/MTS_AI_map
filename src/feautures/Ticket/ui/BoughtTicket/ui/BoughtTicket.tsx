import { ITicketModel } from "src/feautures/Ticket/models"
import s from "./BoughtTicket.module.scss"
import { Typography } from "src/shared/ui/Typography"
import { CalendarIcon } from "src/shared/ui/Icons/CalendarIcon"
import { LocationIcon } from "src/shared/ui/Icons/LocationIcon"
import { format, parse } from "date-fns"
import { isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { TimeIcon } from "src/shared/ui/Icons/TimeIcon"
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage"
import { DownloadIcon } from "src/shared/ui/Icons/DownloadIcon"
import { WaitIcon } from "src/shared/ui/Icons/WaitIcon"
import { useGetTicketMutation } from "src/shared/api/ProfileAPI"
import { toast } from "react-toastify"

interface BoughtTicketProps{
    ticket: ITicketModel
}

export const BoughtTicket = ({ticket}: BoughtTicketProps) => {
    const parsedDate = parse(ticket?.eventInfo?.due_datetime || "", 'yyyy-MM-dd HH:mm:ss.SSSSSS', new Date());

    const [getTicket, {isLoading}] = useGetTicketMutation()

    const downloadTicketHandler = async () => {
        if((ticket.status != "used" && ticket.status != "confirmed") || isLoading) return null

        try {
            const blob = await getTicket({id: ticket.id}).unwrap();
            if (blob) {
                // Создаем URL для Blob
                const url = URL.createObjectURL(blob);
                // Создаем временный элемент <a> для загрузки файла
                const link = document.createElement('a');
                link.href = url;
                link.download = 'ticket.pdf'; // Укажите имя файла
                document.body.appendChild(link);
                link.click();
                // Очищаем ресурсы
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            toast.error(String(error) || "Хмм... Что-то пошло не так")
        }
        
        // getTicket({id: ticket.id})
        // .then((res: any) => {
        //     if (Object.prototype.hasOwnProperty.call(res, "error")) {
        //         toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
        //     } else {
        //         const url = URL.createObjectURL(res.data);
        //         // Создаем временный элемент <a> для загрузки файла
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.download = 'ticket.pdf'; // Укажите имя файла
        //         document.body.appendChild(link);
        //         link.click();
        //         // Очищаем ресурсы
        //         document.body.removeChild(link);
        //         URL.revokeObjectURL(url);
        //     }
        // });
    }
    
    return(
        <div className={s.ticket} onClick={downloadTicketHandler}>
            <ProgressiveImage
                className={s.bg_image}
                src={ticket?.eventInfo?.icon || ""}
                placeholderSrc={ticket?.eventInfo?.preview}
                alt="Красивая картинка билета"
            />
            <div className={s.card_content}>
                {
                    isLoading ? 
                        <div className={s.status_icon}>
                            <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>
                        </div> 
                    : (ticket.status === "confirmed" || ticket.status === "used") ?
                        <div className={s.status_icon}>
                            <DownloadIcon fill="--icon-invert" size={2.4}/>
                        </div>
                    :
                        <div className={s.status_icon}>
                            <WaitIcon fill="--icon-invert" size={2.4}/>
                        </div>
                }
                <div className={s.top_row}>
                    <Typography color="invert" variant="p4" className={s.tag}>{ticket.owner_name}</Typography>
                    <Typography color="invert" variant="p4" className={s.tag}>{ticket.eventInfo?.age_restriction || 0}+</Typography>
                </div>
                <Typography variant="p2" color="invert" className={s.event_name}>{ticket.eventInfo?.short_name || ticket.eventInfo?.name}</Typography>
                <div className={s.info}>                    
                    {
                        (ticket?.eventInfo?.place || ticket?.eventInfo?.address) &&
                        <div className={s.group}>
                            <LocationIcon size={2} fill="--icon-invert"/>
                            <Typography theme="light" className={s.place} color="invert" variant="p4">
                                {ticket.eventInfo.place || ticket.eventInfo.address}
                            </Typography>
                        </div>
                    }
                    <div className={s.info_row}>
                        <div className={s.group}>
                            <CalendarIcon size={2} fill="--icon-invert"/>
                            <Typography theme="light" color="invert" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, 'MM.dd', { locale: ru }) : 'Скоро'}
                            </Typography>
                        </div>
                        <div className={s.group}>
                            <TimeIcon size={2} fill="--icon-invert" />
                            <Typography theme="light" color="invert" variant="p4">
                                {isValid(parsedDate) ? format(parsedDate, 'HH:mm', { locale: ru }) : '--:--'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}