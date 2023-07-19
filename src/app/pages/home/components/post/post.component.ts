import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { ArticleFavorite } from 'src/app/shared/models/feeds/favorite.response';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';
import { selectFeatureUsername } from 'src/app/store/submit.select';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: GlobalArticle | ArticleFavorite;
  disabled = false;
  favorited: boolean;
  favoritesCount: number;
  loggedIn: boolean;

  constructor(
    private feedService: FeedService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.favoritesCount = this.post.favoritesCount;
    this.favorited = this.post.favorited;
    this.store.pipe(select(selectFeatureUsername)).subscribe((resp) => {
      this.loggedIn = resp.loggedIn;
    });
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
        ? this.feedService.unfavorite(this.post.slug)?.subscribe({
            next: (resp) => {
              this.favoritesCount = resp.article.favoritesCount;
              this.favorited = resp.article.favorited;
              this.dialog.closeAll();
              this.disabled = false;
            },
            error: () => {
              this.dialog.closeAll();
              this.disabled = false;
            },
          })
        : this.feedService.favorite(this.post.slug)?.subscribe({
            next: (resp) => {
              this.favoritesCount = resp.article.favoritesCount;
              this.favorited = resp.article.favorited;
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

  navigateToPostPage() {
    this.router.navigate(['/post/' + this.post.slug]);
  }
}
