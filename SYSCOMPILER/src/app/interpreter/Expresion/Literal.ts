import { Ambito } from "../Ambito/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from './Retorno';
export let AstLiteral="";
export let AstLiteralNombre="";
export class Literal extends Expresion {

    constructor(private value: any, private tipo: TipoLiteral, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito:Ambito): Retorno {
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
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        const x = Math.random() * 10000000;
        let nombreNodoPrincipal = (x < 0 ? Math.ceil(x) : Math.floor(x));
        const cod =  `${nombreNodoPrincipal}[label="Literal"];
        nodo1_valor_${nombreNodoPrincipal}[label="tipo: "+"${this.tipo} "+"valor: "+"${this.value}"];
        ${nombreNodoPrincipal} -> nodo1_valor_${nombreNodoPrincipal}
        `;
        AstLiteral =cod+"\n";
        AstLiteralNombre = nombreNodoPrincipal.toString();
        return {codigo:cod , nombreNodo: nombreNodoPrincipal.toString()  };
    }
} 
export enum TipoLiteral {
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4
}