import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoitureService } from './voiture.service';
import { AuthService } from '../user/auth.service';
import { ToastrService } from '../common/toastr.service';
import { Subscription } from 'rxjs/Subscription';
import { IVoiture } from './voiture';

@Component({
  selector: 'app-viewvoiture',
  templateUrl: './viewvoiture.component.html',
  styleUrls: ['./viewvoiture.component.css']
})

export class ViewvoitureComponent implements OnInit {

  voiture: IVoiture;
  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private voitureService: VoitureService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.getVoiture(id);
      });
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    getVoiture(id) {
      this.voitureService.getVoiture(id).subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          this.toastr.error(data.message);
        } else {
          if (data.data[0]) {
            this.voiture = data.data[0];
          } else {
            this.toastr.error('Voiture id is incorrect in the URL');
          }

        }
      });
    }

    onBack(): void {
        this.router.navigate(['/report'], { preserveQueryParams: true });
    }
}
