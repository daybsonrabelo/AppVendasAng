import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private API_URL
  ) { }
  
  list() {
    return this.http.get<T[]>(this.API_URL)
        .pipe(
          delay(2000),
        );
}

loadById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
}

private create(record: T) {
    var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
    return this.http.post(this.API_URL, record, httpOptions).pipe(take(1));
}

private update(record: T) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
}

save(record: T) {
    if(record['id']) {
        return this.update(record);
    } 
    
    return this.create(record);
}

remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
}
}
