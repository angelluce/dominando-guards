import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {UserSimpleResponseInterface} from '../../interfaces/login';
import {ComponentCanDeactivate} from '@shared/interfaces/component-can-desactive';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, ComponentCanDeactivate {
  private route = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  public profileData: UserSimpleResponseInterface | null;
  protected userForm!: FormGroup;

  constructor() {
    this.profileData = this.route.snapshot.data['profile'];
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
}
