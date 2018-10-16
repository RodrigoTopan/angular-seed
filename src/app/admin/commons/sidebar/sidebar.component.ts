import { Component, OnInit } from '@angular/core';

declare const $: any;
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/account', title: 'Conta', icon: 'account-circle', class: '' },
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'events', title: 'Eventos', icon: 'event', class: '' },
  { path: 'activities', title: 'Atividades', icon: 'list', class: '' }
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
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  /*isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }*/
}
