import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/shared/models/feeds/comment.response';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: Comment;
  @Input() slug: string;
  @Output() commentDeleted = new EventEmitter<number>();
  disabled: boolean = false;

  constructor(private feedService: FeedService) {}

  deleteComment() {
    if (this.disabled) {
      return;
    }
    this.disabled = true;
    this.feedService
      .deleteComment(this.slug, this.comment.id.toString())
      .subscribe(() => {
        this.commentDeleted.emit(this.comment.id);
        this.disabled = false;
      });
  }
}
