import { Typography } from "src/shared/ui/Typography"
import s from "./ProfileTicketsHistory.module.scss"
import { useGetProfileTicketsQuery } from "src/shared/api/ProfileAPI";
import { BoughtTicket } from "src/feautures/Ticket/ui/BoughtTicket";

export const ProfileTicketsHistory = () => {
    const {data} = useGetProfileTicketsQuery()

    return(
        <div className={s.block}>
            <Typography variant="p1" color="secondary">История билетов</Typography>
            <div className={s.tickets_grid}>
                {
                    data && data.map((ticket) => {
                        return(
                            <BoughtTicket ticket={ticket} key={ticket.id}/>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}