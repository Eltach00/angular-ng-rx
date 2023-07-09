import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/environments/environment';
import { Urls } from 'src/app/environments/url.enum';
import { GlobalFeedResponse } from '../models/feeds/globalFeed.response';
import { TagsResponse } from '../models/feeds/tags.response';
import { FavoriteResponse } from '../models/feeds/favorite.response';
import { ArticleResponse } from '../models/feeds/article.response';
import { CommentResponse } from '../models/feeds/comment.response';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}
  getGlobalFeed(param?: string) {
    let params = new HttpParams().set('limit', 10).set('offset', 0);
    if (param) {
      params = params.set('tag', param);
    }
    return this.http.get<GlobalFeedResponse>(env.baseUrl + Urls.globalFeed, {
      params,
    });
  }

  tags() {
    return this.http.get<TagsResponse>(env.baseUrl + Urls.tags);
  }

  favorite(slug: string) {
    return this.http.post<FavoriteResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.favorite,
      {}
    );
  }

  getPost(slug: string) {
    return this.http.get<ArticleResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}`
    );
  }

  getComments(slug: string) {
    return this.http.get<CommentResponse>(
      env.baseUrl + Urls.globalFeed + `/${slug}` + Urls.comments
    );
  }
}
