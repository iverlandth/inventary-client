import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Http} from '@angular/http';

import {User} from "./user";
import {UserService} from "./user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(private userService: UserService,
              private router: Router,
              private http: Http) {
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => this.users = users);
  }

  add(first_name: string, middle_name: string, last_name: string): void {
    first_name = first_name.trim();
    middle_name = middle_name.trim();
    last_name = last_name.trim();

    if (!first_name && !middle_name && !last_name) {
      return;
    }
    this.userService.create(first_name, middle_name, last_name)
      .then(user => {
        this.users.push(user);
        this.selectedUser = null;
      });
  }

  delete(user: User): void {
    this.userService
      .delete(user.id)
      .then(() => {
        this.users = this.users.filter(h => h !== user);
        if (this.selectedUser === user) {
          this.selectedUser = null;
        }
      });
  }

  ngOnInit() {
    this.getUsers();
    /*
     this.http.get('http://localhost:3000/users.json')
     .subscribe(res => this.users = res.json());*/
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  gotoDetail(): void {
    this.router.navigate(['/users/show', this.selectedUser.id]);
  }

}

