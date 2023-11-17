import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/environments/environment';
import { Urls } from 'src/app/environments/url.enum';
import { GlobalFeedResponse } from '../../shared/models/feeds/globalFeed.response';
import { TagsResponse } from '../../shared/models/feeds/tags.response';
import { FavoriteResponse } from '../../shared/models/feeds/favorite.response';
import { ArticleResponse } from '../../shared/models/feeds/article.response';
import {
  CommentResponse,
  CommentsResponse,
} from '../../shared/models/feeds/comment.response';
import { FollowResponse } from '../../shared/models/feeds/follow.response';
import { PostDto } from '../../shared/models/post.dto';
import { CommentDto } from '../../shared/models/comment.dto';
import { RetryWhen } from '../decorators/retryWhenError';
import { cachedRequest } from '../decorators/cache-decorator';
import { CacheService } from '../decorators/cash-service';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient,
    private readonly cache: CacheService) {}

  @cachedRequest(function () { return this.cache; })
  getGlobalFeed(param?: string) {
    let params = new HttpParams().set('limit', 10).set('offset', 0);
    if (param) {
      params = params.set('tag', param);
    }
    return this.http.get<GlobalFeedResponse>(env.baseUrl + Urls.globalFeed, {
      params,
    })
  }

  getYourFeed() {
    let params = new HttpParams().set('limit', 10).set('offset', 0);
    return this.http.get<GlobalFeedResponse>(
      env.baseUrl + Urls.globalFeed + Urls.feed,
      {
        params,
      }
    );
  }

  getAccountPosts(param: string, author: boolean) {
    let params = new HttpParams()
      .set(author ? 'author' : 'favorited', param)
      .set('limit', 10)
      .set('offset', 0);

    return this.http.get<GlobalFeedResponse>(env.baseUrl + Urls.globalFeed, {
      params,
    });
  }

  postArticle(dto: PostDto) {
    return this.http.post<ArticleResponse>(env.baseUrl + Urls.globalFeed, dto);
  }

  getPost(slug: string) {
    return this.http.get<ArticleResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}`
    );
  }

  editPost(slug: string, dto: PostDto) {
    return this.http.put(env.baseUrl + Urls.globalFeed + `/${slug}`, dto);
  }

  deletePost(slug: string) {
    return this.http.delete(env.baseUrl + Urls.globalFeed + `/${slug}`);
  }

  @RetryWhen()
  tags() {
    return this.http.get<TagsResponse>(env.baseUrl + Urls.tags);
  }

  favorite(slug: string): Observable<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.favorite,
      {}
    );
  }

  unfavorite(slug: string) {
    return this.http.delete<FavoriteResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.favorite,
      {}
    );
  }

  follow(username: string) {
    return this.http.post<FollowResponse>(
      env.baseUrl + Urls.profiles + `/${username}` + Urls.follow,
      {}
    );
  }

  unfollow(username: string) {
    return this.http.delete<FollowResponse>(
      env.baseUrl + Urls.profiles + `/${username}` + Urls.follow,
      {}
    );
  }

  getComments(slug: string) {
    return this.http.get<CommentsResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.comments
    );
  }

  postComment(slug: string, dto: CommentDto) {
    return this.http.post<CommentResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.comments,
      dto
    );
  }

  deleteComment(slug: string, id: string) {
    return this.http.delete<CommentResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.comments + `/${id}`
    );
  }
}
