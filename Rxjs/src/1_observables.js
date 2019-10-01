import { printOnScreen, clearScreen, executeWhenReady } from './utils';
import { Observable, of, interval, fromEvent, from } from 'rxjs';
import { take, switchMap, tap, scan, map, filter, debounceTime, delay } from 'rxjs/operators';


function lesson1() {
    // create a basic observable
    let myObservable = new Observable((observer) => {
        observer.next('Hello there...');
        observer.next('Welcome to lesson 1 of Rxjs');
        setTimeout(() => {
            observer.next("third message"); 
            observer.complete();
        },1000);
    });
    // method in the arg - subscription method


    let myObservableSubscription = myObservable.subscribe({
        next: (d) => printOnScreen('1st observer: ' +d),
        complete: () => printOnScreen('1st observer finished listening to producer')
    });
    // myObservableSubscription.unsubscribe();

    myObservable.subscribe(d => printOnScreen('second Observer gets this: ' + d));


}

function lesson2 () {
    let numbers$ = from([1,2,4,1,2,3]);
    numbers$.subscribe({
        // next: (val) => printOnScreen(val)
    });

    let interval$ = interval(1000).pipe( // outer most observable
        take(5), // interval observable ->> take observable
        map(val => val * val) // take observable ->> final observable
    );
    interval$.subscribe({
        next: (val) => printOnScreen(val)
    });
}

function lesson3 () {
    let numbers$ = from([1,2,4,1,2,3]);

    let click$ =fromEvent(document, 'click').pipe(
        scan((acc, e) => acc + 1, 0 ),
        filter(count => count % 2 !== 0),
        switchMap(count => numbers$), // high order observables
        map(count => 'You have clicked on the screen ' + count + ' times!')
    );

    click$.subscribe({
        next: message => printOnScreen(message)
    });
}

function lesson4 () {
    let elem = document.querySelector('#text');

    let userKeyValue$ = fromEvent(elem, 'input').pipe(
        map(e => e.target.value),
        debounceTime(500),
        tap(val => printOnScreen('Fetching matching records for key: ' + val)),
        delay(3000),
        map(val => 'Backend fetched records for : ' + val)
    );

    userKeyValue$.subscribe({
        next: (val) => printOnScreen(val)
    })
}




executeWhenReady(lesson4);
