import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '../../@theme/modules/dialog';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.page.html',
  styleUrls: ['../auth.scss', './login.page.scss']
})
export class AuthLoginPage {
  form: FormGroup;

  constructor(private router: Router,
              private dialogSvc: DialogService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      cinemaCode: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      identifier: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): any {
    if (this.form.invalid) {
      return false;
    }
    this.authSvc.login(this.form.value).subscribe(res => {
      console.log(res);
      // 设置用户Token信息
      if (res.user) {
        if (res.user.cinemaCode === this.form.get('cinemaCode').value) {
          this.authSvc.updateLoginStatus(res);
          this.router.navigate(['/home']).then();
        } else {
          this.dialogSvc.show({content: '影院编码不正确，请重新登录', cancel: '', confirm: '我知道了'}).subscribe(() => {
            this.form.reset();
          });
        }
      } else {
        this.form.setErrors({identifier: {valid: false}});
      }
    });

  }

}
