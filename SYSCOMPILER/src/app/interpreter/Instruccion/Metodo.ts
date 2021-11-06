import { Instruccion } from "./Instruccion";
import { Ambito } from "../Ambito/Ambito";
import { Declaracion } from "./Declaracion";
export let AstMetodo = ""
export class Metodo extends Instruccion {
    constructor(public id: string, public statment: Instruccion, public parametros: Array<string>, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        ambito.SaveMethod(this.id,this)
        this.getCodigoAST();
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
       const x = Math.random() * 10000000;
       let nombreNodoPrincipal = (x < 0 ? Math.ceil(x) : Math.floor(x));
       const codigo =  `${nombreNodoPrincipal}[label="Metodos"];
       nodo1_valor_${nombreNodoPrincipal}[label="Metodo: "+"\n"+"${this.id}"];
       nodo1_param_${nombreNodoPrincipal}[label="Parametros tipo,id: "+"\n"+"${this.parametros}"];
       ${nombreNodoPrincipal} -> nodo1_valor_${nombreNodoPrincipal}
       nodo1_valor_${nombreNodoPrincipal} ->  nodo1_param_${nombreNodoPrincipal}
       `;
        AstMetodo = AstMetodo+codigo+"\n Principal ->"+nombreNodoPrincipal.toString()+";";
        return {codigo:codigo , nombreNodo: nombreNodoPrincipal.toString()  };
    }
}