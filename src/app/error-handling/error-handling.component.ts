import { Component, OnInit } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startTest(){
    let obj: Observable<any> = new Observable((observer: Observer<any>)=>{
      for(let i = 0; i<10; i++){
        if(i ===7)
        observer.error('and error occured ')
        else
        observer.next(i);
      }
    });
    obj.subscribe((i)=> console.log(i)),
    (err :any) =>{
      console.log(err),
      () =>console.log('complete')
    }
  }

}
