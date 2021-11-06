import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from '../Ambito/Ambito';
import { Error } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";;
import { Instruccion } from "./Instruccion";

export class AsignacionSinDeclaracion extends Instruccion {
    private id:string;
    private value:Expresion;
    constructor(id:string,value:Expresion,line:number,column:number) {
        super(line,column)
        this.id=id;
        this.value=value;
    }
    public execute(ambito:Ambito){
        let simbolo = ambito.getVal(this.id)
       
        //verificamos si la variable ya esta guardada en ese ambito
        if(simbolo!=null){
            //Ejecutamos la expresion que estamos asignando.
            let newsimbol = this.value.execute(ambito)
            if(simbolo.type==newsimbol.type){
                //CHANEVAL
                    simbolo.valor = newsimbol.value
                    //simbolo.type = newsimbol.type
                    
            }else{
                throw new Error(this.line, this.column, 'Semantico', 'No se puede asignar el valor a la variable\nya que es de un tipo diferente ya que la variable'+simbolo.id+'es de tipo: '+simbolo.type)
            }
        }
    }
}