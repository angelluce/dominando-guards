import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestsCount = signal(0);
  public readonly isLoading = computed(() => this.requestsCount() > 0);

  show(): void {
    this.requestsCount.update(count => count + 1);
  }

  hide(): void {
    this.requestsCount.update(count => {
      let newCount = count - 1;
      if (newCount < 0) {
        newCount = 0;
      }
      return newCount;
    });
  }
}
