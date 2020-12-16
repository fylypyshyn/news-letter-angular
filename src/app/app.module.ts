import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './layouts/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {UserFormsModule} from 'app/pages/userForms/user-forms.module';
import {FormModule} from 'app/pages/form/form.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from 'app/pages/login/login.component';
import {LogoutComponent} from 'app/pages/logout/logout.component';

@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormModule,
        MatToolbarModule,
        UserFormsModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})
export class AppModule {
}
