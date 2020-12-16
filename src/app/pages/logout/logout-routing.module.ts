import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from 'app/pages/logout/logout.component';

const routes: Routes = [
    {
        path: '',
        component: LogoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserFormsRoutingModule {
}
