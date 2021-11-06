import { Instruccion } from "./Instruccion";
import { Error } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Ambito/Ambito";


export class If extends Instruccion {
    constructor(private condicion, private cuerpo: Instruccion, private Else: Instruccion, line: number, column: number) {
        super(line, column)
    }
    public execute(ambito: Ambito) {
        const value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEAN) throw new Error(this.line, this.column, 'Semantico', 'La condicion evaluada no es de tipo Boleana')
        // true - false

        if (value.value) {
            return this.cuerpo.execute(ambito)

        } else if (this.Else != null) {
            return this.Else.execute(ambito)
        }

    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'INSTRUCCION',nombreNodo:'INSTRUCCION'}
    }

}