import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ROUTES } from './routes';
import { ListComponent } from './components/list/list.component';
import { CommonModule } from '@angular/common';
import { BasicPlaygroundComponent } from './basic/playground.component';
import { CallbackComponent } from './basic/callbacks.component';
import { FormsModule } from '@angular/forms';
import { PromisesComponent } from './basic/promises.component';
import { ObservableComponent } from './basic/observable.component';
import { CreateComponent } from './basic/create.component';
import { OperatorsComponent } from './basic/operators.component';
import { PipeComponent } from './basic/pipe.component';
import { SubjectComponent } from './basic/subject.component';
import { GesturesComponent } from './example/gestures.component';
import { AutocompleteComponent } from './example/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListComponent,
    BasicPlaygroundComponent,
    CallbackComponent,
    PromisesComponent,
    ObservableComponent,
    CreateComponent,
    OperatorsComponent,
    PipeComponent,
    SubjectComponent,
    GesturesComponent,
    AutocompleteComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabledNonBlocking' }),
    NoopAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
