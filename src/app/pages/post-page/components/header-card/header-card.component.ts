import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
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
  disabled = false;
  constructor(private feedService: FeedService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.favoritesCount = this.post.favoritesCount;
    this.following = this.post.author.following;
    this.favorited = this.post.favorited;
  }
  follow() {
    this.disabled = true;
    this.dialog.open(LoaderComponent, {
      width: '250px',
      height: '150px',
    });
    this.feedService.follow(this.post.author.username)?.subscribe((resp) => {
      this.following = resp.profile.following;
    });
    this.dialog.closeAll();
    this.disabled = false;
  }
  unfollow() {
    this.disabled = true;
    this.dialog.open(LoaderComponent, {
      width: '250px',
      height: '150px',
    });
    this.feedService.unfollow(this.post.author.username)?.subscribe((resp) => {
      this.following = resp.profile.following;
    });
    this.dialog.closeAll();
    this.disabled = false;
  }

  favorite() {
    this.disabled = true;
    this.dialog.open(LoaderComponent, {
      width: '250px',
      height: '150px',
    });
    this.feedService.favorite(this.post.slug)?.subscribe((resp) => {
      this.favoritesCount = resp.article.favoritesCount;
      this.favorited = resp.article.favorited;
    });
    this.dialog.closeAll();
    this.disabled = false;
  }
  unfavorite() {
    this.disabled = true;
    this.dialog.open(LoaderComponent, {
      width: '250px',
      height: '150px',
    });
    this.feedService.unfavorite(this.post.slug)?.subscribe((resp) => {
      this.favoritesCount = resp.article.favoritesCount;
      this.favorited = resp.article.favorited;
    });
    this.dialog.closeAll();
    this.disabled = false;
  }
}
