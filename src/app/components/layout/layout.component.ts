import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonIcon, IonFabButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import {
  grid,
  school,
  calendar,
  documentText,
  statsChart,
  trophy,
  settings,
  helpCircle,
  chevronDown,
  personCircle,
  menu,
  notifications,
  chatbubbles,
  eye,
  logOut,
  search,
  videocam,
  clipboard,
  pulseOutline,
  readerOutline, checkmark, close, expand, download, arrowForward, list, create, cube } from 'ionicons/icons';


@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [IonFabButton, IonButton, IonIcon, CommonModule, RouterModule]
})
export class LayoutComponent  implements OnInit {
sidebarOpen = false;
  showUserMenu = false;
  isMobile = false;

  // Datos de usuario (simulados) - Inicializados para evitar null/undefined
  user = {
    name: 'Carlos Rodríguez',
    email: 'carlos@email.com'
  };

  // Menú de navegación
  menuItems = [
    { icon: 'grid', label: 'Dashboard', route: '/dashboard', active: true },
    { icon: 'school', label: 'Mis Cursos', route: '/cursos' },
    { icon: 'videocam', label: 'Mi Progreso', route: '/progreso' },
    { icon: 'reader-outline', label: 'Certificado', route: '/certificado' },
    { icon: 'calendar', label: 'Calendario', route: '/calendario' },
    // { icon: 'document-text', label: 'Materiales', route: '/materiales' },
    // { icon: 'stats-chart', label: 'Estadísticas', route: '/estadisticas' },
    // { icon: 'trophy', label: 'Logros', route: '/logros' },
    { icon: 'settings', label: 'Configuración', route: '/configuracion' },
    { icon: 'help-circle', label: 'Ayuda', route: '/ayuda' }
  ];

  constructor() {
  addIcons({checkmark,chevronDown,close,expand,download,arrowForward,list,create,cube,grid,school,calendar,documentText,statsChart,trophy,settings,helpCircle,personCircle,menu,notifications,chatbubbles,eye,logOut,search,videocam,clipboard,pulseOutline,readerOutline});
}


  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 1200;
    if (!this.isMobile) {
      this.sidebarOpen = true;
    } else {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
    this.showUserMenu = false;
  }
}
