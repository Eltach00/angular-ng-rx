import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';
import { selectFeatureUsername } from 'src/app/store/submit.select';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss'],
})
export class HeaderCardComponent implements OnInit {
  @Input() post: GlobalArticle;
  @Input() isPorfilePost: boolean;
  favoritesCount: number;
  following: boolean;
  favorited: boolean;
  disabled = false;
  loggedIn: boolean;
  constructor(
    private feedService: FeedService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favoritesCount = this.post.favoritesCount;
    this.following = this.post.author.following;
    this.favorited = this.post.favorited;
    this.store.pipe(select(selectFeatureUsername)).subscribe((resp) => {
      this.loggedIn = resp.loggedIn;
    });
  }

  follow() {
    if (!this.loggedIn) {
      this.router.navigate(['/auth/sign-in']);
    } else {
      this.disabled = true;
      this.dialog.open(LoaderComponent, {
        width: '250px',
        height: '150px',
      });
      this.following
        ? this.feedService.unfollow(this.post.author.username).subscribe({
            next: (resp) => {
              this.following = resp.profile.following;
              this.dialog.closeAll();
              this.disabled = false;
            },
            error: () => {
              this.dialog.closeAll();
              this.disabled = false;
            },
          })
        : this.feedService.follow(this.post.author.username).subscribe({
            next: (resp) => {
              this.following = resp.profile.following;
              this.dialog.closeAll();
              this.disabled = false;
            },
            error: () => {
              this.dialog.closeAll();
              this.disabled = false;
            },
          });
    }
  }

  favorite() {
    if (!this.loggedIn) {
      this.router.navigate(['/auth/sign-in']);
    } else {
      this.disabled = true;
      this.dialog.open(LoaderComponent, {
        width: '250px',
        height: '150px',
      });
      this.favorited
        ? this.feedService.unfavorite(this.post.slug)?.subscribe((resp) => {
            this.favoritesCount = resp.article.favoritesCount;
            this.favorited = resp.article.favorited;
            this.dialog.closeAll();
            this.disabled = false;
          })
        : this.feedService.favorite(this.post.slug)?.subscribe((resp) => {
            this.favoritesCount = resp.article.favoritesCount;
            this.favorited = resp.article.favorited;
            this.dialog.closeAll();
            this.disabled = false;
          });
    }
  }
}
