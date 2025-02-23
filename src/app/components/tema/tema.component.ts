import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, getDoc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';

const db = getFirestore();

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  temaId: string = '';
  tema: any = {};
  comentarios: any[] = [];
  nuevoComentario = { autor: 'Usuario Anónimo', mensaje: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.temaId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarTema();
    this.cargarComentarios();
  }

  // 📌 Cargar datos del tema
  async cargarTema() {
    const docRef = doc(db, 'foros', this.temaId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.tema = docSnap.data();
    }
  }

  // 📌 Cargar comentarios en tiempo real
  cargarComentarios() {
    const comentariosRef = collection(db, `foros/${this.temaId}/comentarios`);
    onSnapshot(comentariosRef, (snapshot) => {
      this.comentarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  // 📌 Agregar un nuevo comentario
  async agregarComentario() {
    if (this.nuevoComentario.mensaje.trim() === '') {
      alert('❗ El comentario no puede estar vacío.');
      return;
    }

    try {
      await addDoc(collection(db, `foros/${this.temaId}/comentarios`), {
        autor: this.nuevoComentario.autor,
        mensaje: this.nuevoComentario.mensaje,
        fecha: new Date(),
        likes: 0,
        dislikes: 0
      });

      this.nuevoComentario.mensaje = ''; // Limpiar campo
    } catch (error) {
      console.error('❌ Error al agregar comentario:', error);
    }
  }

  // 📌 Agregar Like/Dislike a un comentario
  async reaccionarComentario(comentarioId: string, tipo: 'likes' | 'dislikes') {
    const comentarioRef = doc(db, `foros/${this.temaId}/comentarios/${comentarioId}`);
    const docSnap = await getDoc(comentarioRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const nuevaCantidad = (data[tipo] || 0) + 1;
      await updateDoc(comentarioRef, { [tipo]: nuevaCantidad });
    }
  }
}
