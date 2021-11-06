export let MensajeError="";

export class Error {
    constructor(public linea: number, public columna: number, public tipo: string, public mensaje: string) {
        //console.log('Error:',this.tipo,'\nMensaje:',this.mensaje,'\nLinea:',this.linea,'\nColumna:',this.columna)
        MensajeError =MensajeError+ "\n-->Error:"+this.tipo.toString()+"\n-->Mensaje:"+this.mensaje.toString()+"\n-->Linea:"+this.linea.toString()+"\n-->Columna:"+this.columna.toString()+"\n";
        console.log(MensajeError);
    }
}
