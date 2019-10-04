
import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { interval, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { multicast, take, refCount, share, publish } from 'rxjs/operators';

function lesson1() {
    const mySubject = new Subject();
    const interval$ = interval(100).pipe(take(30));
    const multicast$ = interval$.pipe(multicast(mySubject), refCount());

    multicast$.subscribe(v => printOnScreen('first sub: ' + v  ));
    // setTimeout(() => {
    //     multicast$.connect();
    // }, 1000);

    setTimeout(() => {
        multicast$.subscribe(v => printOnScreen('second sub: '+v));
    }, 2000);

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
    const published$ = interval$.pipe(publish(), refCount());
    // published$.connect()
    published$.subscribe(v => printOnScreen('first sub: ' + v));

    setTimeout(() => {
        published$.subscribe(v => printOnScreen('second sub: ' + v));
    },2000)
}


function lesson4 () {
    const subject$ = new Subject();
    setTimeout(() => {subject$.next(1);}, 500);
    setTimeout(() => {subject$.next(2);}, 1000);
    setTimeout(() => {subject$.next(3);}, 1500);
    setTimeout(() => {subject$.next(4);}, 2000);
    setTimeout(() => {subject$.next(5);}, 3100);
    setTimeout(() => {subject$.next(6);}, 4000);
    
    setTimeout(() => {
        subject$.subscribe({
            next: (v) => printOnScreen('observer 1: ' + v)
        })
    }, 1200);

    setTimeout(() => {
        subject$.subscribe({
            next: (v) => printOnScreen('observer 2: ' + v)
        })
    }, 3000);
}

function lesson5() {
    // Subject - BehaviorSubject, ReplaySubject, AsyncSubject
    const behavior$ = new BehaviorSubject(0);
    setTimeout(() => {behavior$.next(1);}, 800);
    setTimeout(() => {behavior$.next(2);}, 1500);

    setTimeout(() => {
        behavior$.subscribe({
            next: (v) => printOnScreen('observer 1: ' + v)
        })
    }, 500);

    setTimeout(() => {
        behavior$.subscribe({
            next: (v) => printOnScreen('observer 2: ' + v)
        })
    }, 1000);
}

function lesson6() {
    // Subject - BehaviorSubject, ReplaySubject, AsyncSubject
    const replay$ = new ReplaySubject(1);
    setTimeout(() => {replay$.next(1);}, 800);
    setTimeout(() => {replay$.next(2);}, 1500);
    setTimeout(() => {replay$.next(3);}, 2500);
    setTimeout(() => {replay$.next(4);}, 3500);
    setTimeout(() => {replay$.next(5);}, 4500);

    setTimeout(() => {
        replay$.subscribe({
            next: (v) => printOnScreen('observer 1: ' + v)
        })
    }, 500);

    setTimeout(() => {
        replay$.subscribe({
            next: (v) => printOnScreen('observer 2: ' + v)
        })
    }, 4000);
}


function lesson7 () {
    const async$ = new AsyncSubject();
    setTimeout(() => {async$.next(1);}, 800);
    setTimeout(() => {async$.next(2);}, 1500);
    setTimeout(() => {async$.next(3);}, 2500);
    setTimeout(() => {async$.next(4);}, 3500);
    setTimeout(() => {async$.next(5);}, 4500);
    setTimeout(() => {async$.complete();}, 4600);

    setTimeout(() => {
        async$.subscribe({
            next: (v) => printOnScreen('observer 1: ' + v)
        })
    }, 500);
}

executeWhenReady(lesson7);
