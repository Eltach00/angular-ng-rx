import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { autoSave, autoSaveClear } from 'src/app/shared/decorators/auto-save';
import { PostDto } from 'src/app/shared/models/post.dto';
import { FeedService } from 'src/app/shared/services/feed.service';

const key = 'saveForm'


@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss'],
})
export class NewPostPageComponent implements OnInit {

  @autoSave(key)
  postForm: FormGroup;

  isEdit = false;
  slug: string;

  constructor(
    private fb: FormBuilder,
    private feedService: FeedService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.slug = this.activateRoute.snapshot.params['slug'];
    if (this.slug) {
      this.isEdit = true;
      this.feedService.getPost(this.slug).subscribe(({ article }) => {
        this.postForm.patchValue({
          title: article.title,
          desc: article.description,
          body: article.body,
          tags: article.tagList.join(','),
        });
      });
    }
  }

  buildForm() {
    this.postForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      desc: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
      tags: this.fb.control('', Validators.required),
    });
  }

  onSubmit() {
    const dto = new PostDto(this.postForm.value);
    if (this.isEdit) {
      this.feedService.editPost(this.slug, dto).subscribe(() => {
        this.router.navigate(['post/' + this.slug]);
      });
    } else {
      this.feedService.postArticle(dto).subscribe(({ article }) => {

        autoSaveClear(key)
        this.router.navigate(['post/' + article.slug]);
      });
    }
  }
}
