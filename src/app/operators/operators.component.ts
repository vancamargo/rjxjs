import { InteractivityChecker } from '@angular/cdk/a11y';
import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { pipe, Subject, Subscription } from 'rxjs';
import { interval, Observable } from 'rxjs';
import { from, fromEvent } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;
  searchInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  mapClick(){
    from([1,2,3,4,5,6,7])
    .pipe(
      map(i=> 2*i),
      map(i=>i*10)
    )
    .subscribe(i => console.log(i))

  }

  filterClick(){
    from([1,2,3,4,5,6,7])
    .pipe(
      filter((i) =>i%2==1)
    )
    .subscribe(i => console.log(i))
    
    interval(1000)
    .pipe(
      filter(i =>i%2 ==0),
      map(i=>"Value " + i),
      delay(1000)
    )
  }

  tap(){
    
    interval(100)
    .pipe(
      tap(i => console.log('')),
      tap(i => console.log('Before filterimg', i)),
      filter(c=>c %2===0 ),
      map(i => console.log('Afther filtering', i)),
      tap(i => console.log('Afther map', i)),
      delay(1000)
    ).subscribe(i =>console.log(i));
  }

  takeClick(){
    const observable = new Observable((observer)=>{
      let i;
      for(i =0; i<20;i++)
        setTimeout(() => 
          observer.next(Math.floor(Math.random() * 100))
        , i*100);
        setTimeout(()=>
          observer.complete()
        , i*100);
      
    });
    const s: Subscription = observable
      .pipe(
        tap(i =>console.log(i)),
        
        take(20),
        //first()
        last()
      ).subscribe(v=>{
        console.log('Output ', v)
      }, 
      (error)=>console.log(error),
      () => console.log('Complete'),
      
      );
      const interval = setInterval(()=>{
        if(s.closed){
          console.log('Subscription Closed');
          clearInterval(interval);
        }
      },200)
  }

  launchRipple(){
    const ripple = this.ripple.launch({
      persistent: true,
      centered: true
    });
    ripple.fadeOut();
  }


  searchEntry$ :Subject<string> = new Subject<string>();
  searchBy_UsingDebounce(event:any){
   // console.log(this.searchInput)
    this.searchEntry$.next(this.searchInput);
  }

  debouceTimeSearch(){
    this.searchEntry$
    .pipe(debounceTime(1000))
    .subscribe((s)=> console.log(s))
  }

  takeWhileClick(){
   
  }

  takeUnitSearch(){
    
  }
}
