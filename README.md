# InvoiceJS

This package compiles HTML documents with the corresponding data to save them as PDF files.

## Installation
```$ npm i @sofiand/invoice```

# Usage

Go to [zup](https://www.npmjs.com/package/zup) to know how templates work.

Go to [form-data-to-pdf](https://github.com/SofianD/from-data-to-pdf) to get [FileBuffer interface](https://github.com/SofianD/from-data-to-pdf#filebuffer).

## getAndSaveInvoice(template, data, path?)
```js
const invoicejs = require('@sofiand/invoice');

// template is the converted template as string.
const template = '<html>...';

// data is a list where each element contains the information required by template.
const data = [
    {
        lastname: 'Gilbert',
        firstname: 'Montagnard',
        adress: 'Somewhere',
        params: [
            {
                name: 'premier param',
                value: 'première valeur'
            },
            {
                name: 'second param',
                value: 'seconde valeur'
            }
        ]
    }
];

main();

async function main() {
    try {
        const response = await invoicejs.getAndSaveInvoice(template, data, {toSaveFiles: 'C:/Users/Me/Documents'});
        console.log(response);
        // Display:
        // [
        //   {
        //     name: 'Gilbert Montagnard',
        //     pathOfsavedFile: 'C:\\Users\\Me\\Documents\\Gilbert-Montagnard1616428271017.pdf'
        //   }
        // ]
    } catch(error) {
        throw new Error(error);
    }
}

```