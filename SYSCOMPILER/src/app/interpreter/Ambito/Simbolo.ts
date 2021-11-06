
import { Retorno, Type } from '../Expresion/Retorno';

export class Simbolo {
    public id: string;
    public type: Type;
    public valor: any;
    public line: number;
    public column: number;
    constructor(id: string, type: any, valor: any,line:number,column:number) {
        this.id = id;
        this.type = type;
        this.valor = valor;
        this.line = line;
        this.column = column;
        
    }
}