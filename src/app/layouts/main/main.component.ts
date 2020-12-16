import {Component, HostListener, OnInit} from '@angular/core';
import {AuthenticationService} from 'app/core/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        window.sessionStorage.clear();
    }
  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {}


    public isUserLoggedIn(): boolean {
        return this.loginService.isUserLoggedIn();
    }

}
