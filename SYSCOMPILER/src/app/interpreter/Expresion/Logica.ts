import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
//import { Ambito } from "../Ambito/Ambito";
export class Relacional extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogica, line: number, column: number) {
        super(line, column);
    }
    public execute(): Retorno {
        const leftValue = this.left.execute();
        let rightValue
        if (this.right != null) {
        }

        if (this.tipo == TipoLogica.NOT) {
            return { value: !(leftValue.value), type: Type.BOOLEAN }
        } else if (this.tipo == TipoLogica.AND) {
            if (leftValue.value == Type.BOOLEAN) {
                const rightValue = this.right.execute();
                if (rightValue.type === Type.BOOLEAN) {
                    return { value: (leftValue.value && rightValue.value), type: Type.BOOLEAN }
                }
                throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos')
            }
            throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos')
        } else if (this.tipo == TipoLogica.OR) {
            return { value: (leftValue.value || rightValue.value), type: Type.BOOLEAN }
        }
    return{value:null,type: Type.BOOLEAN}
    }
}

export enum TipoLogica {
    AND,
    OR,
    NOT
}