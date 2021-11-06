import { Ambito } from "../Ambito/Ambito"
import { Expresion } from "../Expresion/Expresion"
import { Instruccion } from "./Instruccion"
import { Error } from "../Error/Error"


export class For extends Instruccion {
    private asignacion
    private condicion
    private actualizacion
    private cuerpo 
    constructor(asignacion:Instruccion,condicion:Expresion,actualizacion:Instruccion,cuerpo: Instruccion,line:number,column:number) {
    super(line,column)
    this.asignacion =asignacion
    this.condicion = condicion
    this.actualizacion = actualizacion
    this.cuerpo = cuerpo
    }
    public execute(ambito:Ambito){
        if(this.asignacion){
            this.asignacion.execute(ambito)
        }
        let valcodicion=this.condicion.execute(ambito)
        while(valcodicion.value){
            const retorno = this.cuerpo.execute(ambito)
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break
                }else if (retorno.type == 'Continue') {
                    continue
            }
        }
          valcodicion = this.condicion.execute(ambito)
          this.actualizacion.execute(ambito); 
    }
}
public getCodigoAST(): { codigo: string, nombreNodo: string }{
    return {codigo:'FOR',nombreNodo:'FOR'}
}
}