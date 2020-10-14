import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LaunchListComponent } from './launch-list.component';

import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LaunchListComponent,
    SidebarFilterComponent
  ]
})
export class ProductListModule { }