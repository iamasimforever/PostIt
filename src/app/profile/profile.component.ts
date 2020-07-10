import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  userSub: Subscription;
  user: any;
  constructor(public postService: PostService, public auth: AuthService) {
    this.userSub = this.auth.user$.subscribe(user => {
      this.user = user ? user : null;
    });
  }

  ngOnInit() {
  }

}
