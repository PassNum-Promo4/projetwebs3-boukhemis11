import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from '../common/toastr.service';
import { VoitureService } from './voiture.service';
import { AuthService } from '../user/auth.service';


@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  voitureForm: FormGroup;
  userObj: any;
  acc: any = ['Assurance', 'Pneus', 'Entretien', 'Plaquettes de frein', 'Vidange', 'Other'];
  carid: string;
  pgTitle: string;
  btnLbl: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private voitureService: VoitureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
  }

  cardate = new FormControl('', [Validators.required]);
  cardate2 = new FormControl('', [Validators.required]);
  caraccount = new FormControl('', [Validators.required]);
  caramt = new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]);
  cardesc = new FormControl();





  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.carid = params['id'];
        this.getVoiture(this.carid);
        this.pgTitle = 'Edit';
        this.btnLbl = 'Update';
      } else {
        this.pgTitle = 'Add';
        this.btnLbl = 'Submit';
      }
    });

    this.userObj =  this.authService.currentUser;
    this.voitureForm = this.fb.group({
      cardate: this.cardate,
      cardate2: this.cardate2,
      caraccount: this.caraccount,
      caramt: this.caramt,
      cardesc: this.cardesc
    }, {validator: this.dateLessThan('cardate', 'cardate2')});
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     const f = group.controls[from];
     const t = group.controls[to];
     if (f.value > t.value) {
       return {
         dates: 'Date from should be less than Date to'
       };
     }
     return {};
    };
  }


  getVoiture(id) {
    this.voitureService.getVoiture(id).subscribe(data => {
      if (data.success === true) {
        if (data.data[0]) {
          this.populateForm(data.data[0]);
        } else {
          this.toastr.error('voiture id is incorrect in the URL');
          this.router.navigate(['report']);
        }
      }
    });
  }

  populateForm(data): void {
    this.voitureForm.patchValue({
      cardate: this.datePipe.transform(data.voituredate, 'y-MM-dd'),
      cardate2: this.datePipe.transform(data.voituredate2, 'y-MM-dd'),
      caraccount: data.voituretype,
      caramt: data.voitureamt,
      cardesc: data.voituredesc
    });
  }

  saveVoiture(formdata: any): void {
    if (this.cardate < this.cardate2) {
      this.toastr.error('data.message');

    }
    console.log(this.cardate);
    console.log(this.cardate);
    console.log(this.cardate < this.cardate2);
    if (this.voitureForm.valid) {
      const theForm = this.voitureForm.value;
      if (this.carid !== '') {
        theForm.carid = this.carid;
      }

      this.voitureService.saveVoiture(this.userObj.userid, theForm)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.authService.logout();
              this.router.navigate(['login']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
          }
          if (!this.carid) {
            this.voitureForm.reset();
          }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/report'], { preserveQueryParams: true });
  }

}
