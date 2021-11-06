import { Expresion } from "./Expresion";
import { Retorno} from "./Retorno"
import { Ambito } from '../Ambito/Ambito';
import { Error } from '../Error/Error';

export class AccesoAmbito extends Expresion {

    constructor(private id: string, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id)
        if (value != null) return { value: value.valor, type: value.type }
        throw new Error(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id)

    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'ACCESOAMBITO',nombreNodo:'ACCESOAMBITO'}
    }
}