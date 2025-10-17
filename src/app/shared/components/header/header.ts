import {Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {filter} from 'rxjs';
import {AuthService} from '@auth/services/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIcon
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private readonly router = inject(Router);
  public authService = inject(AuthService);
  public sidebarOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidebarOpen()) {
          this.sidebarOpen.set(false);
        }
      });
  }

  onLogout(): void {
    this.authService.forceLogout();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

}
