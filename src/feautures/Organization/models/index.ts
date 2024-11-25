export interface IOrganization {
    id: number; // serial4
    name: string; // text
    creator_id: number; // int4
    description: string; // text
    icon_link: string; // text
    contracts: Record<string, any>; // jsonb
    datetime_created: string; // timestamp (можно использовать Date, если данные будут форматироваться)
    organizers: number; // _int4 (массив чисел, если это массив)
    payments_type: string; // text
    organizers_rights: Record<string, any>; // jsonb
    status: string; // text
    tariff: number; // int4
    contract_link: string; // text
    interaction_form: string; // text
    tariff_percent: number; // float4
}
