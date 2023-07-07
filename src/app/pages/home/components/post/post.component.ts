import { Component, Input } from '@angular/core';
import {
  Article,
  FavoriteResponse,
} from 'src/app/shared/models/feeds/favorite.response';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: GlobalArticle | Article;
  constructor(private feedService: FeedService) {}
  like() {
    this.feedService
      .favorite(this.post.slug)
      .subscribe((resp: FavoriteResponse) => {
        this.post = resp.article;
      });
  }
}
