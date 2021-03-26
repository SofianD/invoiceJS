const compile = require('zup');
const fetch = require('node-fetch');
import * as dataToPDF from 'from-data-to-pdf';
import {TemplateInfo} from './model/model';

/**
 * @author DOUAL Sofian
 * @description Using zup package to compile html code.
 * @param { string } template 
 * @param { any[] } data 
 * @returns { string[] }
 */
export async function getInvoice(template: string, data: any[]): Promise<string[]> {
    try {
        const result: string[] = [];
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

/**
 * @author DOUAL Sofian
 * @description Using zup package to compile html code and save it.
 * @param { string } template 
 * @param { any[] } data
 * @param { dataToPDF.Path } [path]
 * @returns { dataToPDF.FileBuffer[] }
 */
export async function getAndSaveInvoice(template: string, data: any[], path?: dataToPDF.Path): Promise<dataToPDF.FileBuffer[]> {
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
        return await dataToPDF.getPdf(result, true, path?.toSaveFiles ?? undefined);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author DOUAL Sofian
 * @description Get remote template from github.
 * 
 * @param { string } url 
 * @param { string } name 
 * @returns  { string }
 */
export async function getTemplate(url: string, name: string): Promise<string> {
    try {
        const ghData = url.split('/');
        const res = await (await fetch('https://raw.githubusercontent.com/' + [ghData[3], ghData[4].toLowerCase(), ghData[6], ghData[7], ''].join('/') + name +'/'+ name +'.html')).text();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author DOUAL Sofian
 * @description Get remote form from github.
 * @param { string } url
 * @param { string } name 
 * @returns  { string }
 */
export async function getForm(url: string, name: string): Promise<string> {
    try {
        const ghData = url.split('/');
        const res = await (await fetch('https://raw.githubusercontent.com/' + [ghData[3], ghData[4].toLowerCase(), ghData[6], ghData[7], ''].join('/') + name +'/form/'+ name +'.html')).text();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author DOUAL Sofian
 * @description Get the list of remote template names.
 * @param { string } libraries 
 * @returns { TemplateInfo[] }
 */
export async function getListOfTemplates(libraries: string): Promise<TemplateInfo[]> {
    try {
        const res = await (await fetch(libraries)).json();
        const lib = (res.tree.filter((g: any) => g.path === 'lib'))[0];
        const templates: TemplateInfo[] = (await (await fetch(lib.url)).json()).tree.map((x: any) => { return {name: x.path, url: x.url}});
        return templates;
    } catch (error) {
        throw new Error(error);
    }
}