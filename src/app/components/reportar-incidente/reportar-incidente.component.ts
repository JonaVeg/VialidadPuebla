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
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  descripcion: string = '';
  isUploading: boolean = false; // Para deshabilitar el botón mientras sube

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {}

  // 📌 Maneja la selección de archivos
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.previewUrls = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrls.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // 📌 Verifica si el archivo es una imagen
  isImage(fileUrl: string): boolean {
    return fileUrl.startsWith('data:image');
  }

  // 📌 Verifica si el archivo es un video
  isVideo(fileUrl: string): boolean {
    return fileUrl.startsWith('data:video');
  }

  // 📌 Subir el reporte a Firebase Storage y guardarlo en Firestore
  subirReporte() {
    if (this.selectedFiles.length === 0 || !this.descripcion.trim()) {
      alert('❗ Debes seleccionar al menos un archivo y escribir una descripción.');
      return;
    }

    this.isUploading = true; // Deshabilita el botón mientras se sube

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
        descripcion: this.descripcion,
        archivos: fileUrls,
        fecha: new Date()
      };

      this.firestore.collection('reportes').add(reporte).then(() => {
        alert('✅ Reporte enviado con éxito.');
        this.selectedFiles = [];
        this.previewUrls = [];
        this.descripcion = '';
        this.isUploading = false; // Reactivar botón
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
}
