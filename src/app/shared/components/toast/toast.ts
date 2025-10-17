import {Component, inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {ToastService} from '../../services/toast';
import {ToastMessageInterface} from '../../interfaces/toast-message';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass,
    NgIcon
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {
  public toastService = inject(ToastService);

  public typeClasses = {
    success: {
      bg: 'bg-green-100',
      icon: 'heroCheckCircleSolid',
      text: 'text-gray-800'
    },
    warning: {
      bg: 'bg-yellow-100',
      icon: 'heroExclamationTriangleSolid',
      text: 'text-gray-800'
    },
    info: {
      bg: 'bg-blue-100',
      icon: 'heroInformationCircleSolid',
      text: 'text-gray-800'
    }
  };

  getClasses(toast: ToastMessageInterface) {
    return this.typeClasses[toast.type];
  }

}
