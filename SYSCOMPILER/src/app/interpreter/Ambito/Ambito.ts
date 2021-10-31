
import { Error } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Declaracion } from "../Instruccion/Declaracion";
import { Simbolo } from "./Simbolo"

export class Ambito {
    public variables: Map<string, Simbolo>

    constructor(public anterior: Ambito | null) {
        this.variables = new Map();
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
    
    public changeVal(id:string,value:any,type:Type,line,column){
        let env:Ambito|null=this;
        while (env!=null){
            if(env.variables.has(id)){
                //Si encuentra el id en el ambito borramos el temporal y lo sobreinscribimos
                env.variables.delete(id);
                //Sobreincribir
                env.setVal(id,value,type,line,column)
            }
            env = env.anterior
        }
    }

}