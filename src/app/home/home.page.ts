import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth-service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: 
  [CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ],
})
export class HomePage {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor ingrese un correo electrónico válido';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.login(this.email, this.password, this.rememberMe);

      if (result?.success) {
        const user = this.authService.currentUserValue;
        if (user?.role === 'student') {
          this.router.navigate(['/dashboard']);
        } else if (user?.role === 'instructor') {
          this.router.navigate(['/instructor-dashboard']);
        } else if (user?.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.errorMessage = result?.message || 'Error al iniciar sesión';
      }

      this.isLoading = false;
    }, 700);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToRecovery(): void {
    this.router.navigate(['/recovery']);
  }
}
