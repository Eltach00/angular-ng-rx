import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/shared/models/register.state';
import { User } from 'src/app/shared/models/register/succes.register.response';

@Component({
  selector: 'app-account-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderAccountComponent {
  @Input() user: AuthState;

  constructor(private router: Router) {}

  editHandler() {
    this.router.navigate(['settings']);
  }
}
