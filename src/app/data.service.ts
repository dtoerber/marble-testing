import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getList$: Observable<string[]> = of(['value1', 'value2', 'value3']);

  getNumbers1$: Observable<number[]> = of([1, 2, 3]);

  getNumbers2$: Observable<number[]> = of([4, 5, 6]);

  getNumbers3$: Observable<number[]> = of([7, 8, 9]);

  getBooleans$: Observable<boolean> = of(false, false, true, false);

  getCombineLatest$ = combineLatest([this.getList$, this.getNumbers1$]);

  getWithLatestFrom$ = this.getList$.pipe(withLatestFrom(this.getNumbers2$));

  getBehaviorSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
}
