import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  globalFeeds: GlobalArticle[];
  tags: string[];
  constructor(private feedService: FeedService) {}
  loading = true;

  ngOnInit() {
    forkJoin({
      globalFeed$: this.feedService.getGlobalFeed(),
      tags$: this.feedService.tags(),
    }).subscribe(({ globalFeed$, tags$ }) => {
      this.globalFeeds = globalFeed$.articles;
      this.tags = tags$.tags;
      this.loading = false;
    });
  }

  changeTag(tag: string) {
    this.feedService.getGlobalFeed(tag).subscribe((posts) => {
      this.globalFeeds = posts.articles;
    });
  }
}
