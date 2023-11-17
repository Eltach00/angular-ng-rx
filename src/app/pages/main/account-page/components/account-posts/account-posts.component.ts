import { LoaderService } from './../../../../../core/services/loader.service';
import { delay, finalize, forkJoin } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/core/services/feed.service';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';

@Component({
  selector: 'app-account-posts',
  templateUrl: './account-posts.component.html',
  styleUrls: ['./account-posts.component.scss'],
})
export class AccountPostsComponent {
  @Input() set user(value: string) {
    if (value) {
      this.username = value;
      this.getPosts();
    }
  }
  username: string
  loading: boolean = true;
  posts: GlobalArticle[];
  favorited: GlobalArticle[];

  constructor(
    private feedService: FeedService,
    private loaderService: LoaderService
  ) {}

  getPosts(): void {
    this.loaderService.increaseLoader();
    forkJoin({
      posts: this.feedService.getAccountPosts(this.username, true),
      favorited: this.feedService.getAccountPosts(this.username, false),
    })
      .pipe(
        finalize(() => {
          this.loaderService.decreaseLoader();
        })
      )
      .subscribe(({ posts, favorited }) => {
        this.posts = posts.articles;
        this.favorited = favorited.articles;
        this.loading = false;
      });
  }
}
