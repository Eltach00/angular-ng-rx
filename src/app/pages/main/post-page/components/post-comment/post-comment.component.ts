import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentDto } from 'src/app/shared/models/comment.dto';
import { Comment } from 'src/app/shared/models/feeds/comment.response';
import { FeedService } from 'src/app/shared/services/feed.service';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent {
  @Input() accountImage: string;
  @Input() profileUsername: string;
  @Input() slug: string;
  @Output() newComment: EventEmitter<Comment> = new EventEmitter();
  disabled: boolean = false;
  constructor(private feedService: FeedService) {}

  postComment({ comment }: { comment: string }) {
    this.disabled = true;
    const dto = new CommentDto(comment);
    this.feedService.postComment(this.slug, dto).subscribe((resp) => {
      this.newComment.emit(resp.comment);
      this.disabled = false;
    });
  }
}
