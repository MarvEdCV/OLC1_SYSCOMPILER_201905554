//import { Ambito } from "../Ambito/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from './Retorno';
export class Literal extends Expresion {

    constructor(private value: any, private tipo: TipoLiteral, line: number, column: number) {
        super(line, column);
    }
    public execute(): Retorno {
        if (this.tipo == 0) {
            return { value: Number(this.value), type: Type.INT };
        } else if (this.tipo == 1) {
            return { value: Number(this.value), type: Type.DOUBLE };
        } else if (this.tipo == 2) {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Type.BOOLEAN }
            }
            return { value: false, type: Type.BOOLEAN }
        }else if(this.tipo == 3){
            return {value: this.value.toString(),type: Type.CHAR}
        }
        else if(this.tipo == 4){
            return {value: this.value.toString(),type: Type.STRING}
        }
        else{
            return {value:null,type:Type.DOUBLE};
        }
        
    }
} 
export enum TipoLiteral {
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4
}