import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

// 📌 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQ2tMdy3RNL5F5GVlnvC-zcl-tZHknGFo",
  authDomain: "vialidadpuebla-59296.firebaseapp.com",
  projectId: "vialidadpuebla-59296",
  storageBucket: "vialidadpuebla-59296.appspot.com",
  messagingSenderId: "127659135448",
  appId: "1:127659135448:web:0b6d5e1751bf40223e62ad"
};

// 📌 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  temas: any[] = [];
  nuevoTema = { titulo: '', categoria: '', autor: 'Usuario Anónimo' };
  categorias = ["Reglas de Tránsito", "Problemas de Estacionamiento", "Infraestructura para Bicicletas", "Obstrucción de Banquetas", "Propuestas Ciudadanas"];

  constructor() {}

  ngOnInit() {
    this.cargarTemas();
  }

  // 📌 Cargar temas desde Firestore en tiempo real
  cargarTemas() {
    const temasQuery = query(collection(db, 'foros'), orderBy('fecha', 'desc'));

    onSnapshot(temasQuery, (snapshot) => {
      this.temas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  // 📌 Agregar nuevo tema
  async agregarTema() {
    if (this.nuevoTema.titulo.trim() === '' || this.nuevoTema.categoria.trim() === '') {
      alert("❗ Debes llenar todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, 'foros'), {
        titulo: this.nuevoTema.titulo,
        categoria: this.nuevoTema.categoria,
        autor: this.nuevoTema.autor,
        fecha: new Date()
      });

      this.nuevoTema = { titulo: '', categoria: '', autor: 'Usuario Anónimo' }; // Limpiar el formulario
      alert("✅ Tema creado con éxito");
    } catch (error) {
      console.error("❌ Error al crear el tema:", error);
      alert("❌ Error al crear el tema");
    }
  }
}
