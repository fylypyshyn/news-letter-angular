import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ROUTES} from 'app/routes.constants';
import {UserFormResolver} from 'app/core/resolvers/user-form-resolver.service';
import {AuthGaurdService} from 'app/core/services/auth-gaurd.service';
import {LoginComponent} from 'app/pages/login/login.component';
import {LogoutComponent} from 'app/pages/logout/logout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTES.FORM,
        pathMatch: 'full'
    },
    {
        path: ROUTES.FORM, loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule),
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: ROUTES.USER_FORMS, loadChildren: () => import('./pages/userForms/user-forms.module').then(m => m.UserFormsModule), canActivate: [AuthGaurdService],
        resolve: {userForms: UserFormResolver}
    },
    {
        path: 'logout',
        component: LogoutComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
