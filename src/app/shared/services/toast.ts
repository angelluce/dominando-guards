import {Injectable, signal, WritableSignal} from '@angular/core';
import {ToastMessageInterface} from '../interfaces/toast-message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public messages: WritableSignal<ToastMessageInterface[]> = signal([]);
  private nextId = 0;
  private readonly TIMEOUT_MS = 5000;

  /**
   * Muestra un mensaje de toast con el tipo especificado.
   */
  private show(message: string, type: ToastMessageInterface['type']): void {
    const id = this.nextId++;
    const newToast: ToastMessageInterface = { id, message, type };

    this.messages.update((currentMessages: ToastMessageInterface[]) => [...currentMessages, newToast]);

    setTimeout(() => {
      this.dismiss(id);
    }, this.TIMEOUT_MS);
  }

  /**
   * Elimina un toast por su ID.
   */
  dismiss(id: number): void {
    this.messages.update((currentMessages: ToastMessageInterface[]) =>
      currentMessages.filter(toast => toast.id !== id)
    );
  }

  success(message: string) {
    this.show(message, 'success');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'info');
  }

}
