import { Component, ViewChild, ElementRef } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQ2tMdy3RNL5F5GVlnvC-zcl-tZHknGFo",
  authDomain: "vialidadpuebla-59296.firebaseapp.com",
  projectId: "vialidadpuebla-59296",
  storageBucket: "vialidadpuebla-59296.appspot.com",
  messagingSenderId: "127659135448",
  appId: "1:127659135448:web:0b6d5e1751bf40223e62ad"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-reportar-incidente',
  templateUrl: './reportar-incidente.component.html',
  styleUrls: ['./reportar-incidente.component.css']
})
export class ReportarIncidenteComponent {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  
  tipoIncidente: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  tiposIncidentes: string[] = ['Accidente', 'Infracción', 'Obstrucción'];

  selectedFiles: FileList | null = null;
  previewUrls: string[] = [];
  isUploading: boolean = false;

  camaraActiva = false;
  grabando = false;
  mediaRecorder: any;
  recordedChunks: any[] = [];

  // 📌 Activa la cámara
  activarCamara() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.camaraActiva = true;
      })
      .catch(error => console.error("❌ Error al acceder a la cámara:", error));
  }

  // 📌 Captura una imagen desde la cámara
  capturarFoto() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.nativeElement.videoWidth;
    canvas.height = this.videoElement.nativeElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);

    const fotoBase64 = canvas.toDataURL('image/png');
    this.previewUrls.push(fotoBase64);
  }

  // 📌 Inicia la grabación de video
  grabarVideo() {
    this.recordedChunks = [];
    this.grabando = true;

    const stream = this.videoElement.nativeElement.srcObject;
    this.mediaRecorder = new MediaRecorder(stream);
    
    this.mediaRecorder.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(blob);
      this.previewUrls.push(videoUrl);
    };

    this.mediaRecorder.start();
  }

  // 📌 Detiene la grabación de video
  detenerGrabacion() {
    this.grabando = false;
    this.mediaRecorder.stop();
  }

  // 📌 Maneja la selección de archivos
  onFileSelected(event: Event) {
    console.log("📂 Selección de archivos detectada...");
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
      this.previewUrls = [];

      Array.from(input.files).forEach(file => {
        console.log(`🖼️ Archivo seleccionado: ${file.name}`);
        const url = URL.createObjectURL(file);
        this.previewUrls.push(url);
      });
    }
  }

  // 📌 Envía el reporte a Firestore
  async subirReporte() {
    console.log("🚀 Iniciando subida de reporte...");

    if (!this.tipoIncidente || !this.descripcion || !this.ubicacion) {
      console.error("❌ Error: Faltan datos en el formulario");
      return;
    }

    this.isUploading = true;

    const reportData = {
      tipoIncidente: this.tipoIncidente,
      descripcion: this.descripcion,
      ubicacion: this.ubicacion,
      mediaBase64: this.previewUrls, // Guarda las imágenes o videos en Base64
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'reportes'), reportData);
      console.log("✅ Reporte guardado exitosamente en Firestore");

      // Restablecer el formulario
      this.tipoIncidente = '';
      this.descripcion = '';
      this.ubicacion = '';
      this.previewUrls = [];
      this.selectedFiles = null;
      this.isUploading = false;
    } catch (error) {
      console.error("❌ Error al subir el reporte:", error);
      this.isUploading = false;
    }
  }

  isImage(url: string): boolean {
    return url.startsWith('data:image');
  }

  isVideo(url: string): boolean {
    return url.startsWith('blob:');
  }
}
