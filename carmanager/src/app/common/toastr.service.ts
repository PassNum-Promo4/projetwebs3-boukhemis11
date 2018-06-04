import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable()

export class ToastrService {
    success(message: string, title?: string) {
        toastr.success(message, title);
    }
    info(message: string, title?: string) {
        toastr.info(message, title);
    }
    warning(message: string, title?: string) {
        toastr.warning(message, title);
    }
    error(message: string, title?: string) {
        toastr.error(message, title);
    }
}
toastr.options = {
  'closeButton': true,
  'debug': true,
  'newestOnTop': true,
  'progressBar': false,
  'positionClass': 'toast-top-full-width',
  'preventDuplicates': true,
  'showDuration': '1000',
  'hideDuration': '1000',
  'timeOut': '1000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
};

