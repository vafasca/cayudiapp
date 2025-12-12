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
  user: User | null = null;
  userStats: UserStats | null = null;
  metrics: Metric[] = [];
  activeCourses: Course[] = [];
  upcomingActivities: { today: Activity[]; tomorrow: Activity[] } = {
    today: [],
    tomorrow: [],
  };
  recommendations: Course[] = [];
  sidebarOpen = false;
  showUserMenu = false;

  menuItems = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard', active: true },
    { icon: 'book', label: 'Mis Cursos', route: '/courses', active: false },
    {
      icon: 'calendar',
      label: 'Calendario',
      route: '/calendar',
      active: false,
    },
    {
      icon: 'document-text',
      label: 'Evaluaciones',
      route: '/evaluations',
      active: false,
    },
    {
      icon: 'school',
      label: 'Certificados',
      route: '/certificates',
      active: false,
    },
    {
      icon: 'stats-chart',
      label: 'Mi Progreso',
      route: '/progress',
      active: false,
    },
    { icon: 'people', label: 'Comunidad', route: '/community', active: false },
    { icon: 'chatbubbles', label: 'Foros', route: '/forums', active: false },
    {
      icon: 'settings',
      label: 'Configuración',
      route: '/settings',
      active: false,
    },
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: Dashboard
  ) {
    addIcons({
      menu, search, notifications, chatbubbles, personCircle, chevronDown,
      eye, settings, logOut, time, trendingUp, trophy, statsChart, person,
      playCircle, home, book, calendar, documentText, school, people, cog,
      ribbon, analytics, videocam, document, clipboard, informationCircle,
      timeOutline, checkmarkCircleOutline, statsChartOutline, trophyOutline
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getUserStats().subscribe((stats) => {
      this.userStats = stats;
    });

    this.dashboardService.getMetrics().subscribe((metrics) => {
      this.metrics = metrics;
    });

    this.dashboardService.getActiveCourses().subscribe((courses) => {
      this.activeCourses = courses;
    });

    this.dashboardService.getUpcomingActivities().subscribe((activities) => {
      this.upcomingActivities = activities;
    });

    this.dashboardService.getRecommendations().subscribe((recommendations) => {
      this.recommendations = recommendations;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      class: 'videocam',
      assignment: 'document',
      exam: 'clipboard',
    };
    return icons[type] || 'information-circle';
  }

  getStatusBadgeColor(status: string): string {
    const colors: { [key: string]: string } = {
      'in-progress': 'warning',
      completed: 'success',
      pending: 'medium',
    };
    return colors[status] || 'medium';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'in-progress': 'En progreso',
      completed: 'Completado',
      pending: 'Pendiente',
    };
    return texts[status] || status;
  }
}
