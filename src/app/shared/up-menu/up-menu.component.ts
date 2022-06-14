import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/organised-lifestyle/interfaces/user.interface';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-up-menu',
  templateUrl: './up-menu.component.html',
  styleUrls: ['./up-menu.component.scss'],
})
export class UpMenuComponent implements OnInit {
  userInfo!: User;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    if (localStorage.getItem('userInfo') !== null) {
      let userInfoSession = localStorage.getItem('userInfo');
      this.userInfo = JSON.parse(userInfoSession || '');
    }
  }

  logout(): void {
    this.backendService.logout();
  }
}
