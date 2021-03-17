export interface InvoiceForm {
    lastname: string;
    firstname: string;
    adress: string;
    params: FormParams[]
}

export interface FormParams {
    name: string;
    value?: string;
}