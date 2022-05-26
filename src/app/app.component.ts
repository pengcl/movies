import {Component} from '@angular/core';
import {AppService} from './app.service';

declare let qq: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private appSvc: AppService) {
    const geolocation = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
    geolocation.getLocation((res) => {
      this.appSvc.updatePositionStatus(res);
    }, (err) => {
      this.appSvc.updatePositionStatus({province: null, city: null});
    });
  }
}
