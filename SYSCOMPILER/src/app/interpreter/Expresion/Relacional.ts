import { Expresion } from "./Expresion";
import { Type,Retorno} from "./Retorno";
import { Error } from '../Error/Error';
import { Ambito } from "../Ambito/Ambito";
export class Relacional extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito:Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        if(this.tipo == TipoRelacional.IGUALIGUAL){
            const result = leftValue.value == rightValue.value
            return {value: result, type: Type.BOOLEAN}
        }else if (this.tipo == TipoRelacional.DIFERENTE) {
            const result = leftValue.value != rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MAYOR) {
            const result = leftValue.value > rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
            const result = leftValue.value >= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MENOR) {
            const result = leftValue.value < rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
            const result = leftValue.value <= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }
        return {value:null,type:Type.BOOLEAN};
    }
}

export enum TipoRelacional {
    IGUALIGUAL,
    DIFERENTE,
    MAYOR,
    MAYOR_IGUAL,
    MENOR,
    MENOR_IGUAL
}