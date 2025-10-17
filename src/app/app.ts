import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from '@shared/components/toast/toast';
import {Header} from '@shared/components/header/header';
import {Footer} from '@shared/components/footer/footer';
import {LoadingService} from '@shared/services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _loadingService = inject(LoadingService);
  isLoading = this._loadingService.isLoading;
}
