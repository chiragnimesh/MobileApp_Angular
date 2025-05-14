import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Mobile } from '../interfaces/mobile';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private baseUrl = 'http://localhost:8080/mobiles';

  private http = inject(HttpClient);

  deleteMobile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addMobile(data: Mobile): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getMobiles(): Observable<any> {
    return this.http.get<Mobile[]>(this.baseUrl);
  }

  getMobileById(id: number): Observable<any> {
    return this.http.get<Mobile>(`${this.baseUrl}/${id}`);
  }

  updateMobile(id: number, updatedMobile: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updatedMobile);
  }

  // getMobiles(): Mobile[] {
  //   const data = await lastValueFrom(
  //           this.http.get<Mobile[]>('http://localhost:8080/mobiles')
  //   // console.log(data);
  //   if(data) {
  //     const course = JSON.parse(data);
  //     // this.updateCourses(course);
  //     return course;
  //   }
  //   return [];
  // }
}
