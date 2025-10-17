import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {ToastService} from '@shared/services/toast';
import {LoginResponseDTO} from '../../interfaces/login';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  protected loginForm!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  private _toastService = inject(ToastService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this._toastService.warning('Los campos son requeridos');
      return;
    }
    this._authService.login(this.loginForm.value).subscribe({
      next: (response: LoginResponseDTO) => {
        this._authService.storeTokens(response);
        this._router.navigate(['/app/perfil']).catch();
      },
      error: () => {
        this._toastService.warning('Ocurrió un error, intenta más tarde');
      },
      complete: () => {
        this._toastService.success('Bienvenido a Dominando los Guards');
      }
    });
  }
}
