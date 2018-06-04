import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
}

ngOnInit() {
    this.authService.logout();
    this.toastr.success('You have been logged out.');
    this.router.navigate(['login']);
}



}
