import { Instruccion } from "./Instruccion"
import { Ambito } from "../Ambito/Ambito"
export class Continue extends Instruccion {
    constructor(line, column) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Continue', line: this.line, column: this.column }
    }

}