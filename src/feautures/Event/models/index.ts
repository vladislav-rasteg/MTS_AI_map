import { IOrganization } from "src/feautures/Organization/models";

export interface IEvent{
    id: number;
    name: string;
    description?: string;
    place?: string;
    due_datetime: string;
    city?: string;
    target: number;
    address?: string;
    tickets?: string;
    organization_id: number;
    age_restriction: number;
    photos: string[];
    category?: string;
    socmedia?: any;
    creator_id: number;
    status?: string;
    subcategory?: number;
    style?: string;
    tariff?: number;
    show_public_intent?: number;
    timer_description?: string;
    timer_on?: boolean;
    timer_datetime?: Date;
    id_str: string;
    end_datetime?: Date;
    tempevent_id?: number;
    short_name?: string;
    icon: string;
    preview: string;
    tariff_percent?: number;
    latlng: {
        x: number
        y: number
    };
    categoryInfo?: {name: string}
    exchange_enabled?: boolean;
    isWishlisted?: boolean;
    ticketCount?: string;
    theme: string;
    organization: IOrganization
}