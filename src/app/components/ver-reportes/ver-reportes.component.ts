import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

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
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements OnInit {
  reportes: any[] = [];

  ngOnInit() {
    console.log("📡 Cargando reportes desde Firestore...");

    const reportesQuery = query(collection(db, 'reportes'), orderBy('timestamp', 'desc'));

    onSnapshot(reportesQuery, (querySnapshot) => {
      this.reportes = [];
      querySnapshot.forEach((doc) => {
        const reporte = doc.data();
        this.reportes.push(reporte);
      });

      console.log("✅ Reportes cargados:", this.reportes);
    }, (error) => {
      console.error("❌ Error al cargar los reportes:", error);
    });
  }
}
