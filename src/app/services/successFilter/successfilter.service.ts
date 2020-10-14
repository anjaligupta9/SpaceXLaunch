import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessfilterService {
  data:Observable<any[]>;
  constructor(private http: HttpClient) { }

  getProgramsBasedOnLaunchFilter(launch_success:boolean): Observable<any[]> {
    console.log("inside getProgramBasedOnLaunchFilter");
    
   return this.http.get("https://api.spacexdata.com/v3/launches?launch_success="+launch_success+"&limit=100") as Observable<any[]>;
    
    }

    getProgramsBasedOnLandFilter(land_success:boolean): Observable<any[]> {
      console.log("inside getProgramsBasedOnLandFilter");

      return this.http.get("https://api.spacexdata.com/v3/launches?launch_success=true&land_success="+land_success+"&limit=100") as Observable<any[]>;
  
    }
    getProgramsBasedOnallFilter(launch_success:boolean, launch_year:number, land_success:boolean): Observable<any[]> {
      console.log("inside getProgramsBasedOnallFilter");
     
      this.data =this.http.get("https://api.spacexdata.com/v3/launches?launch_success="+launch_success+"&launch_year="+launch_year+"&land_success="+land_success+"&limit=100") as Observable<any[]>;
      console.log("datatattat",this.data);
    
      return this.data; 
    }
}
