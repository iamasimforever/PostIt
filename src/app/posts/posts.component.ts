import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  newProjectName: string;
  postCards: any[];
  addingRootLevel: string;
  userSub: Subscription;
  user: any;

  constructor(public postService: PostService, public auth: AuthService) {
    this.userSub = this.auth.user$.subscribe(user => {
      this.user = user ? user : null;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  async login() {
    await this.auth.googleSignIn();
  }

  addNewPost() {
    if (!this.newProjectName || this.newProjectName.length < 2) return;

    this.postService.addPost({
      post: `${this.newProjectName}`,
      username: this.user.displayName,
      timestamp: new Date().toISOString()
    });

    this.newProjectName = null;
  }

  onProjectSelect(selection: any) {
    this.postCards = selection.map(x => x.value);
  }
}
