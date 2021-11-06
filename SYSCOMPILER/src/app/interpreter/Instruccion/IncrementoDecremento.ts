
import { Ambito } from "../Ambito/Ambito"
import { Error } from "../Error/Error"
import { Instruccion } from "./Instruccion"
import { Retorno } from "../Expresion/Retorno"
export class IncrementoDecremento extends Instruccion {
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
                let newval = Simbolo.valor +1;
                Simbolo.valor =newval;
                return {value:Simbolo.valor,type:Simbolo.type}
            
            }else if(this.simbol=="--"){
                Simbolo.valor = Simbolo.valor-1;
                return {value:Simbolo.valor,type:Simbolo.type}
            }
        }
            throw new Error(this.line, this.column, 'Semantico', 'No se encuentra la variable '+this.id+' o no se tiene acceso en el ambito');
        
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'INSTRUCCION',nombreNodo:'INSTRUCCION'}
    }
}