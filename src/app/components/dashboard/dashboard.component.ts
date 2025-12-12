import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuToggle,
  IonSearchbar,
  IonBadge,
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonPopover,
  IonChip,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menu,
  search,
  notifications,
  chatbubbles,
  personCircle,
  chevronDown,
  eye,
  settings,
  logOut,
  time,
  trendingUp,
  trophy,
  statsChart,
  person,
  playCircle,
  home,
  book,
  calendar,
  documentText,
  school,
  people,
  cog,
  ribbon,
  analytics,
  videocam,
  document,
  clipboard,
  informationCircle,
  timeOutline,
  checkmarkCircleOutline,
  statsChartOutline,
  trophyOutline,
} from 'ionicons/icons';
import { AuthService, User } from '../../services/auth-service';
import {
  Activity,
  Course,
  Metric,
  UserStats,
} from 'src/app/models/dashboard.models';
import { Dashboard } from 'src/app/services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonButton,
    IonIcon,
    IonBadge,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Datos de usuario (simulados)
  user = {
    name: 'Carlos Rodríguez',
  };

  // Estadísticas del usuario (simuladas)
  userStats = {
    activeCourses: 3,
    pendingEvaluations: 4,
    totalHours: 45,
    progressPercent: 88,
    achievements: 15,
  };

  // Métricas
  metrics = [
    { icon: 'time', value: '45h', label: 'Horas de estudio', color: '#1E73BE' },
    {
      icon: 'trending-up',
      value: '1215',
      label: 'Puntos de experiencia',
      color: '#2ECC71',
    },
    {
      icon: 'trophy',
      value: '15',
      label: 'Logros obtenidos',
      color: '#F39C12',
    },
    { icon: 'calendar', value: '100%', label: 'Asistencia', color: '#9B59B6' },
  ];

  // Cursos activos
  activeCourses = [
    {
      title: 'Diplomado en Ecografía Ginecológica',
      instructor: 'Dra. María González',
      thumbnail: 'assets/course1.jpg',
      status: 'active',
      progress: 75,
      nextLesson: 'Ecografía transvaginal',
    },
    {
      title: 'Curso Avanzado de Ecocardiografía',
      instructor: 'Dr. Javier López',
      thumbnail: 'assets/course2.jpg',
      status: 'active',
      progress: 40,
      nextLesson: 'Doppler tisular',
    },
    {
      title: 'Fundamentos de Ultrasonido Abdominal',
      instructor: 'Dr. Carlos Méndez',
      thumbnail: 'assets/course3.jpg',
      status: 'active',
      progress: 90,
      nextLesson: 'Ecografía hepática',
    },
  ];

  // Próximas actividades
  upcomingActivities = {
    today: [
      {
        time: '10:00',
        title: 'Clase en vivo: Anatomía Hepática',
        type: 'class',
      },
      {
        time: '15:00',
        title: 'Entrega caso clínico Módulo 3',
        type: 'assignment',
      },
    ],
    tomorrow: [{ time: '14:00', title: 'Evaluación Módulo 2', type: 'exam' }],
  };

  // Recomendaciones
  recommendations = [
    {
      title: 'Ecografía Ginecológica Avanzada',
      instructor: 'Dra. Laura Sánchez',
      thumbnail: 'assets/recommendation1.jpg',
    },
    {
      title: 'Taller de Intervencionismo Ecoguiado',
      instructor: 'Dr. Roberto Gómez',
      thumbnail: 'assets/recommendation2.jpg',
    },
    {
      title: 'Ecografía Musculoesquelética',
      instructor: 'Dr. Andrés Fernández',
      thumbnail: 'assets/recommendation3.jpg',
    },
  ];

  // Cache para colores consistentes
  private colorCache = new Map<string, string>();

  constructor() {
    addIcons({
      time,
      trendingUp,
      trophy,
      statsChart,
      school,
      person,
      playCircle,
      book,
      calendar,
      settings,
      logOut,
      documentText,
      notifications,
      menu,
      search,
      chatbubbles,
      personCircle,
      eye,
      chevronDown,
      home
    });
  }

  ngOnInit(): void {}

  getStatusBadgeColor(status: string): string {
    const colors: { [key: string]: string } = {
      active: 'success',
      pending: 'warning',
      completed: 'primary',
    };
    return colors[status] || 'medium';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      active: 'En progreso',
      pending: 'Pendiente',
      completed: 'Completado',
    };
    return texts[status] || status;
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      class: 'videocam',
      assignment: 'document-text',
      exam: 'clipboard',
    };
    return icons[type] || 'calendar';
  }

  // Método para obtener colores consistentes basados en el título
  getRandomColor(key: string): string {
    // Si ya tenemos un color para esta clave, lo devolvemos
    if (this.colorCache.has(key)) {
      return this.colorCache.get(key)!;
    }

    // Si no, generamos uno nuevo y lo guardamos en cache
    const colors = [
      '#667eea',
      '#764ba2',
      '#f093fb',
      '#f5576c',
      '#4facfe',
      '#00f2fe',
      '#43e97b',
      '#38f9d7',
      '#fa709a',
      '#fee140',
      '#a8edea',
      '#fed6e3',
      '#1E73BE',
      '#0B3C5D',
      '#2ECC71',
      '#F39C12',
      '#9B59B6',
      '#E74C3C',
      '#3498DB',
      '#1ABC9C',
    ];

    // Generar un índice basado en el hash de la clave para consistencia
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    const color = colors[index];

    // Guardar en cache para futuras llamadas
    this.colorCache.set(key, color);

    return color;
  }
}
