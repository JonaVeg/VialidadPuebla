import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reportar-incidente',
  templateUrl: './reportar-incidente.component.html',
  styleUrls: ['./reportar-incidente.component.css']
})
export class ReportarIncidenteComponent {
  tiposIncidentes: string[] = [
    "Estacionamiento indebido",
    "Franeleros y cobros indebidos",
    "Obstrucción de banquetas",
    "Infracciones viales",
    "Señalización defectuosa",
    "Otros problemas viales"
  ];

  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  descripcion: string = '';
  ubicacion: string = '';
  tipoIncidente: string = '';
  isUploading: boolean = false;

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {}

  // 📌 Manejar selección de archivos y previsualización
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.previewUrls = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrls.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // 📌 Verifica si es imagen o video
  isImage(fileUrl: string): boolean {
    return fileUrl.startsWith('data:image');
  }
  isVideo(fileUrl: string): boolean {
    return fileUrl.startsWith('data:video');
  }

  // 📌 Subir reporte a Firestore con Firebase Storage
  subirReporte() {
    if (!this.tipoIncidente || this.selectedFiles.length === 0 || !this.descripcion.trim() || !this.ubicacion.trim()) {
      alert('❗ Debes completar todos los campos antes de enviar el reporte.');
      return;
    }

    this.isUploading = true;
    const uploadPromises = this.selectedFiles.map(file => {
      const filePath = `reportes/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => resolve(url), err => reject(err));
          })
        ).subscribe();
      });
    });

    Promise.all(uploadPromises).then(fileUrls => {
      const reporte = {
        tipoIncidente: this.tipoIncidente,
        descripcion: this.descripcion,
        ubicacion: this.ubicacion,
        archivos: fileUrls,
        fecha: new Date()
      };

      this.firestore.collection('reportes').add(reporte).then(() => {
        alert('✅ Reporte enviado con éxito.');
        this.resetForm();
      }).catch(error => {
        console.error("❌ Error al guardar en Firestore:", error);
        alert('❌ Error al guardar el reporte.');
        this.isUploading = false;
      });

    }).catch(error => {
      console.error("❌ Error al subir archivos:", error);
      alert('❌ Error al subir el reporte.');
      this.isUploading = false;
    });
  }

  // 📌 Resetear formulario después de enviar
  resetForm() {
    this.selectedFiles = [];
    this.previewUrls = [];
    this.descripcion = '';
    this.ubicacion = '';
    this.tipoIncidente = '';
    this.isUploading = false;
  }
}
