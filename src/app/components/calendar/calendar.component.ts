import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

interface Event {
  id: string;
  title: string;
  description?: string;
  type: 'class' | 'exam' | 'assignment' | 'meeting' | 'reminder';
  start: Date;
  end: Date;
  color: string;
  course?: string;
  instructor?: string;
  location?: string;
  isAllDay?: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule],
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  daysInMonth: number[] = [];
  firstDayOfMonth: number = 0;
  selectedDate: Date = new Date();
  selectedEvent: Event | null = null;
  viewMode: 'month' | 'week' | 'day' = 'month';
  events: Event[] = [];

  selectedDay: number | null = null;
  dayEvents: Event[] = [];
  showNotifications = false;
  showUserMenu = false;
  notificationCount = 3;
  currentUser: any = { name: 'Dr. Juan Pérez' };
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024;
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
    // Inicializar con la fecha actual seleccionada
    this.selectedDate = new Date();
  }

  generateCalendar(): void {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.firstDayOfMonth = firstDay;
  }

  openDayModal(day: number): void {
    if (this.isMobile) {
      // En móvil, abre el modal
      this.selectedDay = day;
      this.dayEvents = this.getEventsForDay(day);
    } else {
      // En desktop, actualiza el panel lateral
      this.selectDate(day);
    }
  }

  closeDayModal(): void {
    this.selectedDay = null;
    this.dayEvents = [];
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  closeAllMenus(): void {
    this.showUserMenu = false;
    this.showNotifications = false;
  }

  loadEvents(): void {
    this.events = [
      {
        id: '1',
        title: 'Clase: Ecografía Hepática',
        description: 'Módulo 2: Técnicas avanzadas de visualización',
        type: 'class',
        start: new Date(this.currentYear, this.currentMonth, 12, 15, 0),
        end: new Date(this.currentYear, this.currentMonth, 12, 17, 0),
        color: '#4CAF50',
        course: 'Diplomado en Sonoanatomía',
        instructor: 'Dr. Rodríguez',
        location: 'Aula Virtual 3'
      },
      {
        id: '2',
        title: 'Evaluación: Anatomía Abdominal',
        description: 'Quiz de conceptos básicos - Requiere 80% para aprobar',
        type: 'exam',
        start: new Date(this.currentYear, this.currentMonth, 15, 10, 0),
        end: new Date(this.currentYear, this.currentMonth, 15, 11, 30),
        color: '#E74C3C',
        course: 'Ecografía Abdominal',
        location: 'Plataforma Evaluaciones'
      },
      {
        id: '3',
        title: 'Entrega: Caso Clínico Módulo 3',
        description: 'Subir informe de caso clínico al sistema',
        type: 'assignment',
        start: new Date(this.currentYear, this.currentMonth, 18, 23, 59),
        end: new Date(this.currentYear, this.currentMonth, 18, 23, 59),
        color: '#3498DB',
        course: 'Diplomado en Sonoanatomía',
        isAllDay: true
      },
      {
        id: '4',
        title: 'Clase en Vivo: Patologías Hepáticas',
        description: 'Sesión interactiva con casos clínicos reales',
        type: 'class',
        start: new Date(this.currentYear, this.currentMonth, 20, 17, 0),
        end: new Date(this.currentYear, this.currentMonth, 20, 19, 0),
        color: '#9B59B6',
        course: 'Ultrasonido en Diagnóstico',
        instructor: 'Dra. García',
        location: 'Zoom - Enlace en el curso'
      },
      {
        id: '5',
        title: 'Reunión: Grupo de Estudio',
        description: 'Preparación para evaluación final de módulo',
        type: 'meeting',
        start: new Date(this.currentYear, this.currentMonth, 22, 19, 0),
        end: new Date(this.currentYear, this.currentMonth, 22, 20, 30),
        color: '#3498DB',
        location: 'Teams - Enlace en Comunidad'
      },
      {
        id: '6',
        title: 'Recordatorio: Certificado disponible',
        description: 'Tu certificado del Módulo 2 está listo para descargar',
        type: 'reminder',
        start: new Date(this.currentYear, this.currentMonth, 25, 9, 0),
        end: new Date(this.currentYear, this.currentMonth, 25, 9, 0),
        color: '#F39C12',
        isAllDay: true
      }
    ];
  }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() && 
           this.currentMonth === today.getMonth() && 
           this.currentYear === today.getFullYear();
  }

  formatDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} hrs`;
  }

  getEventsForDay(day: number): Event[] {
    const date = new Date(this.currentYear, this.currentMonth, day);
    return this.events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === this.currentMonth && 
             eventDate.getFullYear() === this.currentYear;
    });
  }

  getEventTypeIcon(type: string): string {
    switch(type) {
      case 'class': return '🎓';
      case 'exam': return '📝';
      case 'assignment': return '📚';
      case 'meeting': return '👥';
      case 'reminder': return '🔔';
      default: return '📅';
    }
  }

  changeMonth(delta: number): void {
    this.currentMonth += delta;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  selectDate(day: number): void {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    const events = this.getEventsForDay(day);
    if (events.length > 0) {
      this.selectedEvent = events[0];
    } else {
      this.selectedEvent = null;
    }
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
  }

  setViewMode(mode: 'month' | 'week' | 'day'): void {
    this.viewMode = mode;
  }

  getMonthName(month: number): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[month];
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}