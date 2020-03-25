import { Injectable } from '@angular/core';
import { AnotherService } from './another.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public custom: AnotherService) {}
  printBookTitle() {
    console.log(`This is book title`);

    console.log(this.custom.getUserList());
    this.custom.addUser();
    console.log(this.custom.getUserList());
  }
}
