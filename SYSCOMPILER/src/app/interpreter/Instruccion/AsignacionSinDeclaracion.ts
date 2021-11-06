import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from '../Ambito/Ambito';
import { Error } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";;
import { Instruccion } from "./Instruccion";
export let AstAsignacionSinDeclaracion = "";
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
        this.getCodigoAST();
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        const codExp: { codigo: string, nombreNodo: string } = this.value.getCodigoAST();
        const x = Math.random() * 100009;
        let nombreNodoPrincipal = (x < 0 ? Math.ceil(x) : Math.floor(x));
        const codigo =  `${nombreNodoPrincipal}[label="AstAsignacionSinDeclaracion"];
        nodo1_valor_${nombreNodoPrincipal}[label="Identificador: "+"\n"+"${this.id}"];
        ${codExp.codigo}
        ${nombreNodoPrincipal} -> ${codExp.nombreNodo};
        ${nombreNodoPrincipal} -> nodo1_valor_${nombreNodoPrincipal}
        `;
        AstAsignacionSinDeclaracion = AstAsignacionSinDeclaracion+codigo+"\n Principal ->"+nombreNodoPrincipal.toString()+";";
        return {codigo: codigo , nombreNodo: nombreNodoPrincipal.toString() };

        
    }
}