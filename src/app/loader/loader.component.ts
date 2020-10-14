import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((data) => {
      this.isLoading = data.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
