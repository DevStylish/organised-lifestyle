import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/organised-lifestyle/interfaces/user.interface';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit {
  userInfo!: User;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    let userInfoSession = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(userInfoSession || '');
  }

  logout(): void {
    this.backendService.logout();
  }
}
