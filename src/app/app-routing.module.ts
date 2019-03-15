import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

//NOTE FOR CODE REVIEW:
/*It seems to me like this kind of routing style doesn't seem very maintainable in the long run.
For instance, if we ever change the naming or add extra vars to what a user is, we would have to go back here and fix remake everything as well.
Is there any better way of doing this?
*/
const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent}
    ]},
    { path: 'servers', 
    //canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard],
    component: ServersComponent, 
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
    //{path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '/not-found'}
  ];
  
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes/* , {useHash: true} */)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}