import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from 'app/core/services/httpclient.service';
import {IUserForm} from 'app/core/domain/IUserForm';
import {Router} from '@angular/router';
import {IImage} from 'app/core/domain/IImage';
import {ROUTES} from 'app/routes.constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EGender} from 'app/core/domain/EGender';

@Component({
    selector: 'app-user-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    userForm: IUserForm;

    gender = EGender;
    enumKeys = [];

    selectedFiles: FileList;
    currentFile: File;
    message = '';

    private destroy$ = new Subject<void>();

    constructor(private formBuilder: FormBuilder,
                private clientService: HttpClientService,
                private router: Router) {
    }

    ngOnInit() {
        this.initFormGroup();
        this.enumKeys = Object.keys(this.gender);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public saveUserForm() {
        if (this.formGroup.valid) {
            this.userForm = new IUserForm(this.formGroup.value);
            this.userForm.langKey = 'en';
            this.clientService.createUserForms(this.userForm)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.router.navigate([ROUTES.HOME]);
                    }
                );
        }
    }

    public selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    public upload() {
        this.currentFile = this.selectedFiles.item(0);
        this.clientService.uploadImage(this.currentFile).subscribe(
            event => {
                this.formGroup.get('image').setValue(new IImage(event));
            },
            () => {
                this.message = 'Could not upload the file!';
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }

    private initFormGroup() {
        this.formGroup = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            image: ['', []]
        });
    }
}
