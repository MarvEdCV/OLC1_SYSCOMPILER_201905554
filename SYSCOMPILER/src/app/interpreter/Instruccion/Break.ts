import { Instruccion } from "./Instruccion"
import { Ambito } from "../Ambito/Ambito"
export class Break extends Instruccion {
    constructor(line, column) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Break', line: this.line, column: this.column }
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'BREAK',nombreNodo:'BREAK'}
    }

}