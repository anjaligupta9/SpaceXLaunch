import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllLaunchesService {
data : any[];
  constructor(private http: HttpClient) { 

  }
  getAllLaunches(): Observable<any[]> {
  console.log("inside getAllLaunches");
  
  return this.http.get("https://api.spacexdata.com/v3/launches?limit=100") as Observable<any[]>;
  }
}
