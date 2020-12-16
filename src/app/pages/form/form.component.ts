import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from 'app/core/services/httpclient.service';
import {IUserForm} from 'app/core/domain/IUserForm';
import {Router} from '@angular/router';
import {IImage} from 'app/core/domain/IImage';


@Component({
    selector: 'app-user-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

    formGroup: FormGroup;
    userForm: IUserForm;

    selectedFiles: FileList;
    currentFile: File;
    message = '';

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
            this.userForm.langKey = 'en';
            this.clientService.createUserForms(this.userForm).subscribe(
                () => {
                    this.router.navigate(['']);
                }
            );
        }
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        this.currentFile = this.selectedFiles.item(0);
        this.clientService.uploadImage(this.currentFile).subscribe(
            event => {
                this.formGroup.get('image').setValue(new IImage(event));
            },
            err => {
                this.message = 'Could not upload the file!';
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }


    public initFormGroup() {
        this.formGroup = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            image: ['', new IImage()]
        });
    }
}
