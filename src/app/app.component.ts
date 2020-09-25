import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Register',
      url: '/register',
      icon: 'information'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'information'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Category',
      url: '/category/1',
      icon: 'apps'
    },
    {
      title: 'Cart',
      url: '/cart',
      icon: 'cart'
    },{
      title: 'Show Category',
      url: '/category/2',
      icon: 'apps'
    },
    {
      title: 'All Category',
      url: '/list-of-category',
      icon: 'list'
    },
    {
      title: 'Branch Office',
      url: '/branch-office',
      icon: 'business'
    },
    {
      title: 'Tracing',
      url: '/tracing',
      icon: 'information'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'profile'
    }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }

  goProfile(){
    this.menu.close()
    this.router.navigate(['/profile'])
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
