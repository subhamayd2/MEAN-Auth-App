import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validate: ValidateService, private flashMsg: FlashMessagesService,
  private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validate.validateRegister(user)){
      this.flashMsg.show("Please fill in all field(s)", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validate.validateEmail(user.email)){
      this.flashMsg.show("Please provide a valid email", {cssClass: 'alert-warning', timeout: 3000});
      return false;
    }

    this.auth.registerUser(user).subscribe(res => {
      if(res.success){
        this.flashMsg.show("You are now registered", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }
      else{
        this.flashMsg.show("Something went wrong!", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
