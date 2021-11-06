import { Ambito } from "../Ambito/Ambito";
import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Error } from "../Error/Error";
export class Switch extends Instruccion {
    private Exp
    private Listacase
    constructor(Exp:Expresion,Listacase:Instruccion[],line:number,column:number) {
        super(line,column)
        this.Exp=Exp
        this.Listacase = Listacase
    }
    public execute(ambitoanterior:Ambito){
        //Obtenemos valor de la expresion a comparar
        
        let ExpresionDeSwitch = this.Exp.execute(ambitoanterior)
        let IsBrake=false;
            for(let ValorCaseYInstrucciones of this.Listacase){
                let VarlorCase = ValorCaseYInstrucciones[0].execute(ambitoanterior);
                if(ExpresionDeSwitch.type == VarlorCase.type){
                    if(ExpresionDeSwitch.value == VarlorCase.value){
                        for(let InstruccionesCase of ValorCaseYInstrucciones[1]){
                            const ambito = new Ambito(ambitoanterior);
                            const retorno = InstruccionesCase.execute(ambito);
                            if (retorno != null && retorno != undefined) {
                                if (retorno.type == 'Break') {
                                    IsBrake = true;
                                    break
                                }
                            }
                        }
                    }
                if(IsBrake){
                    break;
                }
                }else if(VarlorCase.value == 'DEFAULT'){
                    for (let InstruccionesCase of ValorCaseYInstrucciones[1]){
                        const ambito = new Ambito(ambitoanterior);
                        const retorno =InstruccionesCase.execute(ambito);
                        if (retorno != null && retorno != undefined) {
                            if (retorno.type == 'Break') {
                                IsBrake = true;
                                break
                            }
                        }
                    }
                    if(IsBrake){
                        break;
                    }
                }
                else{
                    throw new Error(this.line, this.column, 'Semantico', 'El valor a comparar en el Switch es diferente tipo, no esta permitido.')
                }
            }
        
        console.log(this.Listacase)
    }
    public getCodigoAST(): { codigo: string, nombreNodo: string }{
        return {codigo:'SWITCH',nombreNodo:'SWITCH'}
    }
}