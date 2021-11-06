import { Ambito } from "../Ambito/Ambito";
import { Expresion } from "../Expresion/Expresion";
import { Retorno, Type } from "../Expresion/Retorno";
import { Instruccion } from "./Instruccion";
import { Error } from "../Error/Error";
export class LowerOrUpper extends Instruccion {
    private value:Expresion;
    private type:string;
    constructor(type:string,value:Expresion,line:number,column:number) {
        super(line,column)
        this.value = value;
        this.type = type;
    }
    public execute(ambito:Ambito):Retorno{
        const executeexpresion = this.value.execute(ambito);
        let tipo;
        if(this.type=="typeof"){
            if(executeexpresion.type==0){
                tipo="Int";
            }if(executeexpresion.type==1){
                tipo="Double";
            }if(executeexpresion.type==2){
                tipo="Boolean";
            }if(executeexpresion.type==3){
                tipo="Char";
            }if(executeexpresion.type==4){
                tipo="String";
            }
            return {value:tipo,type:Type.STRING}
        }if(this.type=="tostring"){
            if(executeexpresion.type != Type.CHAR){
                return {value:"\""+executeexpresion.value.toString()+"\"",type:Type.STRING}
            }else{throw new Error(this.line, this.column, 'Semantico', 'No se puede usar este método para este tipo de char.')}            
        }
        if(executeexpresion.type == Type.STRING){
            if(this.type == "tolower"){
                executeexpresion.value = executeexpresion.value.toLowerCase();
                return {value:executeexpresion.value,type:Type.STRING}
            }else if(this.type == "toupper"){
                executeexpresion.value = executeexpresion.value.toUpperCase();
                return {value:executeexpresion.value,type:Type.STRING}
            }            
        }else if(executeexpresion.type == Type.DOUBLE || executeexpresion.type == Type.INT ){
            if(this.type == "truncate"){
                executeexpresion.value = Math.trunc(executeexpresion.value);
                return {value:executeexpresion.value,type:Type.INT}
            }else if(this.type == "round"){
                executeexpresion.value = Math.round(executeexpresion.value);
                return {value:executeexpresion.value,type:Type.INT}
            }  
    }
    throw new Error(this.line, this.column, 'Semantico', 'No se puede usar este método para este tipo de dato.')
}
    public getCodigoAST():{codigo:string,nombreNodo:string}{

        return {codigo:"LOWERORUPPER" , nombreNodo: "LOWERORUPPER"  };
    }
}