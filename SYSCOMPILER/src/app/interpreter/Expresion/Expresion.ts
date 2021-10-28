import { tiposuma, Type, Retorno, tiporesta, tipomultiplicacion, tipodivision, tipopotencia, tipomod } from "./Retorno"
import { Ambito } from "../Ambito/Ambito";
export abstract class Expresion {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(ambito:Ambito): Retorno;


    public tipoDominanteSuma(tipo1: Type, tipo2: Type): Type {
        return tiposuma[tipo1][tipo2];
}
public tipoDominanteResta(tipo1: Type, tipo2: Type): Type {
    return tiporesta[tipo1][tipo2];
}
public tipoDominanteMultiplicacion(tipo1: Type, tipo2: Type): Type {
    return tipomultiplicacion[tipo1][tipo2];
}
public tipoDominanteDivision(tipo1: Type, tipo2: Type): Type {
    return tipodivision[tipo1][tipo2];
}
public tipoDominantePotencia(tipo1: Type, tipo2: Type): Type {
    return tipopotencia[tipo1][tipo2];
}
public tipoDominanteModulo(tipo1: Type, tipo2: Type): Type {
    return tipomod[tipo1][tipo2];
}
}