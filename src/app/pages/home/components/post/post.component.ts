import { Component, Input, OnInit } from '@angular/core';
import { GlobalArticle } from 'src/app/shared/models/feeds/globalFeed.response';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: GlobalArticle;
  constructor() {}

  ngOnInit() {}
}
