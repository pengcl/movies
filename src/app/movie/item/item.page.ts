import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';
import { CodeComponent } from '../../home/entryComponents/code/code';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../@theme/modules/toast';

@Component({
  selector: 'app-movie-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  providers: [DatePipe]
})
export class MovieItemPage implements OnInit {
  scrollTop = 0;
  cinemas;
  movie;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 12,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
    speed: 400
  };
  cinema;
  movies = [];
  day = {};

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private dataSvc: DataService,
              private toastSvc: ToastService) {
    this.dataSvc.plans().subscribe(res => {
      this.movie = res.data.filter(item => item.movieCode === this.activatedRoute.snapshot.params.id)[0];
      const items = [];
      const cinemas = this.getCinemas();
      this.movie.saleCinemas.forEach(cinemaCode => {
        if (cinemas[cinemaCode]) {
          items.push(cinemas[cinemaCode]);
        }
      });
      const code = this.activatedRoute.snapshot.queryParams.cinema;
      if (code) {
        this.cinemas = [cinemas[code]];
        this.cinema = this.cinemas[0];
      } else {
        this.cinemas = items.sort((a, b) => b.code - a.code);
        this.cinema = items[0];
      }
      this.getData();
    });
  }

  getData() {
    const data = {
      cinemaCode: this.cinema.code
    };
    this.dataSvc.moviePlans(data).subscribe(res => {
      res.data.movieList.forEach(item => {
        item.current = item.movieAllPlans[0];
      });
      let movies = [res.data.movieList.filter(item => item.movieCode === this.activatedRoute.snapshot.params.id)[0]];
      movies = movies.concat(res.data.movieList.filter(item => item.movieCode !== this.activatedRoute.snapshot.params.id));
      this.getDayPlans(movies);
    });
  };

  getDayPlans(movies, date?) {
    date = date || this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const params = {
      cinemaCode: this.cinema.code,
      day: date
    };
    this.toastSvc.loading('加载中...', 0);
    this.dataSvc.test(params).subscribe(res => {
      this.toastSvc.hide();
      console.log(movies, res.data);
      const tests = res.data;
      movies.forEach(movie => {
        const plans = [];
        tests.forEach(test => {
          test.price = (() => {
            let price = 0;
            test.ticketTypePriceDTOList.forEach(i => {
              const minPrice = Number(i.minPrice);
              if (price) {
                if (minPrice < price) {
                  price = minPrice;
                }
              } else {
                price = minPrice;
              }
            });
            return price;
          })();
          if (movie.movieName === test.movieName) {
            plans.push(test);
          }
        });
        movie.plans = plans;
      });
    });
    this.movies = movies;
  }

  ngOnInit() {
  }

  ionScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(CodeComponent, {
      width: '200px',
      maxWidth: '200px',
      data
    });
  }

  showCode(movieCode) {
    /*this.openDialog({movieCode, cinemaCode: this.cinema.code});*/
  }

  getMovies(): any[] {
    return this.dataSvc.getMovies();
  }

  getCinemas(): any {
    const cinemas = {};
    (this.dataSvc.getCinemas()).forEach(item => {
      cinemas[item.code] = item;
    });
    return cinemas;
  }

  selected(target, item) {
    this[target] = item;
    this.getData();
  }

  changeDay(movie, tab) {
    movie.current = tab;
    this.getDayPlans(this.movies, tab.showDate);
  }
}
