import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,  OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  
  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private translate: TranslateService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    translate.addLangs(['es', 'español']);
    translate.setDefaultLang('es');
    translate.use('es');
  }

  fillerNav = [['MENU.HOME','home','inicio'],['MENU.DATA','person','crud'],['MENU.DATACENTER','manage_accounts','crudadm'],['MENU.MATCHDAY','sports_soccer','partido'],['MENU.LOGIN','login','login']];

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
