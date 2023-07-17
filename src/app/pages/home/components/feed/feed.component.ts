import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';
import { FeedService } from 'src/app/shared/services/feed.service';

interface tabs {
  feed: GlobalArticle[];
  label: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  tags: string[];
  globalFeeds: GlobalArticle[];
  feed: GlobalArticle[];
  loading = true;
  tabs: tabs[] = [];
  selectedIndex: number = 0;
  constructor(
    private feedService: FeedService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    forkJoin({
      feed$: this.authservice.isAuthenficated()
        ? this.feedService.getYourFeed()
        : of(null),
      globalFeed$: this.feedService.getGlobalFeed(),
      tags$: this.feedService.tags(),
    }).subscribe(({ globalFeed$, tags$, feed$ }) => {
      this.globalFeeds = globalFeed$.articles;
      this.tags = tags$.tags;
      this.feed = feed$ ? feed$.articles : null;
      this.feed && this.tabs.push({ feed: this.feed, label: 'Your Feed' });
      this.tabs.push({ feed: this.globalFeeds, label: 'Global Feed' });
      this.loading = false;
    });
  }

  changeTag(tag: string) {
    if (tag) {
      this.feedService.getGlobalFeed(tag).subscribe((posts) => {
        if (this.tabs.length > 2) {
          this.tabs.pop();
        }
        this.selectedIndex = this.tabs.push({
          feed: posts.articles,
          label: tag,
        });
      });
    } else {
      this.tabs.pop();
      this.selectedIndex -= 1;
    }
  }
}
