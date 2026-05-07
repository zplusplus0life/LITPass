type plan = {
    id :  number;
    nama : string;
    slug : string;
    harga : number;
    deskripsi : string;
}

type subscription = {
    id : number;
    plan : plan;
}

type Users = {
    id : number;
    nama : string;
    email : string;
    role : string;
    created_at: string;
    active_subscription: subscription;
}


export type propsManageUsers = Users[];