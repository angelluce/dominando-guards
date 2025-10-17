import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {StorageService} from '@shared/services/storage';
import {LoginRequestDTO, LoginResponseDTO, MenuItemInterface, UserSimpleResponseInterface} from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private router = inject(Router);
  private _storageService = inject(StorageService);

  private readonly _currentUserSignal = signal<UserSimpleResponseInterface | null>(this.getStoredUserData());

  public readonly isLoggedIn = computed(() => !!this._currentUserSignal());
  public readonly menuItems: WritableSignal<MenuItemInterface[]> = signal<MenuItemInterface[]>(this.getStoredMenuData());


  public readonly currentUserRole = computed(() => {
    const userRole = this._storageService.getItem('user_role');
    return userRole ? userRole : null;
  });

  public readonly currentUser = this._currentUserSignal.asReadonly();

  // --- Métodos de autenticación ---

  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/api/v1/auth/login`, credentials).pipe(
      tap(response => {
        this.storeTokens(response);
        this._currentUserSignal.set(response.user);
        this.menuItems.set(response.menu);
      })
    );
  }

  // --- Métodos de Cierre de Sesión y Almacenamiento ---

  private clearSessionData(): void {
    this._storageService.removeItem('access_token');
    this._storageService.removeItem('refresh_token');
    this._storageService.removeItem('user_role');
    this._storageService.removeItem('user_data');
    this._storageService.removeItem('user_menu');

    this._currentUserSignal.set(null);
    this.menuItems.set([]);
  }

  forceLogout(): void {
    this.router.navigate(['']).catch();
    this.clearSessionData();
  }

  storeTokens(tokens: LoginResponseDTO): void {
    if (tokens.accessToken && tokens.refreshToken) {
      this._storageService.setItem('access_token', tokens.accessToken);
      this._storageService.setItem('refresh_token', tokens.refreshToken);
    }

    if (tokens.role) {
      this._storageService.setItem('user_role', tokens.role);
    }

    if (tokens.user) {
      this._storageService.setItemJSON('user_data', tokens.user);
    }

    if (tokens.menu) {
      this._storageService.setItemJSON('user_menu', tokens.menu);
    }
  }

  // --- Métodos de Obtención de Datos de Almacenamiento ---

  private getStoredUserData(): UserSimpleResponseInterface | null {
    const userData = this._storageService.getItemJSON('user_data');
    if (userData && typeof userData === 'object' && 'username' in userData) {
      return userData as UserSimpleResponseInterface;
    }
    return null;
  }

  private getStoredMenuData(): MenuItemInterface[] {
    const menuData = this._storageService.getItemJSON('user_menu');
    if (Array.isArray(menuData)) {
      return menuData as MenuItemInterface[];
    }
    return [];
  }
}
