import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  @Input('equipol') localId: number = 0;
  @Input('equipov') visitanteId: number = 0;
  @Input('seasonl') localSeason: string = '2122';
  @Input('seasonv') visitanteSeason: string = '2122';
  @Input('estrategial') estrategial: String = '4-3-3';
  @Input('estrategiav') estrategiav: String = '4-3-3';

  @Output('equipolocal') equipolocal: EventEmitter<number> = new EventEmitter();
  @Output('equipovisitante') equipovisitante: EventEmitter<number> = new EventEmitter();
  @Output('seasonlocal') seasonl : EventEmitter<String> = new EventEmitter();
  @Output('seasonvisitante')  seasonv : EventEmitter<String> = new EventEmitter();
  @Output('estrategiaLocal') estrategiaLocal : EventEmitter<String> = new EventEmitter();
  @Output('estrategiaVisitante')  estrategiaVisitante : EventEmitter<String> = new EventEmitter();



  constructor(private _formBuilder: FormBuilder,private router: RouterModule,private translate:TranslateService) {}

  ngOnInit(): void {
  }

}
