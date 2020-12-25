import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './AuthComponents/sign-up/sign-up.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { FeedComponent } from './UserComponents/feed/feed.component';
import { OnePostComponent } from './UserComponents/one-post/one-post.component';
import { FeedPostsComponent } from './UserComponents/feed-posts/feed-posts.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { AdminFeedComponent } from './AdminComponents/admin-feed/admin-feed.component';
import { AdminPostComponent } from './AdminComponents/admin-post/admin-post.component';
import { GroupComponent } from './GroupComponents/group/group.component';
import { GroupUserComponent } from './GroupComponents/group-user/group-user.component';
import { DashboardComponent } from './AdminComponents/dashboard/dashboard.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApproveAccountsComponent } from './AdminComponents/approve-accounts/approve-accounts.component';
import { DeleteAccountsComponent } from './AdminComponents/delete-accounts/delete-accounts.component';
import { ReportedPostsComponent } from './AdminComponents/reported-posts/reported-posts.component';
import { EditProfileComponent } from './UserComponents/edit-profile/edit-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClassComponent } from './AdminComponents/add-class/add-class.component';
import { PostViewComponent } from './UserComponents/post-view/post-view.component';
import { CommentComponent } from './UserComponents/comment/comment.component';
import { NotificationComponent } from './UserComponents/notification/notification.component';
import { SavedPostComponent } from './UserComponents/saved-post/saved-post.component';
import { AddGroupComponent } from './UserComponents/add-group/add-group.component';
import { GroupPostComponent } from './UserComponents/group-post/group-post.component';
import { GroupViewComponent } from './UserComponents/group-view/group-view.component';


// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://a29b436625fa.ngrok.io', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    FeedComponent,
    OnePostComponent,
    FeedPostsComponent,
    ProfileComponent,
    AdminFeedComponent,
    AdminPostComponent,
    GroupComponent,
    GroupUserComponent,
    DashboardComponent,
    AdminHomeComponent,
    ApproveAccountsComponent,
    DeleteAccountsComponent,
    ReportedPostsComponent,
    EditProfileComponent,
    AddClassComponent,
    PostViewComponent,
    CommentComponent,
    NotificationComponent,
    SavedPostComponent,
    AddGroupComponent,
    GroupPostComponent,
    GroupViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
