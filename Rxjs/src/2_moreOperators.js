import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { defer, from, interval, zip, of, throwError, concat, merge , combineLatest, forkJoin, Observable, timer} from 'rxjs';
import { delay, map, take, filter, concatMap, mergeMap, timeInterval, switchMap } from 'rxjs/operators';

function lesson1() {
    let stringOfNumbers$ = of('one' , 'two', 'three');
    let numbers$ = of(1,2,3);
    var type = null;

    // factory to create observable
    function generateNumbers() {
        if(type === 'number') {
            return numbers$;
        } else if(type === 'string') {
            return stringOfNumbers$;
        }
        else {
            return throwError(new Error('wrong type! try either "number" or "string"'))
        }
    }



    type = 'object';
    defer(generateNumbers).subscribe({
       next: v =>  {
            printOnScreen(v)
        }, 
        error: err => printOnScreen(err.message)
        
    })
}


function lesson2 () {
    let even$ = interval(500).pipe(filter(v => v % 2 === 0 ))
    let odd$ = interval(500).pipe(filter(v => v % 2 !== 0 ))
    let interval$ = interval(500).pipe(take(5));

    // 2, 4, 6 ,1, 3, 5
    let totalList$ = concat(even$, odd$);
    // totalList$.subscribe(v => printOnScreen(v))

    let mergeList$ = merge(even$, odd$);
    // concurrency of two observables 
    mergeList$.subscribe(v => printOnScreen(v))

}

function lesson3 () {
    let number$ = of(1,3);
    let names$ = of('john', 'james', 'peter');
    let dept$ = of('sales', 'IT', 'Management');

    let interval$ = interval(100).pipe(take(9));

    // zip(number$, names$, dept$).subscribe(v => printOnScreen(v))
    // combineLatest(number$, names$, dept$).subscribe(v => printOnScreen(v))

    forkJoin(number$, names$, dept$, interval$).subscribe(v => printOnScreen(v))

}

function lesson4 () {
    // concat Map
    let names$ =  new Observable((observer) => {
        setTimeout(() => observer.next('john'), 500);
        setTimeout(() => observer.next('james'), 600);
        setTimeout(() => observer.next('peter'), 1000);
        setTimeout(() => observer.complete(), 1000);
    });
    let dept$ = new Observable((observer) => {
        setTimeout(() => observer.next('sales'), 0);
        setTimeout(() => observer.next('IT'), 0);
        setTimeout(() => observer.next('Management'), 1500);
        setTimeout(() => observer.complete(), 2000);
    });

    names$.pipe(
        concatMap(name => dept$.pipe(map(dept => name +'-'+dept)))
    ).subscribe(v => printOnScreen(v));

}
function lesson5 () {
    // merge Map
    let names$ =  new Observable((observer) => {
        setTimeout(() => observer.next('john'), 500);
        setTimeout(() => observer.next('james'), 600);
        setTimeout(() => observer.next('peter'), 1000);
        setTimeout(() => observer.complete(), 1000);
    });
    let dept$ = new Observable((observer) => {
        setTimeout(() => observer.next('sales'), 0);
        setTimeout(() => observer.next('IT'), 0);
        setTimeout(() => observer.next('Management'), 1500);
        setTimeout(() => observer.complete(), 2000);
    });

    names$.pipe(
        mergeMap(name => dept$.pipe(map(dept => name +'-'+dept)))
    ).subscribe(v => printOnScreen(v))
}

function lesson6() {
    // introducing delay in predefined list of elements.
    let items$ = of(1,2,4,5);
    zip(items$, timer(0, 1000)).pipe(
        map(arr => arr[0])
    ).subscribe(v => printOnScreen(v));
}

executeWhenReady(lesson6);
