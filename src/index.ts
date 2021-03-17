const compile = require('zup');
import * as dataToPDF from 'from-data-to-pdf';
import {
    InvoiceForm
} from './model/model';

export async function getInvoiceAsString(template: string, data: any[]): Promise<any[]> {
    try {
        const result = [];
        const t = compile(template);
        for(let i = 0, l = data.length; i < l; i++) {
                const res = t(data[i]);
                result.push(res);
        }
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAndSaveInvoice(template: string, data: InvoiceForm[]): Promise<dataToPDF.FileBuffer[]> {
    try {
        const result: dataToPDF.FileBuffer[] = [];
        const t = compile(template);
        for(let i = 0, l = data.length; i < l; i++) {
                const res = t(data[i]);
                result.push({
                    name: data[i].lastname + ' ' + data[i].firstname ?? 'default name',
                    text: res
                });
        }
        return await dataToPDF.getPdf(result, true);
    } catch (error) {
        throw new Error(error);
    }
}

