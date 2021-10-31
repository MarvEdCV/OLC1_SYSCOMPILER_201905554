import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from '../Ambito/Ambito';
import { Error } from "../Error/Error";

export class Asignacion extends Instruccion {
    private type: string;
    private ids: Array<string>
    constructor(type:string,ids:Array<string>,line:number,column:number) {
        super(line,column)
        this.type = type;
        this.ids=ids;
    }
    public execute(ambito:Ambito){
        let typeenum;
        if(this.type.toUpperCase()=="INT"){
            typeenum = 0;
            for(let idactual of this.ids){
                ambito.setVal(idactual,0,Type.INT,this.line,this.column)
            }
        }else if(this.type.toUpperCase()=="DOUBLE"){
            typeenum = 1;
            for(let idactual of this.ids){
                ambito.setVal(idactual,0.0,Type.DOUBLE,this.line,this.column)
            }
        }else if(this.type.toUpperCase()=="BOOLEAN"){
            typeenum = 2;
            for(let idactual of this.ids){
                ambito.setVal(idactual,false,Type.BOOLEAN,this.line,this.column)
            }
        }else if(this.type.toUpperCase()=="CHAR"){
            typeenum = 3;
            for(let idactual of this.ids){
                ambito.setVal(idactual,'',Type.INT,this.line,this.column)
            }
        }else if(this.type.toUpperCase()=="STRING"){
            typeenum=4;
            for(let idactual of this.ids){
                ambito.setVal(idactual,"",Type.INT,this.line,this.column)
            }
        }else{
            throw new Error(this.line, this.column, 'Semantico', 'Tipo de dato invalido');
        }
        console.log(ambito.variables)

    }
}