import {Component, HostListener, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {UserSimpleResponseInterface} from '@auth/interfaces/login';
import {ComponentCanDeactivate} from '@shared/interfaces/component-can-desactive';
import {AuthService} from '@auth/services/auth';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, ComponentCanDeactivate {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  public profileData: UserSimpleResponseInterface | null;
  protected userForm!: FormGroup;

  constructor() {
    // this.profileData = this.route.snapshot.data['profile'];
    this.profileData = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      username: [this.profileData?.username],
      nombres: [this.profileData?.nombres],
      apellidos: [this.profileData?.apellidos],
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.userForm.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Estás seguro de descartarlos?');
    }

    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.userForm.dirty) {
      $event.returnValue = true;
    }
  }
}
