type invoices = {
    id : number;
    invoice_number : string;
    amount : number;
    issued_at : string;
    pdf_path : string;
}


export type propsInvoices = invoices[];