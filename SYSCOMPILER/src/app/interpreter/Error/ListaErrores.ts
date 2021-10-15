import { Error } from "./Error";

export class ListaErrores{
    private static instance: ListaErrores;
    lista: Error[];
    private constructor(){
        this.lista = [];
    }
    public getInstance():ListaErrores{
        if(!ListaErrores.instance){
            ListaErrores.instance = new ListaErrores();
        }
        return ListaErrores.instance;
    }
    public push(error: Error):void{
        this.lista.push(error);
    }
    public clear(): void{
        this.lista = [];
      }
    
      public hasErrors() : boolean{
        return this.lista.length > 0;
      }
    
      public getListaErrores(): Error[]{
        return this.lista;
      }
}