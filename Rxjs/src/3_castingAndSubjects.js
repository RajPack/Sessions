
import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { interval, Subject } from 'rxjs';
import { multicast, take, refCount, share, publish } from 'rxjs/operators';

function lesson1() {
    const aSub = new Subject();
    const interval$ = interval(100).pipe(take(30));
    const multicasted$ = interval$.pipe(multicast(aSub), refCount());
    multicasted$.subscribe(v => printOnScreen('first sub: ' + v));

    setTimeout(() => {
        multicasted$.subscribe(v => printOnScreen('second sub: ' + v));
    },2000)

}

function lesson2 () {
    const interval$ = interval(100).pipe(take(30));
    const shared$ = interval$.pipe(share());
    shared$.subscribe(v => printOnScreen('first sub: ' + v));

    setTimeout(() => {
        shared$.subscribe(v => printOnScreen('second sub: ' + v));
    },2000)
}

function lesson3 () {
    const interval$ = interval(100).pipe(take(30));
    const published$ = interval$.pipe(publish());
    published$.connect()
    published$.subscribe(v => printOnScreen('first sub: ' + v));

    setTimeout(() => {
        published$.subscribe(v => printOnScreen('second sub: ' + v));
    },2000)
}

executeWhenReady();
