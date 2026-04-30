import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private api = 'http://localhost:5000/api/Category';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  create(formData: FormData) {
    return this.http.post<any>(this.api, formData);
  }

  update(id: number, formData: FormData) {
    return this.http.put<any>(`${this.api}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}