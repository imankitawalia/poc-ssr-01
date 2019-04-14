import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'SSR-POC2';

  constructor(private httpClient: HttpClient) {}

  clickMe() {
    console.log('In click me.');
    // Make http call
    this.httpClient.get('https://reqres.in/api/users?delay=2').subscribe((res) => {
      console.log('Response from API' , res);
    });
  }
}
