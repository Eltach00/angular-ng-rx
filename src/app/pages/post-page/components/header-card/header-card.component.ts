import { Component, Input } from '@angular/core';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss'],
})
export class HeaderCardComponent {
  @Input() post: GlobalArticle;
}
