
import { Retorno, Type } from '../Expresion/Retorno';

export class Simbolo {
    public id: string;
    public type: Type;
    public valor: any;
    constructor(id: string, type: any, valor: any) {
        this.id = id;
        this.type = type;
        this.valor = valor;
        
    }
}