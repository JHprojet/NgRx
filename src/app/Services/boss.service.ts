import {Injectable, Inject} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boss } from "./boss.interface";
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
  
@Injectable()

export class BossService {
  constructor(private http: HttpClient,@Inject(SESSION_STORAGE) private session: StorageService) { }
 
  /**
  * Call to API to get all bosses
  * @returns Observable<Boss[]>
  */
  getBosses(): Observable<Boss[]> {
    return this.http.get<Boss[]>('http://localhost:65066/API/Boss', this.Header())
  }
  /**
  * Call to API to post a new boss
  * @param Boss Boss
  * @returns Observable<Boss>
  */
  createBoss(Boss: Boss): Observable<Boss> {
    return this.http.post<Boss>('http://localhost:65066/API/Boss', Boss, this.Header())
  }
  /**
  * Call to API to delete an existing boss
  * @param id Id of the Boss to delete
  * @returns Observable<Boss>
  */
  deleteBoss(id: number): Observable<number> {
    return this.http.delete<number>('http://localhost:65066/API/Boss/'+id, this.Header())
  }

  private Header() {
    let httpOptions = { headers : new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : this.session.get("Anonyme")??""
    })};
    return httpOptions;
  }
}
