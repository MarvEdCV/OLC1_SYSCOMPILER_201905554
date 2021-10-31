import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Ambito/Ambito';
import { AppComponent} from 'src/app/app.component';
export  let textPrint

export class WriteLine extends Instruccion {
    private value: Expresion[]
    constructor(value: Expresion[], line: number, column: number) {
        super(line, column)
        this.value = value
    }

    public execute(ambito: Ambito): any {
        for (const actual of this.value) {
            const val = actual.execute(ambito)
            textPrint   = val.value;
            //console.log(val.value)
        }
    }
    
}