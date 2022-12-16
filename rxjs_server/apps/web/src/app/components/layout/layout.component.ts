import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MENU, Label } from '../../routes';

@Component({
  selector: 'rxjs-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  routes: Label[] = MENU;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      // tap(v => console.log(v)),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
