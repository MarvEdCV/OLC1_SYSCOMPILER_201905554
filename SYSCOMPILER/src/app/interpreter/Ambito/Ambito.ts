
import { Error } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Declaracion } from "../Instruccion/Declaracion";
import { Metodo } from "../Instruccion/Metodo";
import { Simbolo } from "./Simbolo"

export class Ambito {
    public variables: Map<string, Simbolo>
    public metodos: Map<string,Metodo>

    constructor(public anterior: Ambito | null) {
        this.variables = new Map();
        this.metodos  = new Map();
    }

    public setVal(id: string, value: any, type: Type, line, column) {
        let env: Ambito | null = this;

        while (env != null) {
            if (env.variables.has(id)) {
                const val = env.variables.get(id);
                if (val?.type == type) env.variables.set(id, new Simbolo(value, id, type))
                throw new Error(line, column, 'Semantico', 'No se puede asignar: ' + value + ' a ' + id)
            }
            env = env.anterior
        }
        this.variables.set(id, new Simbolo(id,type,value))
    }

    public getVal(id: string): Simbolo|null|undefined {
        let env: Ambito | null = this;

        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id)
            }
            env = env.anterior
        }
        return null;
    }

    public SaveMethod(id:string,metodo:Metodo){
        this.metodos.set(id,metodo)
    }
    public GetMethod(id:string){
        let env:Ambito|null = this
        while(env!=null){
            if(env.metodos.has(id)){
                return env.metodos.get(id)
            }
            env = env.anterior 
        }
       
        return null;

    }
}