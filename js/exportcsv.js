class TableCsvExport{
    constructor (table, includeheaders = true) {
        this.table = table;
        this.rows = Array.from(table.querySelectorAll("tr"));

        if(! includeheaders && this.rows[0].querySelectorAll("th").length) {
            this.rows.shift();
        }

        if (!includeheaders && this.rows[0].querySelectorAll("th").length) {
            this.rows.shift();
        }

    }
    
    convertTocsv() {
        const lines = [];
        const numCols = this._findLogestRowLength();

        for (const row of this.rows) {
            let line = "";

            for( let i = 0; i < numCols; i++) {
                if (row.children[i] != undefined) {
                    line += TableCsvExport.parseCell(row.children[i]);
                }

                line += (i !== (numCols - 1)) ? "," : "";
            }

            lines.push(line);
        }
        return lines.join("\n");
    }

    _findLogestRowLength () {
        return this.rows.reduce((l, row)=> row.childElementCount > l ? row.childElementCount : l, 0);
    }    

    static parseCell (tableCell) {
        let  parsedValue = tableCell.textContent;

        // reemplaza todo por comillas dobles
         parsedValue = parsedValue.replace(/"/g, `""`);

         //si la variable contiene coma, crea un nueva linea o comilla doble
         parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

         return parsedValue;
    }
}