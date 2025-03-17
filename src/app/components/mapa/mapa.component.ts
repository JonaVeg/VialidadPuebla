import { Component, OnInit } from '@angular/core';
//import * as mapboxgl from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from 'src/environments/environment'; // Importa el environment

// Inicializar Firebase solo si no está inicializado previamente
const app = getApps().length ? getApp() : initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa!: mapboxgl.Map;
  reportes: any[] = [];

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYTIwMjUiLCJhIjoiY204NnJ3cDJwMDdmaTJqcHVzMXBzdW9jMyJ9.VDokIJCjfHe_9z33Ez9FEw'; // Reemplaza con tu API Key de Mapbox

    this.mapa = new mapboxgl.Map({
      container: 'mapa', // ID del div donde se mostrará el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-98.1986, 19.0433], // Coordenadas de Puebla
      zoom: 12 // Nivel de zoom inicial
    });

    this.cargarReportes();
  }

  async cargarReportes() {
    console.log("📡 Cargando reportes desde Firestore...");
    try {
      const querySnapshot = await getDocs(collection(db, 'reportes'));
      
      querySnapshot.forEach((doc) => {
        const reporte = doc.data();
        this.reportes.push(reporte);

        // Agregar marcador en el mapa
        new mapboxgl.Marker()
        .setLngLat([reporte['lng'], reporte['lat']])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h6>🚦 ${reporte['tipoIncidente']}</h6>
          <p>${reporte['descripcion']}</p>
          <p><strong>📍 Ubicación:</strong> ${reporte['ubicacion']}</p>
          <p><strong>📅 Fecha:</strong> ${new Date(reporte['timestamp']['seconds'] * 1000).toLocaleString()}</p>
        `))
        .addTo(this.mapa);
      });

      console.log("✅ Reportes cargados:", this.reportes);
    } catch (error) {
      console.error("❌ Error al cargar los reportes:", error);
    }
  }
}
