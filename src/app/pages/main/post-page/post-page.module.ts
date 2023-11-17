import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { CommentComponent } from './components/comment/comment.component';
import { HeaderCardComponent } from './components/header-card/header-card.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { materialModules } from 'src/app/shared/material-modules/material.modules';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostPageComponent,
    CommentComponent,
    HeaderCardComponent,
    PostCommentComponent,
  ],
  imports: [CommonModule, PostPageRoutingModule, ...materialModules, FormsModule],
})
export class PostPageModule {}
