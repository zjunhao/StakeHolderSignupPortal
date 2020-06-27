import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/log-in/services/user.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  logOutUser() {
    this.userService.logOutUser();
  }
}
