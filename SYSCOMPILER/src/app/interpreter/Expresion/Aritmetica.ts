import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error } from "../Error/Error";
import { Ambito } from "../Ambito/Ambito";

export class Aritmetica extends Expresion {
    //let a=5;
    constructor(private left: Expresion, private right: Expresion, private tipo: TipoAritmetica, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        if (this.tipo == TipoAritmetica.SUMA) {
            let dominante = this.tipoDominanteSuma(leftValue.type, rightValue.type);
            if (dominante == Type.STRING) {
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
            } else if (dominante == Type.DOUBLE) {
                //Validacion para operacion char con double
                if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()+rightValue.value),type: Type.DOUBLE}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(rightValue.value.charCodeAt()+leftValue.value),type: Type.DOUBLE}
                }
                return { value: (leftValue.value + rightValue.value), type: Type.DOUBLE};
                }
                else if (dominante == Type.INT) {
                    //Validacion para operacion char con int
                    if(leftValue.type==Type.CHAR){
                        return{value:(leftValue.value.charCodeAt()+rightValue.value),type: Type.INT}
                    }
                    else if(rightValue.type==Type.CHAR){
                        return{value:(rightValue.value.charCodeAt()+leftValue.value),type: Type.INT}
                    }
                    return { value: (leftValue.value + rightValue.value), type: Type.INT};
                    }
                else {
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        } else if (this.tipo == TipoAritmetica.RESTA) {
            let dominante = this.tipoDominanteResta(leftValue.type, rightValue.type);//CAMBIAR
            if (dominante == Type.DOUBLE) {
                //Validacion para operacion char con double
                if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()-rightValue.value),type: Type.DOUBLE}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(leftValue.value-rightValue.value.charCodeAt()),type: Type.DOUBLE}
                }
                return { value: (leftValue.value - rightValue.value), type: Type.DOUBLE };
            }if (dominante == Type.INT) {
                //Validacion para operacion char con int
            
                if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()-rightValue.value),type: Type.INT}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(leftValue.value-rightValue.value.charCodeAt()),type: Type.INT}
                }
                return { value: (leftValue.value - rightValue.value), type: Type.INT };
            }
             else {
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            let dominante = this.tipoDominanteMultiplicacion(leftValue.type, rightValue.type);//CAMBIAR
            if (dominante == Type.DOUBLE) {
                 
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    //Validacion para operacion char con double
                 if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()*rightValue.value),type: Type.DOUBLE}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(rightValue.value.charCodeAt()*leftValue.value),type: Type.DOUBLE}
                }else{
                    return { value: (leftValue.value * rightValue.value), type: Type.DOUBLE };
                }
                }
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
            if (dominante == Type.INT) {
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    //Validacion para operacion char con int
                 if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()*rightValue.value),type: Type.INT}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(rightValue.value.charCodeAt()*leftValue.value),type: Type.INT}
                }else{
                    return { value: (leftValue.value * rightValue.value), type: Type.INT };
                }
                }
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            } else {
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            let dominante = this.tipoDominanteDivision(leftValue.type, rightValue.type);//CAMBIAR
            if (dominante == Type.DOUBLE) {
                if (rightValue.value == 0) {
                    throw new Error(this.line, this.column, "Semantico", "No se puede dividir entre 0");
                } //Validacion para operacion char con double
                if(leftValue.type==Type.CHAR){
                    return{value:(leftValue.value.charCodeAt()/rightValue.value),type: Type.DOUBLE}
                }
                else if(rightValue.type==Type.CHAR){
                    return{value:(leftValue.value/rightValue.value.charCodeAt()),type: Type.DOUBLE}
                }else {
                    return { value: (leftValue.value / rightValue.value), type: Type.DOUBLE };
                }
            } else {
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA){
            let dominante = this.tipoDominantePotencia(leftValue.type,rightValue.type);
            if(dominante == Type.DOUBLE){
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    return { value: (Math.pow(leftValue.value, rightValue.value)), type: Type.DOUBLE };
                }
            }
            else if(dominante == Type.INT){
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    return { value: (Math.pow(leftValue.value, rightValue.value)), type: Type.INT };
                }
            }else{
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO){
            let dominante = this.tipoDominanteModulo(leftValue.type,rightValue.type);
            if (dominante == Type.DOUBLE) {
                if (rightValue.value == 0) {
                    throw new Error(this.line, this.column, "Semantico", "No se puede dividir entre 0");
                } else {
                    return { value: (leftValue.value % rightValue.value), type: Type.DOUBLE };
                }
            }else {
                throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
            }
        }
        else if(this.tipo == TipoAritmetica.NEGACIONUNARIA){
            return {value: (leftValue.value * rightValue.value ),type:Type.DOUBLE}
        }else {
            throw new Error(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' CON ' + rightValue.type);
        }
    return {value: null, type: Type.BOOLEAN}
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    NEGACIONUNARIA
}