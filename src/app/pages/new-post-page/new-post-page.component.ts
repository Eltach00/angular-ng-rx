import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostDto } from 'src/app/shared/models/post.dto';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss'],
})
export class NewPostPageComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedService: FeedService,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.postForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      about: this.fb.control('', Validators.required),
      post: this.fb.control('', Validators.required),
      tags: this.fb.control('', Validators.required),
    });
  }

  onSubmit() {
    const dto = new PostDto(this.postForm.value);

    this.feedService.postArticle(dto).subscribe(({ article }) => {
      this.router.navigate([`/post/${article.slug}`]);
    });
  }
}
