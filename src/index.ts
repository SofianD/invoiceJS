const compile = require('zup');
const fetch = require('node-fetch');
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

export async function getTemplate(name: string): Promise<string> {
    try {
        const res = await (await fetch('https://raw.githubusercontent.com/SofianD/invoicejs-lib/master/lib/'+ name +'/'+ name +'.html')).text();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getForm(name: string): Promise<string> {
    try {
        const res = await (await fetch('https://raw.githubusercontent.com/SofianD/invoicejs-lib/master/lib/'+ name +'/form/'+ name +'.html')).text();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getListOfTemplates(libraries: []): Promise<[]> {
    try {
        const res = await (await fetch(libraries)).json();
        const lib = (res.tree.filter((g: any) => g.path === 'lib'))[0];
        const templates = (await (await fetch(lib.url)).json()).tree.map((x: any) => { return {name: x.path, url: x.url}});
        return templates;
    } catch (error) {
        throw new Error(error);
    }
}