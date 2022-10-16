import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';
import { ApifutfemService } from 'src/app/services/apiservice/apifutfem.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements  OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private router: Router,private translate:TranslateService,changeDetectorRef: ChangeDetectorRef,media: MediaMatcher,private futfemService:FutfemserviceService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    translate.addLangs(['es', 'español']);
    translate.setDefaultLang('es');
    translate.use('es');
    this.futfemService.cargarPosiciones();
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
