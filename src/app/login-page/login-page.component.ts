import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, AngularToastifyModule,FormsModule, MatFormFieldModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public username: string | undefined;
  public password: string | undefined;
  invalidLogin: boolean = false;
  
  constructor(private router: Router, private toastify: ToastService) {}

  ngOnInit(): void {
    localStorage.removeItem('isLoggedIn');
  }

  login() {
    if (this.username === environment.username && this.password === environment.password) {
      setTimeout(() => {
        this.toastify.success('Login Successful');
      }, 500);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/employee-list']);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
      this.toastify.error('Invalid username or password');
    }
  }
}
