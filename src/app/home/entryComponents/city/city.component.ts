import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { AppService } from '../../../app.service';

export const getIndex = (arr, key, value) => {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      index = i;
    }
  }
  return index;
};

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.scss'],
})
export class CityComponent {
  cinemas;
  position;
  provinces = [];
  province;
  city;

  constructor(private popoverController: PopoverController,
              private data: DataService,
              private appSvc: AppService) {
    this.cinemas = this.getCinemas();
    console.log(this.cinemas);
    this.provinces = this.data.getProvinces();
    this.appSvc.getPositionStatus().subscribe(res => {
      if (res) {
        this.position = res;
      }
    });
  }

  selected(target, item) {
    this[target] = item;
    if (target === 'city') {
      this.dismissPopover();
    }
  }

  getCinemas(): any[] {
    return this.data.getCinemas();
  }

  dismissPopover() {
    console.log(this.city);
    this.popoverController.dismiss(this.city).then();
  }
}
