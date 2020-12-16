import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserFormsComponent} from 'app/pages/userForms/user-forms.component';

const routes: Routes = [
    {
        path: '',
        component: UserFormsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserFormsRoutingModule {
}
