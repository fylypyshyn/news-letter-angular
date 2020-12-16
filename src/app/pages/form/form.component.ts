import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from 'app/core/services/httpclient.service';
import {IUserForm} from 'app/core/domain/IUserForm';
import {Router} from '@angular/router';
import {ROUTES} from 'app/routes.constants';


@Component({
    selector: 'app-user-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

    formGroup: FormGroup;
    userForm: IUserForm;

    constructor(private formBuilder: FormBuilder,
                private clientService: HttpClientService,
                private router: Router) {
    }

    ngOnInit() {
        this.initFormGroup();
    }

    public saveUserForm() {
        if (this.formGroup.valid) {
            this.userForm = new IUserForm(this.formGroup.value);
            this.clientService.createUserForms(this.userForm).subscribe(
                () => {
                    this.router.navigate([ROUTES.FORM]);
                }
            );
        }
    }

    private initFormGroup() {
        this.formGroup = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }

}
