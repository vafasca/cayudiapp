import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  specialty?: string;
  institution?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private rememberSession = false;

  // mockUsers mantiene la contraseña solo para pruebas locales
  private mockUsers: Array<
    User & { password: string }
  > = [
    {
      id: '1',
      email: 'estudiante@cayudi.com',
      password: 'estudiante123',
      name: 'Dr. Juan Pérez',
      role: 'student',
      specialty: 'Médico Cirujano',
      institution: 'Hospital General, Ciudad de México'
    },
    {
      id: '2',
      email: 'instructor@cayudi.com',
      password: 'instructor123',
      name: 'Dra. María Rodríguez',
      role: 'instructor',
      specialty: 'Radiología',
      institution: 'Instituto Nacional de Salud'
    },
    {
      id: '3',
      email: 'admin@cayudi.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin'
    }
  ];

  constructor() {
    const stored = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      stored ? JSON.parse(stored) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /** Getter rápido del usuario actual */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * login síncrono (mantengo para compatibilidad con tu código actual).
   * Retorna { success, message } para manejar en el componente exactamente como lo hacías.
   */
  login(email: string, password: string, remember: boolean): { success: boolean; message?: string } {
    const found = this.mockUsers.find(u => u.email === email && u.password === password);

    if (found) {
      // renombramos la contraseña para evitar redeclaración con el parámetro `password`
      const { password: _pwd, ...userWithoutPassword } = found;
      this.rememberSession = remember;

      if (remember) {
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      } else {
        localStorage.removeItem('currentUser');
      }

      this.currentUserSubject.next(userWithoutPassword);
      return { success: true };
    }

    return { success: false, message: 'Credenciales incorrectas' };
  }

  /**
   * login asíncrono (Promise) — útil en llamadas reales a APIs o si prefieres async/await.
   * Simula latencia y devuelve la misma estructura de respuesta.
   */
  async loginAsync(email: string, password: string, remember: boolean, simulateDelayMs = 600)
    : Promise<{ success: boolean; message?: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const res = this.login(email, password, remember);
        resolve(res);
      }, simulateDelayMs);
    });
  }

  /** Versión observable si prefieres RXJS */
  loginObservable(email: string, password: string, remember: boolean): Observable<{ success: boolean; message?: string }> {
    const res = this.login(email, password, remember);
    return of(res);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(email: string): { success: boolean; message: string } {
    const user = this.mockUsers.find(u => u.email === email);

    if (user) {
      // Aquí podrías integrar un servicio real de envío de emails
      return {
        success: true,
        message: 'Se ha enviado un enlace de recuperación a tu correo electrónico'
      };
    }

    return {
      success: false,
      message: 'No se encontró una cuenta con ese correo electrónico'
    };
  }

  /** Para comprobar autenticación rápidamente */
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  /** Actualiza localmente el perfil (no persiste en mockUsers) */
  updateProfile(data: Partial<User>) {
    const current = this.currentUserValue;
    if (!current) return;
    const updated = { ...current, ...data };
    this.currentUserSubject.next(updated);
    if (this.rememberSession) {
      localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  }
}
