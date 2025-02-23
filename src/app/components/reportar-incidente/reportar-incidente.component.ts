import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuración de Firebase (reemplaza con tus credenciales)
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
  tipoIncidente: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  tiposIncidentes: string[] = ['Accidente', 'Infracción', 'Obstrucción'];

  selectedFiles: FileList | null = null;
  previewUrls: string[] = [];
  isUploading: boolean = false;

  subirReporte() {
    console.log("🚀 Iniciando subida de reporte...");
    
    if (!this.tipoIncidente || !this.descripcion || !this.ubicacion) {
      console.error("❌ Error: Faltan datos en el formulario");
      return;
    }

    this.isUploading = true;

    const files = this.selectedFiles ? Array.from(this.selectedFiles) : [];
    console.log("📁 Archivos seleccionados:", files);

    const base64Promises = files.map(file => this.fileToBase64(file));

    Promise.all(base64Promises)
      .then(base64Urls => {
        console.log("📤 Imágenes convertidas a Base64:", base64Urls);
        
        const reportData = {
          tipoIncidente: this.tipoIncidente,
          descripcion: this.descripcion,
          ubicacion: this.ubicacion,
          mediaBase64: base64Urls, // Almacenamos las imágenes en Base64 en Firestore
          timestamp: serverTimestamp()
        };

        console.log("📄 Guardando datos en Firestore:", reportData);

        return addDoc(collection(db, 'reportes'), reportData);
      })
      .then(() => {
        console.log("✅ Reporte guardado exitosamente en Firestore");
        this.tipoIncidente = '';
        this.descripcion = '';
        this.ubicacion = '';
        this.previewUrls = [];
        this.selectedFiles = null;
        this.isUploading = false;
      })
      .catch(error => {
        console.error("❌ Error al subir el reporte:", error);
        this.isUploading = false;
      });
  }

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

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(`📌 Archivo convertido a Base64: ${file.name}`);
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|mov|avi|wmv)$/) !== null;
  }
}
