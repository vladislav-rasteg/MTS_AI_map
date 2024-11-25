export interface IUser {
    id: number;
    full_name?: string;
    datetime_created?: string;
    email?: string;
    phone?: string;
    link_hash: string;
    link_used: boolean;
    balance: number;
    birth_date?: string;
    sex?: string;
    vk_id?: number;
    image?: string;
    photo?: string;
    fb_id?: number;
    city_id?: number;
}
