import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  test = [
    { id: '1', text: 'test1' },
    { id: '2', text: 'test12' },
  ];
}
