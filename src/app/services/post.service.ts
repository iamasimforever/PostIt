import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post$: Observable<any>;
  postCollectionRef: any;

  constructor(private auth: AuthService, private afStore: AngularFirestore) {
    this.post$ = this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          this.postCollectionRef = this.afStore.collection(`/posts`);
          return this.postCollectionRef.snapshotChanges();
        } else {
          this.postCollectionRef = null;
          return of(null);
        }
      }),
      map((snapshot: any | null) => {
        return snapshot ? snapshot.map(x => {
          const data = x.payload.doc.data();
          console.log(data);
          const id = x.payload.doc.id;
          return { id, ...data };
        }).sort((a,b)=>{return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf() }) : null;
      })
    )
  }

  addPost(post: any) {
    this.postCollectionRef.add(post);
  }
}
