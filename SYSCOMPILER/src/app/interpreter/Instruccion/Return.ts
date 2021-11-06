import { Ambito } from "../Ambito/Ambito";
import { Instruccion } from "./Instruccion";
export class Return extends Instruccion {
    constructor(line,column) {
        super(line,column)
    }
    public execute(ambito:Ambito){
        return {type:'Return',line:this.line,column:this.column}
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'RETURN',nombreNodo:'RETURN'}
    }
}