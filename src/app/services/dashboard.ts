import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity, Course, Metric, UserStats } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  getUserStats(): Observable<UserStats> {
    return of({
      totalHours: 45,
      progressPercent: 85,
      achievements: 12,
      activeCourses: 3,
      pendingEvaluations: 2
    });
  }

  getMetrics(): Observable<Metric[]> {
    return of([
      { label: '45h este mes', value: '45h', color: '#1E73BE', icon: 'time-outline' },
      { label: '12/15 cursos en tiempo', value: '12/15', color: '#4CAF50', icon: 'checkmark-circle-outline' },
      { label: '88% eficiencia', value: '88%', color: '#FF9800', icon: 'stats-chart-outline' },
      { label: '15 logros', value: '15', color: '#9C27B0', icon: 'trophy-outline' }
    ]);
  }

  getActiveCourses(): Observable<Course[]> {
    return of([
      {
        id: '1',
        title: 'Diplomado en Sonoanatomía e Intervencionismo',
        instructor: 'Dr. Carlos Rodríguez',
        thumbnail: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'in-progress',
        progress: 65,
        nextLesson: 'Ecografía Hepática'
      },
      {
        id: '2',
        title: 'Curso Avanzado de Ecografía Cardiovascular',
        instructor: 'Dra. Ana Martínez',
        thumbnail: 'https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'in-progress',
        progress: 42,
        nextLesson: 'Ecocardiografía Doppler'
      },
      {
        id: '3',
        title: 'Fundamentos de Ultrasonido Musculoesquelético',
        instructor: 'Dr. Miguel Torres',
        thumbnail: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'in-progress',
        progress: 28,
        nextLesson: 'Anatomía del Hombro'
      }
    ]);
  }

  getUpcomingActivities(): Observable<{ today: Activity[], tomorrow: Activity[] }> {
    return of({
      today: [
        {
          id: '1',
          type: 'class',
          title: 'Clase en vivo: Anatomía Hepática',
          time: '10:00',
          date: 'Hoy'
        },
        {
          id: '2',
          type: 'assignment',
          title: 'Entrega caso clínico Módulo 3',
          time: '15:00',
          date: 'Hoy'
        }
      ],
      tomorrow: [
        {
          id: '3',
          type: 'exam',
          title: 'Evaluación Módulo 2',
          time: '14:00',
          date: 'Mañana'
        }
      ]
    });
  }

  getRecommendations(): Observable<Course[]> {
    return of([
      {
        id: '4',
        title: 'Ecografía Ginecológica Avanzada',
        instructor: 'Dra. Laura Sánchez',
        thumbnail: 'https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'pending',
        progress: 0,
        nextLesson: ''
      },
      {
        id: '5',
        title: 'Taller de Intervencionismo Ecoguiado',
        instructor: 'Dr. Roberto Gómez',
        thumbnail: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'pending',
        progress: 0,
        nextLesson: ''
      }
    ]);
  }
}
