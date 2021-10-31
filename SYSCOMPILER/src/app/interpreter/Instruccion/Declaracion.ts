import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Ambito/Ambito';
import { Type } from "../Expresion/Retorno";
import { Error } from "../Error/Error";

export class Declaracion extends Instruccion {

    private id: string;
    private value: Expresion;
    private type:string;
    constructor(type:string,id: string, value: Expresion, line: number, column: number) {
        super(line, column)
        this.id = id
        this.value = value
        this.type = type
    }

    public execute(ambito: Ambito) {
        let val = this.value.execute(ambito)
        let typeenum;
        if(this.type.toUpperCase()=="INT"){
            typeenum = 0;
            
        }else if(this.type.toUpperCase()=="DOUBLE"){
            typeenum = 1;
            
        }else if(this.type.toUpperCase()=="BOOLEAN"){
            typeenum = 2;
            
        }else if(this.type.toUpperCase()=="CHAR"){
            typeenum = 3;
            
        }else if(this.type.toUpperCase()=="STRING"){
            typeenum=4;
            
        }
        if(typeenum==val.type){
            ambito.setVal(this.id, val.value, val.type, this.line, this.column)
        }else{
            throw new Error(this.line, this.column, 'Semantico', 'No se puede asignar este valor a este tipo de datox')
        }
        console.log(ambito.variables)
        
    }
}