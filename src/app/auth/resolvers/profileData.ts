import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth';
import {UserSimpleResponseInterface} from '../interfaces/login';

export const profileDataResolver: ResolveFn<UserSimpleResponseInterface | null> = (route, state) => {
  const authService = inject(AuthService);

  return authService.currentUser();
};
