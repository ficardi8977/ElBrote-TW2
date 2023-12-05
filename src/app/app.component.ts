import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'taller';
  
  ngOnInit(): void {
    if(localStorage.length == 0){
    localStorage.setItem('isLoggedIn','false');
    }
}

}

