import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ROUTES} from 'app/routes.constants';
import {UserFormResolver} from 'app/core/resolvers/user-form-resolver.service';
import {AuthGuardService} from 'app/core/services/auth-guard.service';
import {LoginComponent} from 'app/pages/login/login.component';
import {LogoutComponent} from 'app/pages/logout/logout.component';

const routes: Routes = [
    {
        path: ROUTES.HOME,
        redirectTo: ROUTES.FORM,
        pathMatch: ROUTES.PATH_MATCH
    },
    {
        path: ROUTES.FORM, loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule),
    },
    {
        path: ROUTES.LOGIN,
        component: LoginComponent
    },
    {
        path: ROUTES.LOGOUT, canActivate: [AuthGuardService],
        component: LogoutComponent
    },
    {
        path: ROUTES.USER_FORMS, loadChildren: () => import('./pages/userForms/user-forms.module').then(m => m.UserFormsModule), canActivate: [AuthGuardService],
        resolve: {userForms: UserFormResolver}
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
