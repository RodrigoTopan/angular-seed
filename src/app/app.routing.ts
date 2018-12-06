import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegisterComponent } from './auth/registry/components/register/register.component';
import { EnterComponent as AdminEnterComponent } from './admin/dashboard/components/enter.component';
import { ListComponent as AdminEventListComponent } from './admin/events/components/list/list.component';
import { EditComponent as AdminEditEventComponent } from './admin/events/components/edit/edit.component';
import { DashboardComponent } from './admin/dashboard/components/dashboard.component';
import { ListComponent as AdminActivityListComponent } from './admin/activities/components/list/list.component';
import { ListComponent as AdminSpeakerListComponent } from './admin/speakers/components/list/list.component';
import { EditComponent as AdminSpeakerEditComponent } from './admin/speakers/components/edit/edit.component';
import { ListComponent as AdminLocationListComponent } from './admin/locations/components/list/list.component';
import { ViewComponent as AdminLocationViewComponent } from './admin/locations/components/view/view.component';
import { EditComponent as AdminLocationEditComponent } from './admin/locations/components/edit/edit.component';
import { ListComponent as AdminRoomListComponent } from './admin/rooms/components/list/list.component';
import { ListComponent as AdminSubscriberListComponent } from './admin/subscribers/components/list/list.component';
import { ListComponent as AdminSubscriptionListComponent } from './admin/subscriptions/components/list/list.component';
import { ListComponent as AdminFeedListComponent } from './admin/feeds/components/list/list.component';
import { ListComponent as AdminActivitiesFeedListComponent } from './admin/activitiesFeed/components/list/list.component';
import { UserComponent } from './admin/users/components/user.component';
/**
 * Quando a minha aplicação receber uma chamada na index, 
 * redirecionar para a minha porta de login
 */

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminEnterComponent,
    children: [
      // DASHBOARD
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      // EVENTS
      {
        path: 'events',
        component: AdminEventListComponent
      },
      {
        path: 'events/:id',
        component: AdminEventListComponent
      },
      {
        path: 'events/edit/:id',
        component: AdminEditEventComponent //Vai receber no constructor
      },
      // ACTIVITIES
      {
        path: 'activities',
        component: AdminActivityListComponent
      },
      {
        path: 'activities/:id',
        component: AdminActivityListComponent
      },
      {
        path: 'activities/edit/:id',
        component: AdminActivityListComponent
      },
      // SPEAKERS
      {
        path: 'speakers',
        component: AdminSpeakerListComponent
      },
      {
        path: 'speakers/:id',
        component: AdminSpeakerListComponent
      },
      {
        path: 'speakers/edit/:id',
        component: AdminSpeakerEditComponent //Vai receber no constructor
      },
      // LOCATIONS
      {
        path: 'locations',
        component: AdminLocationListComponent
      },
      {
        path: 'locations/:id',
        component: AdminLocationViewComponent
      },
      {
        path: 'locations/edit/:id',
        component: AdminLocationEditComponent
      },
      // ROOMS
      {
        path: 'rooms',
        component: AdminRoomListComponent
      },
      {
        path: 'rooms/:id',
        component: AdminRoomListComponent
      },
      {
        path: 'rooms/edit/:id',
        component: AdminRoomListComponent
      },
      // SUBSCRIPTIONS
      {
        path: 'subscribers/:id',
        component: AdminSubscriberListComponent
      }
    ]
  },
  {
    path: 'public',
    component: AdminEnterComponent,
    children: [
      // ACCOUNT
      {
        path: 'account',
        component: UserComponent
      },
      // FEED
      {
        path: 'feed',
        component: AdminFeedListComponent
      },
      {
        path: 'feed/:id',
        component: AdminActivitiesFeedListComponent
      },
      {
        path: 'feed/edit/:id',
        component: AdminFeedListComponent
      },
      {
        path: 'subscriptions',
        component: AdminSubscriptionListComponent
      },
      {
        path: 'subscriptions/:id',
        component: AdminSubscriptionListComponent
      },
      {
        path: 'subscriptions/edit/:id',
        component: AdminSubscriptionListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
