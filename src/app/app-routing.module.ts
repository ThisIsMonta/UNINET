import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassComponent } from './AdminComponents/add-class/add-class.component';
import { AdminFeedComponent } from './AdminComponents/admin-feed/admin-feed.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { ApproveAccountsComponent } from './AdminComponents/approve-accounts/approve-accounts.component';
import { DashboardComponent } from './AdminComponents/dashboard/dashboard.component';
import { DeleteAccountsComponent } from './AdminComponents/delete-accounts/delete-accounts.component';
import { ReportedPostsComponent } from './AdminComponents/reported-posts/reported-posts.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { SignUpComponent } from './AuthComponents/sign-up/sign-up.component';
import { GroupComponent } from './GroupComponents/group/group.component';
import { AuthGuard } from './Guards/auth.guard';
import { GroupGuard } from './Guards/group.guard';
import { AddGroupComponent } from './UserComponents/add-group/add-group.component';
import { EditProfileComponent } from './UserComponents/edit-profile/edit-profile.component';
import { FeedPostsComponent } from './UserComponents/feed-posts/feed-posts.component';
import { FeedComponent } from './UserComponents/feed/feed.component';
import { GroupViewComponent } from './UserComponents/group-view/group-view.component';
import { PostViewComponent } from './UserComponents/post-view/post-view.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'home',component:FeedComponent,canActivateChild:[AuthGuard],children:[
    {path:'',component:FeedPostsComponent},
    {path:'profile/:id',component:ProfileComponent},
    {path:'edit-profile',component:EditProfileComponent},
    {path:'administration',component:AdminFeedComponent},
    {path:'post/:id',component:PostViewComponent},
    {path:'group/:id',component:GroupViewComponent,canActivateChild:[GroupGuard],children:[
      {path:'',component:GroupComponent},
      {path:'post/:id',component:PostViewComponent}
    ]},
    {path:'add-group',component:AddGroupComponent},
  ]},
  {path:'admin',component:DashboardComponent,canActivateChild:[AuthGuard],children:[
    {path:'',component:AdminHomeComponent},
    {path:'group/:id',component:GroupViewComponent,canActivateChild:[GroupGuard],children:[
      {path:'',component:GroupComponent},
      {path:'post/:id',component:PostViewComponent}
    ]},
    {path:'profile/:id',component:ProfileComponent},
    {path:'feed-posts',component:FeedPostsComponent},
    {path:'post/:id',component:PostViewComponent},
    {path:'approve-accounts',component:ApproveAccountsComponent},
    {path:'delete-accounts',component:DeleteAccountsComponent},
    {path:'reported-posts',component:ReportedPostsComponent},
    {path:'add-class',component:AddClassComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
