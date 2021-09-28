import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from './Person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
 private readonly url = `${environment.API}persons`;

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Person[]>{
    return this.http.get<Person[]>(this.url);
  }

  GetById(id: number): Observable<Person>{
   const apiurl = `${this.url}/${id}`;
   return this.http.get<Person>(apiurl);
  }

  PostPerson(person: Person): Observable<any>{
    return this.http.post<Person>(this.url, person, httpOptions);
  }

  PutPerson(person: Person): Observable<any>{
    return this.http.put<Person>(this.url, person, httpOptions);
  }

  DeletePerson(id: number): Observable<any>{
    const apiurl = `${this.url}/${id}`;
    return this.http.delete<number>(apiurl, httpOptions);
  }
}
