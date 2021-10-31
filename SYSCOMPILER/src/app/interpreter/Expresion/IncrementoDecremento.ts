
import { Ambito } from "../Ambito/Ambito"
import { Error } from "../Error/Error"
import { Retorno } from "./Retorno"
import { Expresion } from "./Expresion"
export class IncrementoDecremento extends Expresion {
    private id:string
    private simbol:string
    constructor(id:string,simbol:string,line:number,column:number) {
        super(line,column)
        this.id=id
        this.simbol=simbol
    }
    public execute(ambito:Ambito):Retorno{
        let Simbolo = ambito.getVal(this.id)
        if(Simbolo!=null){
            if(this.simbol=="++"){
                return{value:Simbolo.valor+1,type:Simbolo.type}
            }else if(this.simbol=="--"){
                return{value:Simbolo.valor-1,type:Simbolo.type}
            }
        }throw new Error(this.line, this.column, 'Semantico', 'No se encuentra la variable '+this.id+' o no se tiene acceso en el ambito');
    }
}