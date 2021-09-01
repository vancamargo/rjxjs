import { Component, OnInit } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  observableCreate(){
    const hello = Observable.create((observer: Observer<string>)=>{
      observer.next('Hello');
      observer.next('from');
      observer.next('obsever');
      observer.complete();
    })

    hello.subscribe((val :any)=>{
      console.log(val);
    })
  }

  fromClick(){
    from([1,2,3,4,{x:10, y:20}])
      .subscribe((v)=>{
        console.log(v)
      })
  }

}
