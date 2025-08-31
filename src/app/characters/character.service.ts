import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private apiUrl = 'https://swapi.py4e.com/api/people';

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  getResource(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
