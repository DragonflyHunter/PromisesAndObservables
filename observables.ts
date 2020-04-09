import { Observable, of, Subject, from, ConnectableObservable, fromEvent } from 'rxjs';
import  {filter, map, reduce, multicast, tap, take }  from 'rxjs/operators';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Basic case of observer/subscribe
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let o = new Observable<number>(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.next(4);
//     console.log("test");
// });
// o.subscribe(d => console.log(d));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Next, Error, and Completed events
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let o = new Observable<number>(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.next(4);
//     setTimeout(() => observer.complete(), 2000);    
// });
// let subscription = o.subscribe(
//     next => console.log("Next: " + next),
//     error => console.log("Error: " + error),
//     () => console.log("Done")
// );
// console.log("after subscribe");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Let's pretend like this is an HTTP call.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// interface IUser {
//     fname: string;
//     lname: string;
// }
// let http = {
//     get: (url: string): Observable<IUser> => 
//         new Observable<IUser>(observer => {
//             setTimeout( 
//                 () => { 
//                     observer.next({ fname: "Sean", lname: "Butler" } as IUser );
//                     observer.complete();
//                 }, 
//                 1000
//             );
//         })
// };
// let subscription = http.get('/user').subscribe(
//     (response: IUser) => {
//         console.log(`Response: ${response.fname} ${response.lname}`);
//     },
// );
// console.log("after subscribe");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Operator functions (filter, map, reduce)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let obs = of(1,2,3,4,5);
// let f = filter((n: number) => n % 2 === 0);
// f(obs).subscribe(n => console.log(n));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Piping to change/filter output of an observable
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
of(1,2,3,4,5)
    .pipe(
        filter(n => n % 2 === 0),           // only even numbers
        map(n => n * n),                    // square
        reduce((result, n) => result + n)   // sum
    )
    .subscribe(x => console.log(x));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Do all subscribers receive the same events?
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let i = 0;
// let o = new Observable<string>(observer => {
//     observer.next("Event " + ++i);
//     observer.next("Event " + ++i);
//     observer.complete();
// });

// o.subscribe(data => console.log("subscriber A received: " + data), null, () => console.log("A completed."));
// o.subscribe(data => console.log("subscriber B received: " + data), null, () => console.log("B completed."));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicasting with Subject!!
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let i = 0;
// let subj = new Subject<string>();

// subj.subscribe({
//     next: data => console.log("subscriber A received: " + data), 
//     complete: () => console.log("A completed.")
// });
// subj.subscribe({
//     next: data => console.log("subscriber B received: " + data), 
//     complete: () => console.log("B completed.")
// });
// subj.next("Event " + ++i);
// subj.next("Event " + ++i);
// subj.complete();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicasting from a regular Observable
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const source = from([1, 2, 3]);
// const subject = new Subject();
// const multicasted = source.pipe(multicast(subject)) as ConnectableObservable<number>;
 
// // These are, under the hood, `subject.subscribe({...})`:
// multicasted.subscribe({
//   next: (v) => console.log(`observerA: ${v}`)
// });
// multicasted.subscribe({
//   next: (v) => console.log(`observerB: ${v}`)
// });
 
// // This is, under the hood, `source.subscribe(subject)`:
// multicasted.connect();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tap operator does not change output!
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// of(1,2,3,4,5)
//     .pipe(
//         tap(x => {x = x+5; console.log(`tap: ${x}`)})
//     )
//     .subscribe(n => console.log(n));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Changing to Promise!
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// of(1,2,3,4,5)
//     .toPromise()
//     .then(d => console.log(d));