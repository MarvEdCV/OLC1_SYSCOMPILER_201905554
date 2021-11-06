import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { MensajeError } from './interpreter/Error/Error';
import {parser} from './interpreter/grammar/grammar.js';
import { saveAs } from 'file-saver';
import { textPrint } from './interpreter/Instruccion/WriteLine';
import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties'; 
import { Ambito, listavar } from './interpreter/Ambito/Ambito';
import { Metodo } from './interpreter/Instruccion/Metodo';
import { StartWith } from './interpreter/Instruccion/StartWith';
import { Error } from './interpreter/Error/Error';
import { Declaracion } from './interpreter/Instruccion/Declaracion';
import { Asignacion } from './interpreter/Instruccion/Asignacion';
import { AsignacionSinDeclaracion } from './interpreter/Instruccion/AsignacionSinDeclaracion';
const THEME = 'ace/theme/tomorrow_night_eighties';
const LANG = 'ace/mode/typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('codeEditor', { static: true })
  codeEditorElmRef!: ElementRef;
  @ViewChild('network')
  el!: ElementRef;
  public codeEditor!: ace.Ace.Editor;
  private editorBeautify:any;
  consolelog = "";
  tabladesimbolos :any=[];
  tablademetodos :any=[];

  ngOnInit(): void {
    this.editorBeautify = ace.require('ace/ext/beautify');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      cursorStyle: "ace",
      showLineNumbers:true,
      printMarginColumn: 100,
      highlightActiveLine: true,
      minLines: 45,
      maxLines: Infinity,
      maxPixelHeight: 800,
      fontSize: 20
    };
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);

  }
  AddConsole(variable: any){
    if (variable!=null){
      console.log(variable);
      this.consolelog =this.consolelog +">"+ variable + "\n"
    }
  }
  AbrirExplorador(fileInput: any) {
    var contenido:string;
    const fileReaded = fileInput.target.files[0];
    //Creamos un objeto tipo Filereader para leer el contenido
    var myReader:FileReader = new FileReader();
    myReader.onloadend = e => {
      contenido =<string> myReader.result;
      //Insertamos el contenido en el editor
      this.codeEditor.setValue(contenido);
    }
    myReader.readAsText(fileReaded);
  }
  Save(){
    var contenido:string;
    contenido = this.codeEditor.getValue();
      const blob = new Blob([contenido], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "File.sc");
  }

  ejecutar() {
    let entrada = this.codeEditor?.getValue()
    this.tabladesimbolos=[];
    this.tablademetodos=[];
    entrada = entrada.toLowerCase();
    console.log("Iniciando Análisis...")
    this.consolelog="Iniciando Análisis";
    if (entrada == "") {
      alert("Entrada vacia")
      return
    } 
   const ast = parser.parse(entrada)
   console.log(ast)
   const ambito = new Ambito(null); 
   try {
    for(const instruccion of ast){
      if(instruccion instanceof Metodo){
        instruccion.execute(ambito);
       }
    }
   } catch (error) {
     console.log(error)
     this.consolelog = this.consolelog+error;
   }
    try {
    let contador =0;
    for(const inst of ast){
      if(inst instanceof Declaracion || inst instanceof Asignacion || inst instanceof AsignacionSinDeclaracion){
        inst.execute(ambito); 
      }
      if(inst instanceof Metodo){
        continue;
      }
      if(inst instanceof StartWith){
        if(contador == 0){
          const retorno =inst.execute(ambito);
          this.consolelog = textPrint;
          contador++;
        }/*else{
          throw new Error(0,0, 'Semantico', 'No se puede tener 2 start With')
        }*/
      }
      continue;
    }
    } catch (error) {
      console.log(error)
      this.consolelog = this.consolelog+error;
    }
   this.tabladesimbolos = listavar;
   for(const func of ambito.metodos){
      this.tablademetodos.push(func);
   }
    this.consolelog = this.consolelog +MensajeError
    this.consolelog= this.consolelog +"\n"+"Análisis Finalizado...";
    console.log("Análisis Finalizado...")
  }

}