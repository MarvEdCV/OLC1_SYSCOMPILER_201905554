import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Ambito/Ambito';
import { Type } from "../Expresion/Retorno";
import { Error } from "../Error/Error";
export let AstDeclaracion="";
export let AstDeclaracionNombre="";
export class Declaracion extends Instruccion {

    private id: string;
    private value: Expresion;
    private type:string;
    constructor(type:string,id: string, value: Expresion, line: number, column: number) {
        super(line, column)
        this.id = id
        this.value = value
        this.type = type
    }

    public execute(ambito: Ambito) {
        let val = this.value.execute(ambito)
        let typeenum;
        if(this.type.toUpperCase()=="INT"){
            typeenum = 0;
        }else if(this.type.toUpperCase()=="DOUBLE"){
            typeenum = 1;
            
        }else if(this.type.toUpperCase()=="BOOLEAN"){
            typeenum = 2;
            
        }else if(this.type.toUpperCase()=="CHAR"){
            typeenum = 3;
            
        }else if(this.type.toUpperCase()=="STRING"){
            typeenum=4;
            
        }
        if(typeenum==val.type){
            let simbolo = ambito.getVal(this.id)
        //verificamos si la variable ya esta guardada en ese ambito
            if(simbolo!=null){
                throw new Error(this.line, this.column, 'Semantico', 'No se puede a declarar la variable, ya que esta ya existe en el ambito.')
                }else{
                    ambito.setVal(this.id, val.value, val.type, this.line, this.column) 
            }
        }else{
            throw new Error(this.line, this.column, 'Semantico', 'No se puede asignar este valor a este tipo de dato')
        }
        //console.log(ambito.variables)
        this.getCodigoAST();
        
    }
    public getCodigoAST():{ codigo: string, nombreNodo: string }{
        const codExp: { codigo: string, nombreNodo: string } = this.value.getCodigoAST();
        const x = Math.random() * 10000000;
        let nombreNodoPrincipal = (x < 0 ? Math.ceil(x) : Math.floor(x));
        const codigo =  `${nombreNodoPrincipal}[label="Declaracion.ts"];
        nodo1_valor${nombreNodoPrincipal}[label="Identificador"]; 
        nodo1_valor_${nombreNodoPrincipal}[label="${this.id}"];
        ${codExp.codigo}
        nodo1_valor${nombreNodoPrincipal} -> nodo1_valor_${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> nodo1_valor${nombreNodoPrincipal};
        ${nombreNodoPrincipal} -> ${codExp.nombreNodo};
        `;
        AstDeclaracion = AstDeclaracion+codigo+"\n Principal ->"+nombreNodoPrincipal.toString()+";";
        AstDeclaracionNombre = nombreNodoPrincipal.toString();
        return { codigo:codigo, nombreNodo: nombreNodoPrincipal.toString()};
    } 
}