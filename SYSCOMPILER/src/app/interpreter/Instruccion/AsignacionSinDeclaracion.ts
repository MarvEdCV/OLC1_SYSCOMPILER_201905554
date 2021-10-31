import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from '../Ambito/Ambito';
import { Error } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";;
import { Instruccion } from "./Instruccion";

export class AsignacionSinDeclaracion extends Instruccion {
    private id:string;
    private value:Expresion;
    constructor(id:string,value:Expresion,line:number,column:number) {
        super(line,column)
        this.id=id;
        this.value=value;
    }
    public execute(ambito:Ambito){
        let simbolo = ambito.getVal(this.id)
        //verificamos si la variable ya esta guardada en ese ambito
        if(simbolo!=null){
            //Ejecutamos la expresion que estamos asignando.
            let newsimbol = this.value.execute(ambito)
            //CHANEVAL
            ambito.changeVal(simbolo.id,this.value,simbolo.type,this.line,this.column)
        }else{
            throw new Error(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id)
        }
    }
}