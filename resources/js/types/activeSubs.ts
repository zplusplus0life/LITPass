type Plan = {
    nama : string;
    harga : number;
    deskripsi : string;
}

export type propsActiveSubs = {
    id : number;
    starts_at : string;
    ends_at : string;
    days_remaining: number;
    is_expired : boolean;
    status : string;
    plan : Plan;
}
