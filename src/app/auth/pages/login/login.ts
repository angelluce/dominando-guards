import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {ToastService} from '@shared/services/toast';
// import {LoginResponseDTO} from '../../interfaces/login';
import {UserRole} from '@auth/interfaces/user-role';

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
  // private _router = inject(Router);

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['desarrollo', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Si tienes una API elimina el parámetro de este method
   * caso contrario este se usa para cargar el contenido acorde al rol
   * */
  onSubmit(role: UserRole) {
    // if (this.loginForm.invalid) {
    //   this._toastService.warning('Los campos son requeridos');
    //   return;
    // }
    /**
     * Si tienes una API usa el method login y envía el valor del formulario,
     * caso contrario usa loginWithoutAPi
     * */
    this._authService.loginWithoutAPI(role).subscribe({
      complete: () => {
        this._toastService.success('Bienvenido a Dominando los Guards');
      }
    });
  }
}
