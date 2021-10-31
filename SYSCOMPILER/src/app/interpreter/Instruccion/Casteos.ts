import { Instruccion } from "./Instruccion";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Ambito/Ambito";
import { Error } from "../Error/Error";
import { Retorno,Type } from "../Expresion/Retorno";
export class Casteos extends Instruccion {
    private typeCast:string;
    private value:Expresion;
    constructor(typeCast:string,value:Expresion,line:number,column:number) {
        super(line,column)
        this.typeCast=typeCast
        this.value=value;
    }
    public execute(ambito:Ambito):Retorno{
        let retorno;
        let expresion = this.value.execute(ambito)
        const castType = this.typeCast.toUpperCase();
        if(castType=="INT" && (expresion.type==Type.DOUBLE||expresion.type==Type.CHAR)){
            if(expresion.type==Type.DOUBLE){
                retorno = Math.floor(expresion.value)
                return{value:retorno,type:Type.INT}
            }else if(expresion.type=Type.CHAR){
                retorno=expresion.value.charCodeAt()
                return{value:retorno,type:Type.INT}
            } 
        }else if(castType=="DOUBLE" &&(expresion.type==Type.INT||expresion.type==Type.CHAR)){
            if(expresion.type==Type.INT){
                retorno = expresion.value +0.0
                return{value:retorno,type:Type.DOUBLE}
            }else if(expresion.type=Type.CHAR){
                retorno=expresion.value.charCodeAt()+0.0
                return{value:retorno,type:Type.DOUBLE}
            } 
        }else if(castType=="STRING" &&(expresion.type==Type.INT || expresion.type == Type.DOUBLE)){
            if(expresion.type==Type.INT){
                retorno = expresion.value.toString()
                return{value:retorno,type:Type.STRING}
            }else if(expresion.type=Type.DOUBLE){
                retorno=expresion.value.toString()
                return{value:retorno,type:Type.STRING}
            } 
        }else if(castType=="CHAR" &&(expresion.type==Type.INT)){
            if(expresion.type==Type.INT){  
                return{value:String.fromCharCode(expresion.value),type:Type.CHAR}
            }
        }
            throw new Error(this.line, this.column, 'Semantico', 'No se puede realizar este casteo de tipo: '+expresion.type+' a '+castType);
        
    }
}