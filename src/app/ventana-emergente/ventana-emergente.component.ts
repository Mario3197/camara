import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent implements OnInit,OnDestroy {
  @ViewChild("canvas")
  public canvas:ElementRef;

  @ViewChild("video")
  public video:ElementRef;

  private fotoTomada: boolean=false;

  constructor(){}

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream =>{
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      })
      .catch(controlError =>{
        alert("Conecta una camara Web y autoriza que el navegador acceda a ella!");
    });
  }

  ngOnDestroy(){
    
  }

  public capturar(){
    //Obtención de la resolución de ancho y alto de la web cam, para establecerlo en el Canvas
    let altoWebCam=this.video.nativeElement.videoHeight;
    let anchoWebCam=this.video.nativeElement.videoWidth;

    //Le damos al canvas el tamaño de la resolución que tiene la webCam
    this.canvas.nativeElement.width=anchoWebCam;
    this.canvas.nativeElement.height=altoWebCam;

    //Dibuja la imagen capturada en un canvas
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement,0,0,this.video.nativeElement.videoWidth,this.video.nativeElement.videoHeight);
    
    this.fotoTomada=true;

    this.canvas.nativeElement.toDataURL("image/jpeg");
  }

  public guardarFoto(){
    if(!this.fotoTomada){
      alert("Debes tomar una foto antes de poder guardar!");
    }
    else{
      this.ngOnDestroy();
    }    
  }
}
