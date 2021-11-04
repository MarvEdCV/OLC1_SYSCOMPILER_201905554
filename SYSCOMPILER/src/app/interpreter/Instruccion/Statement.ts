 
import { Ambito } from "../Ambito/Ambito";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion {
    constructor(private code: Instruccion[], line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const NuevoAmbito = new Ambito(ambito)
        for (const instruccion of this.code) {
            try {
                const element = instruccion.execute(NuevoAmbito)

                if (element != null && element != undefined) return element

            }catch (error) {
                console.log(error)
            }
        }
    }
}