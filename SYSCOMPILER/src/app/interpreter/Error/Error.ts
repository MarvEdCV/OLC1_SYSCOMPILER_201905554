export let MensajeError="";

export class Error {
    constructor(public linea: number, public columna: number, public tipo: string, public mensaje: string) {
        //console.log('Error:',this.tipo,'\nMensaje:',this.mensaje,'\nLinea:',this.linea,'\nColumna:',this.columna)
        MensajeError = "\nError:"+this.tipo.toString()+"\nMensaje:"+this.mensaje.toString()+"\nLinea:"+this.linea.toString()+"\nColumna:"+this.columna.toString();
        console.log(MensajeError);
    }
}
