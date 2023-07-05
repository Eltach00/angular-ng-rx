import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/environments/environment';
import { Urls } from 'src/app/environments/url.enum';
import { GlobalFeedResponse } from '../models/feeds/globalFeed.response';
import { TagsResponse } from '../models/feeds/tags.response';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}
  getGlobalFeed(param?: string) {
    const params: any = { limit: 10, offset: 0 };
    if (param) {
      params.tag = param;
    }

    return this.http.get<GlobalFeedResponse>(env.baseUrl + Urls.globalFeed, {
      params,
    });
  }
  tags() {
    return this.http.get<TagsResponse>(env.baseUrl + Urls.tags);
  }
}
