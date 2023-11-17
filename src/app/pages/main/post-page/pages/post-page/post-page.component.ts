import { LoaderService } from './../../../../../core/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, forkJoin, finalize } from 'rxjs';
import { Comment } from 'src/app/shared/models/feeds/comment.response';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/core/services/feed.service';
import { selectFeatureUsername } from 'src/app/store/submit.select';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post: GlobalArticle;
  comments: Comment[];
  loading: boolean = true;
  loggedIn: boolean = false;
  profileUrl: string;
  profuleUsername: string;
  isProfilePost: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private feedService: FeedService,
    private store: Store,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.increaseLoader();
    this.store.pipe(select(selectFeatureUsername)).subscribe((data) => {
      this.loggedIn = data.loggedIn;
      this.profileUrl = data.profileUrl;
      this.profuleUsername = data.username;
    });
    this.activateRoute.params
      .pipe(
        finalize(() => {
          this.loaderService.decreaseLoader();
          console.log(this.loaderService.isLoaderActive.value);
        }),
        switchMap((param) => {
          return forkJoin({
            post: this.feedService.getPost(param['slug']),
            comment: this.feedService.getComments(param['slug']),
          });
        })
      )
      .subscribe({
        next: ({ comment, post }) => {
          this.post = post.article;
          this.comments = comment.comments;
          this.loading = false;
          if (this.profileUrl === post.article.author.username) {
            this.isProfilePost = true;
          }
        },
      });
  }

  addNewComment(comment: Comment) {
    this.comments.push(comment);
  }

  deleteComment(deleteId: number) {
    this.comments = this.comments.filter((c) => c.id !== deleteId);
  }
}
