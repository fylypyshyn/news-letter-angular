import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {ROUTES} from 'app/routes.constants';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {

    }

    ngOnInit() {
        this.authenticationService.logOut();
        this.router.navigate([ROUTES.LOGIN]);
    }

}
