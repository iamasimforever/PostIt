import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() {
    const initialTheme = localStorage.getItem('theme') || '9';

    this.setTheme(parseInt(initialTheme));
  }

  setTheme(num: number = 9) {
    this.darkTheme$.next(num);
    localStorage.setItem('theme', `${num}`);
  }
}
