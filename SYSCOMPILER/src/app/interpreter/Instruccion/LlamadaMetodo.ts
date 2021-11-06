import { Instruccion } from "./Instruccion";
import { Ambito } from "../Ambito/Ambito";
import { Error } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
export class LlamadaMetodo extends Instruccion {
    constructor(private id: string, private expresiones: Array<Expresion>, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito) {
        const method = ambito.GetMethod(this.id);
        if (method == undefined) throw new Error(this.line, this.column, 'Semantico', `Funcion ${this.id} no encontrada`)
        if (this.expresiones.length != method.parametros.length) throw new Error(this.line, this.column, 'Semantico', "Cantidad de parametros incorrecta\nlos ingresados en la llamada son: "+this.expresiones.length+" y tendrian que ser: "+method.parametros.length)
        const newEnv = new Ambito(ambito.getGlobal());
        for (let i = 0; i < this.expresiones.length; i++) {
            const value = this.expresiones[i].execute(ambito);
            
            let x=Number(method.parametros[i][0]);
            let y=Number(value.type)
            
            if(x==y){
                newEnv.setVal(method.parametros[i][1], value.value, value.type, this.line, this.column);
            }else{
                throw new Error(this.line, this.column, 'Semantico', 'El tipo del parámetro numero--> '+(i+1)+'\ndeclarado en el método no es el mismo tipo que el de la llamada.')
            }            
        }
        method.statment.execute(newEnv);
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'LLAMADAMETODO',nombreNodo:'LLAMADAMETODO'}
    }
}