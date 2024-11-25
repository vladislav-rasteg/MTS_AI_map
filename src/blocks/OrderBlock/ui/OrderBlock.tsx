import s from "./OrderBlock.module.scss"
import { IEvent } from "src/feautures/Event/models"
import { useEffect, useState } from "react"
import { ITicket } from "src/feautures/Ticket/models"
import { useCreateOrderMutation, useCreatePaymentMutation, useGetOrderQuery } from "src/shared/api/OrderAPI"
import { toast } from "react-toastify"
import { TicketsModalStep1 } from "src/widgets/TicketsModal/ui/ModalSteps/TicketsModalStep1"
import { TicketsModalStep2 } from "src/widgets/TicketsModal/ui/ModalSteps/TicketsModalStep2"
import { TicketsModalStep3 } from "src/widgets/TicketsModal/ui/ModalSteps/TicketsModalStep3"
import { Typography } from "src/shared/ui/Typography"
import { Button } from "src/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import { EVENT_ROUTE } from "src/shared/utils/consts"
import { ChevronLeftIcon } from "src/shared/ui/Icons/ChevronLeftIcon"
import { Loader } from "src/shared/ui/Loader"
import { useAppDispatch, useAppSelector } from "src/app/hooks/redux"
import { profileSlice } from "src/shared/store/reducers/ProfileSlice"

interface OrderBlockProps{
    event: IEvent
    initialStep: number
}

export const OrderBlock = ({event, initialStep = 2}: OrderBlockProps) => {

    const session = localStorage.getItem("session") || '';
    const {data, refetch, isLoading} = useGetOrderQuery({event_id: event.id, session})

    const [createOrder] = useCreateOrderMutation();
    const [createPayment, {isLoading: isPaymentLoading}] = useCreatePaymentMutation();

    const [selectedTickets, setSelectedTickets] = useState<ITicket[]>();
    const [activePromocode, setActivePromocode] = useState<{name: string, type: string, value: number | null, tickets: number[], limit: number | null}>()

    const [orderId, setOrderId] = useState<number | undefined>()
    const [sum, setSum] = useState<number>(0)
    const [comission, setComission] = useState<number>(0)

    const { currentProfile } = useAppSelector(state => state.ProfileReducer);
    const { clearCurrentProfile } = profileSlice.actions;
    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const restoredTickets = data?.tickets

    const [step, setStep] = useState(initialStep)

    useEffect(() => {
        refetch()
        // Если есть существующий заказ, то в зависимости от его заполнения перекидываем на соответствующий шаг 
        if(data?.tickets?.length && data.tickets[0].owner_name){
        setStep(4)
        } else if(data?.tickets?.length && data.tickets[0].id){
        setStep(3)
        }

        const _selectedTickets: ITicket[] = []
        const event_tickets: ITicket[] = event?.tickets ? JSON.parse(event.tickets) : [];
        // Воссоздаем билеты из существующего заказа
        if(data?.tickets?.length){
        data.tickets.map((_ticket) => {
            const ticket = event_tickets.filter((ticket) => ticket.type === _ticket.type)
            _selectedTickets.push(ticket[0])
        })
        }
        setSelectedTickets(_selectedTickets)
        setOrderId(data?.order_id)
        setSum(data?.sum || 0)
        setComission(data?.comission || 0)
        setActivePromocode(data?.coupon)
    }, [data])

    const goBackHandler = () => {
        setStep(step-1)
    }

    const firstStepHandler = (selectedTickets: ITicket[]) => {
        setSelectedTickets(selectedTickets)
        setStep(3)
    }

    const secondStepHandler = (result: {type: number; sum: number; owner_name: string }[]) => {
        if(result.length){
        const session = localStorage.getItem("session");
        createOrder({session: session || "-", event_id: event.id, tickets: result, order_id: orderId, promocode: activePromocode?.name || ""})
        .then((res: any) => {
            if (Object.prototype.hasOwnProperty.call(res, "error")) {
                toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
            } else {
            setOrderId(res.data.order_id)
            setSum(res.data.total_sum)
            setComission(res.data.comission)
            localStorage.setItem("active_order", res.data.order_id)
            setStep(4)
            }
        });
        }
    }

    const thirdStepHandler = (full_name: string, email: string, phone: string) => {
        createPayment({order_id: orderId || 0, sum: sum, full_name, email, phone, session})
        .then((res: any) => {
          if (Object.prototype.hasOwnProperty.call(res, "error")) {
              toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
          } else {
            if(email != currentProfile.email){
                localStorage.removeItem("access_token")
                localStorage.removeItem("session")
                dispatch(clearCurrentProfile())
            }
            window.location.replace(res.data)
          }
        });
    }

    const modalSteps = [
        {name: "Дата и время", Component: <TicketsModalStep1 event={event} finish={firstStepHandler} />},
        {name: "Категории билетов", Component: <TicketsModalStep1 event={event} propsPromocode={activePromocode} propsSelectedTickets={selectedTickets} finish={firstStepHandler} />},
        {name: "Оформление билетов", Component: <TicketsModalStep2 event={event} activePromocode={activePromocode} tickets={selectedTickets} restoredTickets={restoredTickets} finish={secondStepHandler} />},
        {name: "Оформление заказа", Component: <TicketsModalStep3  isLoading={isPaymentLoading} event={event} order_id={orderId} sum={sum} comission={comission} finish={thirdStepHandler} />},
    ]

    return(
        <div className={s.block}>
            <div className={s.modal_header}>
                <Button iconOnly color="ghost" className={s.header_button} onClick={() => step <= 2 ? navigate(EVENT_ROUTE+"/"+event.id_str) : goBackHandler()} ><ChevronLeftIcon fill="#FFFFFF" size={1.6} /></Button>
                <Typography variant="h2" className={s.modal_name}>{modalSteps[step-1].name}</Typography>
                <div className={s.placeholder}></div>
            </div>
            {
              !isLoading ?
                modalSteps[step-1].Component
              :
                <Loader />
            }
        </div>
    )
}