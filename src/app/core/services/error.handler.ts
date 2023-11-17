import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarComponent } from '../../shared/mat-snack-bar/mat-snack-bar.component';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private dialog: MatSnackBar, private zone: NgZone) { }

  handleError(error: any): void {
    console.error(error);

    this.zone.run(() => {
      this.dialog.openFromComponent(MatSnackBarComponent, {
        data: {
          message: error.message,
        },
        verticalPosition: 'top',
        duration: 3000,
      });
    })

  }

}
