import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return getList$ default values', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      const expected = '(a|)';
      const expectResult = { a: ['value1', 'value2', 'value3'] };
      expectObservable(service.getList$).toBe(expected, expectResult);
    });
  });

  it('should return the getCombineLastest$ default values', () => {
    testScheduler.run(({ expectObservable }) => {
      const expected = '(a|)';
      const expectedResult = {
        a: [
          ['value1', 'value2', 'value3'],
          [1, 2, 3],
        ],
      };
      expectObservable(service.getCombineLatest$).toBe(
        expected,
        expectedResult
      );
    });
  });

  it('should return the getWithLatestFrom$ default values', () => {
    testScheduler.run(({ expectObservable }) => {
      const expected = '(d|)';
      const expectedResult = {
        d: [
          ['value1', 'value2', 'value3'],
          [4, 5, 6],
        ],
      };
      expectObservable(service.getWithLatestFrom$).toBe(
        expected,
        expectedResult
      );
    });
  });

  // This test runs synchronously.
  it('generates the stream correctly', () => {
    testScheduler.run((helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold(' -a--b--c---|');
      const e1subs = ' ^----------!';
      const t = time(' ---|        '); // t = 3
      const expected = ' -a-----c---|';

      expectObservable(e1.pipe(throttleTime(t))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('should return the getBehaviorSubject$ default value', () => {
    testScheduler.run(({ expectObservable }) => {
      const replaySubject$ = new ReplaySubject<boolean>();
      service.getBehaviorSubject$.subscribe(replaySubject$);

      const expected = '(a)';
      const expectedResult = {
        a: true,
      };
      expectObservable(replaySubject$).toBe(expected, expectedResult);
    });
  });
});
