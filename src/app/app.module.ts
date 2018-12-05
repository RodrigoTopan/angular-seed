import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDialog,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule,
  MatChipsModule,
  MatToolbarModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule
} from '@angular/material';
import { LoginModule } from './auth/login/login.module';
import { LoginRoutingModule } from './auth/login/login-routing.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
//import { RegistryComponent } from './auth/registry/components/registry.component';
import { RegistryModule } from './auth/registry/registry.module';
//Pacote do Administrador
import { EventsModule as AdminEventModule } from './admin/events/event.module';
import { SpeakersModule as AdminSpeakerModule } from './admin/speakers/speaker.module';
import { ActivitiesModule as AdminActivityModule } from './admin/activities/activity.module';
import { ActivitiesModule as AdminActivityFeedModule } from './admin/activitiesFeed/activity.module';
import { LocationsModule as AdminLocationModule } from './admin/locations/location.module';
import { RoomsModule as AdminRoomModule } from './admin/rooms/room.module';
import { SubscribersModule as AdminSubscriberModule } from './admin/subscribers/subscriber.module';

import { SubscriptionsModule as AdminSubscriptionModule } from './admin/subscriptions/subscription.module';
import { FeedsModule as AdminFeedModule } from './admin/feeds/feed.module';

//Dashboard
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { UsersModule } from './admin/users/user.module';
import { MaskDirective } from './shared/directive/mask.directive';
//Pacote do Público
import { EventDialogComponent as AdminEventDialogComponent } from './admin/events/components/event-dialog/event-dialog.component';
import { ActivityDialogComponent as AdminActivityDialogComponent } from './admin/activities/components/activity-dialog/activity-dialog.component';
import { SpeakerDialogComponent as AdminSpeakerDialogComponent } from './admin/speakers/components/speaker-dialog/speaker-dialog.component';
import { LocationDialogComponent as AdminLocationDialogComponent } from './admin/locations/components/location-dialog/location-dialog.component';
import { RoomDialogComponent as AdminRoomDialogComponent } from './admin/rooms/components/room-dialog/room-dialog.component';
import { ActivityDialogComponent as AdminActivityFeedDialogComponent } from './admin/activitiesFeed/components/activity-dialog/activity-dialog.component';

import { InterceptorModule } from '../app/auth/login/interceptor.module';
import { HttpClientModule } from '@angular/common/http';
import { ActivitiesModule } from './admin/activitiesFeed/activity.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminEventDialogComponent,
    AdminSpeakerDialogComponent,
    AdminLocationDialogComponent,
    AdminRoomDialogComponent,
    AdminActivityDialogComponent,
    AdminActivityFeedDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    LoginModule,
    LoginRoutingModule,
    RegistryModule,
    AdminEventModule,
    InterceptorModule,
    AdminActivityModule,
    AdminSpeakerModule,
    AdminLocationModule,
    DashboardModule,
    UsersModule,
    AdminActivityFeedModule,
    AdminFeedModule,
    AdminRoomModule,
    AdminSubscriptionModule,
    AdminSubscriberModule,
    AppRoutingModule //It must be the last imported module
  ],
  providers: [],
  entryComponents: [
    AdminEventDialogComponent,
    AdminSpeakerDialogComponent,
    AdminLocationDialogComponent,
    AdminRoomDialogComponent,
    AdminActivityDialogComponent,
    AdminActivityFeedDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
