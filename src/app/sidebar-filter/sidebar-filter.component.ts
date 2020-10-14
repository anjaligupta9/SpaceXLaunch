import { Component, OnInit, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
 years : string[]= ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019"];
 selectedOpt: string;
 launchCase: string;
 landCase: string;
 @Output() chooseFilter= new EventEmitter<any>();
 @Output() launchCaseFilter= new EventEmitter<any>();
 @Output() landCaseFilter= new EventEmitter<any>();

  constructor(private el: ElementRef) { 
    this.onloadSelected();
  }

  ngOnInit() {
  }
  onloadSelected() {
    this.selectedOpt = 'all';
    this.chooseFilter.emit(this.selectedOpt);

  }
  filterByCat(event) {
    const allElement = event.target.parentElement.querySelectorAll('li');
    this.selectedOpt = event.target.innerText;
    allElement.forEach(element => {
      element.classList.remove('active');
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    } else {
      event.target.classList.remove('active');
    }
    if (this.selectedOpt !== undefined) {
      console.log('selectedOpt => ', this.selectedOpt);
      this.chooseFilter.emit(this.selectedOpt);
    }
  }
  successLaunchCase(event){
    const allElement = event.target.parentElement.querySelectorAll('li');
    this.launchCase = event.target.innerText;
    allElement.forEach(element => {
      element.classList.remove('active');
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    } else {
      event.target.classList.remove('active');
    }
    if (this.launchCase !== undefined) {
      console.log('launchCase => ', this.launchCase.toLowerCase());
      this.launchCase = this.launchCase.toLowerCase();
      this.launchCaseFilter.emit(this.launchCase);
    }
  }

  successLandCase(event){
    const allElement = event.target.parentElement.querySelectorAll('li');
    this.landCase = event.target.innerText;
    allElement.forEach(element => {
      element.classList.remove('active');
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    } else {
      event.target.classList.remove('active');
    }
    if (this.landCase !== undefined) {
      console.log('landCase => ', this.landCase.toLowerCase());
      this.landCase = this.landCase.toLowerCase();
      this.landCaseFilter.emit(this.landCase);
    }
  }


}
