import { Component, OnInit, Input } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../../services/data.service';
import {AppService} from '../../app.service';
import {CodeComponent} from '../../home/entryComponents/code/code';
import {CityComponent} from '../../home/entryComponents/city/city.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class MovieListPage implements OnInit {
  movies;
  cinemas;
  slideOpts = {};
  slideBannerOpts = {
    initialSlide: 1,
    speed: 400
  };
  provinces = this.data.getProvinces();
  city;
  loading = true;
  cinema;
  filterMovies;
  scrollTop = 0;

  constructor(private popoverController: PopoverController,
              private dialog: MatDialog,
              private data: DataService,
              private appSvc: AppService) {
    this.cinemas = this.getCinemas();
    this.data.plans().subscribe(res => {
      this.movies = res.data;
      this.getFilterMovies();
    });
    /*this.appSvc.getPositionStatus().subscribe(res => {
      if (res) {
        this.loading = false;
        res.province = res.province ? res.province.replace('省', '') : '广东';
        res.city = res.city ? res.city.replace('市', '') : '广州';
        const provinces = this.provinces.filter(province => province.name === res.province);
        if (provinces.length > 0) {
          this.city = {name: res.city};
        } else {
          this.city = {name: '广州'};
        }
        this.cinemas = this.cinemas.filter(cinema => cinema.city === res.city);
        this.getFilterMovies();
      }
    });
    this.data.plans().subscribe(res => {
      this.movies = res.data;
      this.getFilterMovies();
    });*/
  }

  ngOnInit() {}
  ionScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  getFilterMovies() {
    if (this.movies && this.cinema) {
      this.filterMovies = this.movies.filter(movie => movie.saleCinemas.indexOf(this.cinema.code) !== -1);
    } else {
      this.filterMovies = this.movies;
    }
  };

  openDialog(data): void {
    const dialogRef = this.dialog.open(CodeComponent, {
      width: '200px',
      maxWidth: '200px',
      data
    });
  }

  showCode(movieCode) {
    this.openDialog({movieCode, cinemaCode: this.cinema.code});
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMovies(): any[] {
    return this.data.getMovies();
  }

  getCinemas(): any[] {
    return this.data.getCinemas();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CityComponent,
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const {data} = await popover.onDidDismiss();
    this.city = data;
    this.cinemas = data.cinemas;
    this.cinema = this.cinemas[0];
    this.getFilterMovies();
  }

  selected(target, item) {
    this[target] = item;
    this.getFilterMovies();
  }
}
