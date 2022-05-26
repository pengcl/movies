import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonSlides, PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss']
})
export class IndexPage implements AfterViewInit {
  slideOpts = {
    slidesPerView: 5,
    spaceBetween: 11,
    slidesPerGroup: 5
  };
  movies: [];
  @ViewChild('slides', {static: false}) private slides: IonSlides;

  constructor(private popoverController: PopoverController,
              private dialog: MatDialog,
              private data: DataService,
              private appSvc: AppService) {
  }

  ngAfterViewInit() {
  }

  ionViewDidEnter() {
    this.getData();
  }

  getData() {
    this.getAll();
  }

  getAll() {
    this.data.plans().subscribe(res => {
      this.movies = res.data;
      this.slides.slideNext().then();
      console.log(this.slides.slideNext().then());
    });
  }

  slidePrev() {
    this.slides.slidePrev().then();
  }

  slideNext() {
    this.slides.slideNext().then();
  }

}
