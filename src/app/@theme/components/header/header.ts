import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class HeaderComponent {
  @Input() scrollTop;
  user = null;

  constructor(private authSvc: AuthService) {
    authSvc.getLoginStatus().subscribe(res => {
      this.user = res ? authSvc.currentUser : null;
    });
  }

  logout() {
    this.authSvc.logout();
  }

}
