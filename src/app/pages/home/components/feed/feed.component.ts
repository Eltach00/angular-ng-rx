import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, of, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AutoUnsubscribe } from 'src/app/shared/decorators/unsubscribe';
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
    this.getHttp().subscribe(({ globalFeed$, tags$, feed$ }) => {
      this.globalFeeds = globalFeed$.articles;
      this.tags = tags$.tags;
      this.feed = feed$ ? feed$.articles : null;
      this.feed && this.tabs.push({ feed: this.feed, label: 'Your Feed' });
      this.tabs.push({ feed: this.globalFeeds, label: 'Global Feed' });
      this.loading = false;
    });
  }

  trackByfn(index: number, item: any) {
    return index;
  }

  @AutoUnsubscribe()
  getHttp() {
   return forkJoin({
      feed$: this.authservice.isAuthenficated()
        ? this.feedService.getYourFeed()
        : of(null),
      globalFeed$: this.feedService.getGlobalFeed(),
      tags$: this.feedService.tags(),
    })
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
