import { Instruccion } from "./Instruccion";
import { Ambito } from "../Ambito/Ambito";
import { Declaracion } from "./Declaracion";
export class Metodo extends Instruccion {
    constructor(public id: string, public statment: Instruccion, public parametros: Array<string>, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        ambito.SaveMethod(this.id,this)
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'INSTRUCCION',nombreNodo:'INSTRUCCION'}
    }
}