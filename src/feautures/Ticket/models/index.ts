import { IEvent } from "src/feautures/Event/models";

export interface ITicket {
    creator_id: string; // ID создателя события
    description: string; // Описание мероприятия
    design_link: string; // Ссылка на дизайн билета
    limit: string; // Лимит мест (предположительно, строка)
    name: string; // Название мероприятия
    deleted?: boolean

    percent: {
        promo: string; // Промо-процент или сумма
        type: string; // Тип (например, "fixed")
    };

    price: {
        promo: string; // Промо-цена
        regular: string | number; // Обычная цена
    };

    service: string; // Сервис, например, "in_price"
    type: number; // Тип мероприятия или другая числовая информация
    custom_fields?: any;
    invisible?: boolean;
}

export interface ITicketModel{
    eventInfo?: IEvent;
    id: number;
    user_id: number
    event_id: number
    owner_name: string
    sum: number
    status: string
    type: number
}