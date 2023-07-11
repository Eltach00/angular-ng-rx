import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, forkJoin } from 'rxjs';
import { Comment } from 'src/app/shared/models/feeds/comment.response';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post: GlobalArticle;
  comments: Comment[];
  loading: boolean = true;
  constructor(
    private activateRoute: ActivatedRoute,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap((param) => {
          return forkJoin({
            post: this.feedService.getPost(param['slug']),
            comment: this.feedService.getComments(param['slug']),
          });
        })
      )
      .subscribe((data) => {
        this.post = data.post.article;
        this.comments = data.comment.comments;
        this.loading = false;
      });
  }
}
