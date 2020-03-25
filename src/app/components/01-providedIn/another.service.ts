import { Injectable } from '@angular/core';
import { User } from './users.models';

@Injectable({
  providedIn: 'root',
})
export class AnotherService {
  private userMap: Array<User> = [];
  constructor(){}

  private createUserInstance(): User {
    const user: User = {
      name: 'Bla',
      age: 20,
      loggedIn: true,
      status: 'Norm',
    }

    return user;
  }

  addUser(): void {
    this.userMap.push(this.createUserInstance());
  }

  getUserList(): User[] {
    return this.userMap;
  }
}