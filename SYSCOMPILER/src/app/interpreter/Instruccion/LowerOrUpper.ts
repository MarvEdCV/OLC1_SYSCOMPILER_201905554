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
        if(executeexpresion.type == Type.STRING){
            if(this.type == "tolower"){
                executeexpresion.value = executeexpresion.value.toLowerCase();
                return {value:executeexpresion.value,type:Type.STRING}
            }else if(this.type == "toupper"){
                executeexpresion.value = executeexpresion.value.toUpperCase();
                return {value:executeexpresion.value,type:Type.STRING}
            }            
        }
            throw new Error(this.line, this.column, 'Semantico', 'No se puede usar este método para este tipo de dato.')
        
    }
    public getCodigoAST():{codigo:string,nombreNodo:string}{

        return {codigo:"codigo" , nombreNodo: "nombreNodoPrincipal.toString()"  };
    }
}