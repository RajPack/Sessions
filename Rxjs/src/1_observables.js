import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { Observable, of, interval, fromEvent, from } from 'rxjs';
import { take, switchMap, tap, scan } from 'rxjs/operators';


function lesson1() {
    let myObservable = new Observable((observer) => {
        observer.next('Hello there...');
        observer.next('Welcome to lesson 1 of Rxjs');
    });


    let myObservableSubscription = myObservable.subscribe(data => printOnScreen(data));
    myObservableSubscription.unsubscribe();

    from([1,2,3]).subscribe(v => printOnScreen(v))

    interval(1000).pipe(
        take(5)
    ).subscribe(d => printOnScreen(d + 4))

    fromEvent(document, 'click').pipe(
        scan((a, e) => a + 1 , 0),
        switchMap(count => of('You have clicked on the page ' + count + ' times.')),
    ).subscribe(v => printOnScreen(v))
}




executeWhenReady(lesson1);
