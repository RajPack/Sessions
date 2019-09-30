import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { Observable, of, interval } from 'rxjs';
import { take } from 'rxjs/operators';


function lesson1() {
    let myObservable = new Observable((observer) => {
        observer.next('Hello there...');
        observer.next('Welcome to lesson 1 of Rxjs');
    });

    let myObservableSubscription = myObservable.subscribe(data => printOnScreen(data));
    myObservableSubscription.unsubscribe();

    interval(1000).pipe(
        take(5)
    ).subscribe(d => printOnScreen(d))
}




executeWhenReady(lesson1);
