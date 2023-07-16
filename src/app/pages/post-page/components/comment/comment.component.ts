import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/shared/models/feeds/comment.response';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: Comment;

  deleteComment() {}
}
