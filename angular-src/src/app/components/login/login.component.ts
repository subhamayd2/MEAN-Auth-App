import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    this.auth.authenticate(user).subscribe(res => {
      if(!res.success){
        this.flashMsg.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.auth.storeUser(res.token, res.user);
        this.flashMsg.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
