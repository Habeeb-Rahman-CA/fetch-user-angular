import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../model/user';
import { catchError, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  http = inject(HttpClient)

  users$: Observable<IUser[]> = new Observable<IUser[]>

  errorMessage = signal('')
  fetchError : boolean = false

  isLoading: boolean = false

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.isLoading = true
    const url = " https://jsonplaceholder.typicode.com/users"
    this.users$ = this.http.get<IUser[]>(url).pipe(
      map((item) =>{
        this.isLoading = false
        return item
      }), 
      catchError(error => {
        console.error("Error while fetching", error);
        this.errorMessage.set('Something Went Wrong')
        this.fetchError = true
        this.isLoading = false
        return ([])
      })
    )
  }
}
