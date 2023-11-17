import { delay, forkJoin } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/core/services/feed.service';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';

@Component({
  selector: 'app-account-posts',
  templateUrl: './account-posts.component.html',
  styleUrls: ['./account-posts.component.scss'],
})
export class AccountPostsComponent implements OnInit {
  @Input() username: string;
  loading: boolean = true;
  posts: GlobalArticle[];
  favorited: GlobalArticle[];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    forkJoin({
      posts: this.feedService.getAccountPosts(this.username, true),
      favorited: this.feedService.getAccountPosts(this.username, false),
    })
      .pipe(delay(2000))
      .subscribe(({ posts, favorited }) => {
        this.posts = posts.articles;
        this.favorited = favorited.articles;
        this.loading = false;
      });
  }
}
