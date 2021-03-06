import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class VoitureService {

  public jwtToken: string;

  constructor(private http: Http) {
      const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
          this.jwtToken = theUser.token;
      }
  }
  saveVoiture(userid, oVoiture) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${this.jwtToken}`);
      const options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:1991/api/voiture/${userid}`, JSON.stringify(oVoiture), options)
          .map((response: Response) => response.json())
          .catch(this.handleError);
  }

  getVoitures(userid, oVoiture) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${this.jwtToken}`);
      const options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:1991/api/voiture/report/${userid}`, JSON.stringify(oVoiture), options)
          .map((response: Response) => response.json())
          .catch(this.handleError);
  }

  getVoitures1(userid, oVoiture) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:1991/api/voiture/report/${userid}`, options)
        .map((response: Response) => response.json())
        .catch(this.handleError);
}


  getVoiture(carid) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${this.jwtToken}`);
      const options = new RequestOptions({ headers: headers });

      return this.http.get(`http://localhost:1991/api/voiture/${carid}`, options)
          .map((response: Response) => response.json())
          .catch(this.handleError);
  }

  delVoiture(carid) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${this.jwtToken}`);
      const options = new RequestOptions({ headers: headers });

      return this.http.delete(`http://localhost:1991/api/voiture/${carid}`, options)
          .map((response: Response) => response.json())
          .catch(this.handleError);
  }

   private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
