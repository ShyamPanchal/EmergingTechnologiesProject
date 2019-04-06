import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../globals';
import { Router } from "@angular/router";
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

}
