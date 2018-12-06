import { Component, OnInit } from '@angular/core';

declare const $: any;
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ADMINROUTES: RouteInfo[] = [
  { path: '/public/account', title: 'Conta', icon: 'account_box', class: '' },
  //{ path: 'activities', title: 'Atividades', icon: 'list', class: '' },
  { path: '/public/feed', title: 'Feed', icon: 'list', class: '' },
  {
    path: '/public/subscriptions',
    title: 'Inscrições',
    icon: 'subscriptions',
    class: ''
  },
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/admin/events', title: 'Eventos', icon: 'event', class: '' },
  { path: '/admin/speakers', title: 'Palestrantes', icon: 'mic', class: '' },
  { path: '/admin/locations', title: 'Locais', icon: 'location_on', class: '' },
  { path: '/admin/rooms', title: 'Salas', icon: 'meeting_room', class: '' },
];

export const PUBLICROUTES: RouteInfo[] = [
  { path: '/public/account', title: 'Conta', icon: 'account_box', class: '' },
  { path: '/public/feed', title: 'Feed', icon: 'list', class: '' },
  {
    path: '/public/subscriptions',
    title: 'Inscrições',
    icon: 'subscriptions',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    const user_json = localStorage.getItem('user');
    const accessObj = JSON.parse(user_json);
    if(accessObj.user.role_id === 1)
      this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    else
      this.menuItems = PUBLICROUTES.filter(menuItem => menuItem);
  }
  /*isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }*/

  logout() {
    confirm('Você deseja mesmo sair ?');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:4200/login';
  }
}
