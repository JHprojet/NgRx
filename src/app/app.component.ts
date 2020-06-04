import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-test';

  constructor(private http:HttpClient,@Inject(SESSION_STORAGE) private session: StorageService) { }

  //Juste récupération token pour connection API
  ngOnInit(): void {
    this.getAnonymeKey();
  }


  GetAnonymeToken() {
    return this.http.get('http://localhost:44312/Login', this.Header())
  }
  /** Get Anonymous token and set session */
  getAnonymeKey()
  {
      this.GetAnonymeToken().subscribe(result => {
          this.session.set("Anonyme", result);
      });
  }
  Header() {
    let httpOptions = { headers : new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : this.session.get("Anonyme")??""
    })};
    return httpOptions;
  }

}
