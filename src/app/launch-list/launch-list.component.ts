import { Component, OnInit } from '@angular/core';
import { GetAllLaunchesService } from '../services/getallLaunches/get-all-launches.service';
import {SuccessfilterService} from '../services/successFilter/successfilter.service'
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { PlatformConfig } from '../settings/platform.config';
import { Location } from '@angular/common'

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss']
})
export class LaunchListComponent implements OnInit {
  baseLaunches: any[];
  launches: any[];
 

  selectedFilter:any;
  selectedLaunchFilter:any = null;
  selectedLandFilter:any=null;
  constructor(private getAllLaunchesService:GetAllLaunchesService, 
    private successfilterService: SuccessfilterService,
    private location: Location,
    private _platformConfig: PlatformConfig)
     { }

  ngOnInit() {
    if (this._platformConfig.isBrowser) {
    this.displayAllLaunches(this.selectedFilter)
    }
  }
  displayAllLaunches(selectedFilter:any) {
    
      this.getAllLaunchesService.getAllLaunches().subscribe(
        res => {
          this.baseLaunches=res;
          this.launches = this.baseLaunches;
          if (selectedFilter === 'all' || selectedFilter === '') {
            console.log('subCat => ', selectedFilter);
            this.launches = this.baseLaunches;
          } else {
            console.log('subCat => ', selectedFilter);
            this.filterBySubcat(this.selectedFilter);
          }
        },
        err => {this.launches=null;}
      );

    }
  
    chooseFilter(evt) {
      console.log(evt);
      this.selectedFilter = evt;
      var currenturl = window.location.pathname;
      window.history.pushState(null,null,currenturl+'&launch_year='+this.selectedFilter);
      
      if(this.selectedFilter!=null && this.selectedLaunchFilter == null && this.selectedLandFilter == null){
              this.displayAllLaunches(this.selectedFilter);
      }
      else if(this.selectedFilter!=null && this.selectedLaunchFilter != null && this.selectedLandFilter == null){
        this.launchFilter(this.selectedLaunchFilter)
      }
      else if(this.selectedFilter!=null && this.selectedLaunchFilter == null && this.selectedLandFilter != null)
      {
        this.landFilter(this.selectedLandFilter)
      }
      else if(this.selectedFilter!=null && this.selectedLaunchFilter != null && this.selectedLandFilter != null){
        this.allFilter(this.selectedLaunchFilter,this.selectedFilter,this.selectedLandFilter);
      }
    }
    launchFilter(evt) {
      console.log("launchinsidelist",evt);
      this.selectedLaunchFilter = evt;
      var currenturl = window.location.pathname;
      window.history.pushState(null,null,currenturl+'&launch_success='+this.selectedLaunchFilter);
      if(this.selectedLaunchFilter!=null && this.selectedFilter==null && this.selectedLandFilter == null ){
      this.successfilterService.getProgramsBasedOnLaunchFilter(this.selectedLaunchFilter).subscribe(
        res => {
          console.log("inside list",res)
          this.launches=res;
        
        },
        err => {this.launches=null;}
      );
      }
      else if(this.selectedLaunchFilter!=null && this.selectedFilter==null && this.selectedLandFilter !==null)
      {
        if(this.selectedLaunchFilter== "false"){
          this.launches=[];
        }
        else{
          this.landFilter(this.selectedLandFilter);
        }
      }
      else if(this.selectedLaunchFilter!=null && this.selectedFilter!= null && this.selectedLandFilter == null){
        this.successfilterService.getProgramsBasedOnLaunchFilter(this.selectedLaunchFilter).subscribe(
          res => {
            console.log("inside list",res)
            this.launches=res;
            this.filterBySubcat(this.selectedFilter)
          
          },
          err => {this.launches=null;}
        );
      }
      else if(this.selectedLaunchFilter!=null && this.selectedFilter!= null && this.selectedLandFilter != null){
        this.allFilter(this.selectedLaunchFilter,this.selectedFilter,this.selectedLandFilter);
      }
    }
   
    landFilter(evt) {
      console.log("landFilterinlist",evt);
      this.selectedLandFilter = evt;
      var currenturl = window.location.pathname;
      window.history.pushState(null,null,currenturl+'&land_success='+this.selectedLandFilter);
      if(this.selectedLandFilter!=null &&  this.selectedFilter== null && this.selectedLaunchFilter == null){
      this.successfilterService.getProgramsBasedOnLandFilter(this.selectedLandFilter).subscribe(
        res => {
          console.log("inside list",res)
          this.launches=res;
        
        },
        err => {this.launches=null;}
      );
      }
      else if(this.selectedLandFilter!=null &&  this.selectedFilter!= null && this.selectedLaunchFilter == null){
        this.successfilterService.getProgramsBasedOnLandFilter(this.selectedLandFilter).subscribe(
          res => {
            console.log("inside list",res)
            this.launches=res;
            this.filterBySubcat(this.selectedFilter);
          
          },
          err => {this.launches=null;}
        );
      }
      else if (this.selectedLandFilter!=null &&  this.selectedFilter== null && this.selectedLaunchFilter != null){
        console.log("land & launch filter",this.selectedLandFilter ,this.selectedLaunchFilter)
        if(this.selectedLaunchFilter== "false"){
          console.log("inside launch false")
          this.launches = [];
        }
        else{
          this.successfilterService.getProgramsBasedOnLandFilter(this.selectedLandFilter).subscribe(
            res => {
              console.log("inside list",res)
              this.launches=res;
            
            },
            err => {this.launches=null;}
          );
        }
      }
      else if(this.selectedLandFilter!=null && this.selectedFilter!=null && this.selectedLandFilter!=null){
        this.allFilter(this.selectedLaunchFilter,this.selectedFilter,this.selectedLandFilter);
      }
    }
    allFilter(launch_success:boolean, launch_year:number, land_success:boolean){
      this.selectedFilter = launch_year;
      this.selectedLaunchFilter = launch_success;
      this.selectedLandFilter = land_success;
      this.successfilterService.getProgramsBasedOnallFilter(this.selectedLaunchFilter,this.selectedFilter,this.selectedLandFilter).subscribe(
        res => {
          console.log("inside allFilter",res)
          this.launches=res;
        
        },
        err => {this.launches=null;}
      );
    }

    filterBySubcat(subcat) {
      console.log('Choose Subcat => ', subcat);
      if (subcat !== undefined) {
        const filteredlaunches = this.launches.filter((elemt) => elemt.launch_year === subcat);
        this.launches = filteredlaunches;
      }
    }
  
  }
