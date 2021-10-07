import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
//import parser from './interpreter/grammar/grammar.js';
import { Expresion } from './interpreter/Expresion/Expresion.js'; 
import { saveAs } from 'file-saver';

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
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
    const entrada = this.codeEditor.getValue()
   
    if (entrada == "") {
      alert("Entrada vacia")
      this.codeEditor.setValue("Julio Pendejo");
      return
    }
  //const ast = parser.parse(entrada)
   //console.log(ast)
    try {
    //console.log(ast.execute());
    } catch (error) {
      console.log(error)
    }

    console.log("Ejecucion terminada")

  }

}