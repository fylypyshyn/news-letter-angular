import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FormComponent} from 'app/pages/form/form.component';
import {FormRoutingModule} from 'app/pages/form/form-routing.module';

@NgModule({
    declarations: [
        FormComponent
    ],
    imports: [
        CommonModule,
        FormRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class FormModule {
}
