import { Component, Input, OnInit } from '@angular/core';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss'],
})
export class HeaderCardComponent implements OnInit {
  @Input() post: GlobalArticle;
  favoritesCount: number;
  following: boolean;
  favorited: boolean;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.favoritesCount = this.post.favoritesCount;
    this.following = this.post.author.following;
    this.favorited = this.post.favorited;
  }
  follow() {
    this.feedService.follow(this.post.author.username)?.subscribe((resp) => {
      this.following = resp.profile.following;
    });
  }
  unfollow() {
    this.feedService.unfollow(this.post.author.username)?.subscribe((resp) => {
      this.following = resp.profile.following;
    });
  }

  favorite() {
    this.feedService.favorite(this.post.slug)?.subscribe((resp) => {
      this.favoritesCount = resp.article.favoritesCount;
      this.favorited = resp.article.favorited;
    });
  }
  unfavorite() {
    this.feedService.unfavorite(this.post.slug)?.subscribe((resp) => {
      this.favoritesCount = resp.article.favoritesCount;
      this.favorited = resp.article.favorited;
    });
  }
}
