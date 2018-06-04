import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from '../common/toastr.service';
import { VoitureService } from './voiture.service';
import { AuthService } from '../user/auth.service';
import { IVoiture } from './voiture';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  userObj: any;
  reportTitle: string;
  voitures: IVoiture[];
  totalrows: number;
  pgCounter: number;
  qreport: string;
  qstartdt: string;
  qenddt: string;
  qpage: number;
  qsort: string;
  exptotal: number;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private voitureService: VoitureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
  }

  report = new FormControl('opt1');
  startdt = new FormControl({value: '', disabled: true});
  enddt = new FormControl({value: '', disabled: true});

  ngOnInit() {
    this.userObj =  this.authService.currentUser;
    this.reportForm = this.fb.group({
      report: this.report,
      startdt: this.startdt,
      enddt: this.enddt
    });

    this.route.queryParams.forEach((params: Params) => {
      this.qreport = params['report'] || '';
      this.qstartdt = params['startdt'] || '';
      this.qenddt = params['enddt'] || '';
      this.qpage = params['page'] || '';
      this.qsort = params['sortby'] || '';

      if (this.qreport !== '') {
        const payload: any = {};
        payload.report = this.qreport;
        if ( (this.qstartdt !== '' && this.qenddt !== '')) {
          payload.startdt = this.qstartdt;
          payload.enddt = this.qenddt;

          this.reportForm.get('startdt').enable();
          this.reportForm.get('enddt').enable();
        }
        payload.page = this.qpage;
        payload.sortby = this.qsort;
        this.fetchReport(this.userObj.userid, payload);

        this.reportForm.patchValue({
          report: this.qreport,
          startdt: this.qstartdt,
          enddt: this.qenddt
        });
      }
    });

    this.reportForm.get('report').valueChanges
      .subscribe(value => this.toggleDates(value));
  }

  toggleDates(opt: string): void {
    const dt1Control = this.reportForm.get('startdt');
    const dt2Control = this.reportForm.get('enddt');
    if (opt === 'opt2') {
      dt1Control.setValidators(Validators.required);
      dt2Control.setValidators(Validators.required);
      dt1Control.enable();
      dt2Control.enable();
    } else {
      dt1Control.clearValidators();
      dt2Control.clearValidators();
      dt1Control.disable();
      dt2Control.disable();
      dt1Control.setValue('');
      dt2Control.setValue('');
    }
    dt1Control.updateValueAndValidity();
    dt2Control.updateValueAndValidity();
  }

  getReport(formdata: any): void {
    if (this.reportForm.valid) {
      if (this.reportForm.value.report === 'opt2' && (new Date(this.reportForm.value.startdt) > new Date(this.reportForm.value.enddt))) {
        this.toastr.error('Start date cannot be greater than end date.');
      } else {
        this.fetchReport(this.userObj.userid, this.reportForm.value);
      }
    }
  }

  fetchReport(userid, formval) {
    this.voitureService.getVoitures(userid, formval)
    .subscribe(data => {
      if (data.success === false) {
        if (data.errcode) {
          this.authService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        this.voitures = data.data.docs;
        this.totalrows = +data.data.total;
        this.pgCounter = Math.floor((this.totalrows + 10 - 1) / 10);

        this.qreport = formval.report;
        if (formval.startdt) {
          this.qstartdt = formval.startdt;
          this.qenddt = formval.enddt;
        }



        if (formval.report === 'opt1') {
          this.reportTitle = 'for ' + this.datePipe.transform(new Date(), 'MMM y');
        } else if (formval.report === 'opt2') {
            this.reportTitle = 'between ' + this.datePipe.transform(new Date(formval.startdt), 'd MMM y') + ' and ' +
            this.datePipe.transform(new Date(formval.enddt), 'd MMM y');
        } else {
          this.reportTitle = 'for all voitures';
        }
      }
    });
  }

  setPage(page): void {
    this.router.navigate(['report'],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt, page: page, sortby: this.qsort }
      }
    );
  }

  createPager(number) {
    const items: number[] = [];
    for ( let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  showVoiture(carid): void {
    this.router.navigate([`voiture/view/${carid}`],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt, page: this.qpage || 1, sortby: this.qsort }
      }
    );
  }

  confirmDel(idx: number, carid: string) {
    if (confirm('Do you really want to delete this record?')) {
      this.voitureService.delVoiture(carid)
      .subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          this.toastr.error(data.message);
        } else {

          this.voitures.splice(idx, 1);

          this.toastr.success(data.message);
        }
      });
    }
  }

  editVoiture(carid): void {
    this.router.navigate([`voiture/${carid}`],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt, page: this.qpage || 1, sortby: this.qsort }
      }
    );
  }
  sortVoiture(sortby): void {
    if (this.qsort === '') {
      this.qsort = sortby;
    } else if (this.qsort.indexOf('-') > -1 ) {
      this.qsort = sortby;
    } else {
      this.qsort = '-' + sortby;
    }

    this.router.navigate(['report'],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt, page: this.qpage || 1, sortby: this.qsort }
      }
    );
  }

}
