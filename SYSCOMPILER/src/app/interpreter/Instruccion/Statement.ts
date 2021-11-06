 
import { Ambito } from "../Ambito/Ambito";
import { Instruccion } from "./Instruccion";
import { Metodo } from "./Metodo";
import { Error } from "../Error/Error";

export class Statement extends Instruccion {
    constructor(private code: Instruccion[], line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const NuevoAmbito = new Ambito(ambito)
        for (const instruccion of this.code) {
            if(instruccion instanceof Metodo){
                throw  new Error(this.line, this.column, 'Semantico','No se permiten metodos dentro de otros metodos');
            }
            try {
                const element = instruccion.execute(NuevoAmbito)

                if (element != null && element != undefined) return element

            }catch (error) {
                console.log(error)
            }
        }
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'INSTRUCCION',nombreNodo:'INSTRUCCION'}
    }
}