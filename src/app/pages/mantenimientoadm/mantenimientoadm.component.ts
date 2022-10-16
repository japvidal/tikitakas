import { ChangeDetectorRef, Component,  OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { FutfemserviceService } from 'src/app/services/persistencia/futfem.service';

@Component({
  selector: 'app-mantenimientoadm',
  templateUrl: './mantenimientoadm.component.html',
  styleUrls: ['./mantenimientoadm.component.css']
})
export class MantenimientoadmComponent implements OnDestroy {

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
