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
    var audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-46416/zapsplat_bell_small_ring_close_clean_shop_door_bell_008_50044.mp3?_=4');
    audio.play();
    this.newProjectName = null;
  }

  onProjectSelect(selection: any) {
    this.postCards = selection.map(x => x.value);
  }
}
