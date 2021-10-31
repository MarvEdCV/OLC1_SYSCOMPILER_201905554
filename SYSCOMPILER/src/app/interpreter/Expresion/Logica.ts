import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error } from '../Error/Error';
import { Ambito } from "../Ambito/Ambito";
export class Logica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogica, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito:Ambito): Retorno {
        
        if (this.tipo == TipoLogica.AND) {
            const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
                if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.BOOLEAN){
                    return{value:(leftValue.value&&rightValue.value),type: Type.BOOLEAN}
                }else{
                    throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
                }
        }else if(this.tipo == TipoLogica.OR){
            const leftValue = this.left.execute(ambito);
            const rightValue = this.right.execute(ambito);
            if(leftValue.type == Type.BOOLEAN && rightValue.type == Type.BOOLEAN){
                return{value:(leftValue.value || rightValue.value),type: Type.BOOLEAN}
            }else{
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }else if(this.tipo == TipoLogica.NOT){
            //const leftValue = this.left.execute(ambito);
            const rightValue = this.right.execute(ambito);
            if(rightValue.type == Type.BOOLEAN){
                return{value:!(rightValue.value),type: Type.BOOLEAN}
            }else{
                throw new Error(this.line, this.column, 'Semantico', 'No se puede negar el tipo :'  + rightValue.type);
            }
        }
    return{value:null,type: Type.BOOLEAN}
    
}
}

export enum TipoLogica {
    AND,
    OR,
    NOT
}