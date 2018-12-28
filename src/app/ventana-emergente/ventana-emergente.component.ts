import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent implements OnInit {
  @ViewChild("canvas")
  public canvas:ElementRef;

  @ViewChild("video")
  public video:ElementRef;

  constructor() { }

  ngOnInit() {}

  public ngAfterViewInit() {
    try{
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
          this.video.nativeElement.srcObject= stream;
          this.video.nativeElement.play();
        });
        alert("Conexión hecha");
      }
    }catch(e){
      alert("Por favor conecta una Web Cam y actualiza al navegador acceder a ella");
    };
    
  }

  public capturar(){

    this.canvas.nativeElement.toDataURL("image/png");
  }
}
