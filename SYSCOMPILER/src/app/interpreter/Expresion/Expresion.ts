import { tipos, Type, Retorno } from "./Retorno"
import { Ambito } from "../Ambito/Ambito";
export abstract class Expresion {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(ambito:Ambito): Retorno;


    public tipoDominante(tipo1: Type, tipo2: Type): Type {
        return tipos[tipo1][tipo2];
}
}