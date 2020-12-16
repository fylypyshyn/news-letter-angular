import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatPaginatorModule, MatTableModule, MatToolbarModule} from '@angular/material';

import {UserFormsComponent} from 'app/pages/userForms/user-forms.component';
import {UserFormsRoutingModule} from 'app/pages/userForms/user-forms-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        UserFormsComponent
    ],
    imports: [
        CommonModule,
        UserFormsRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class UserFormsModule {
}
