import { Routes } from '@angular/router';
import { CallbackComponent } from './basic/callbacks.component';
import { PromisesComponent } from './basic/promises.component';
import { ObservableComponent } from './basic/observable.component';
import { CreateComponent } from './basic/create.component';
import { PipeComponent } from './basic/pipe.component';
import { OperatorsComponent } from './basic/operators.component';
import { SubjectComponent } from './basic/subject.component';
import { DragAndDropComponent } from './example/drag-and-drop.component';
import { AutocompleteComponent } from './example/autocomplete.component';
import { BasicPlaygroundComponent } from './basic/playground.component';
import { GesturesComponent } from './example/gestures.component';

export interface Label {
  label?: string,
  path?: any,
  redirectTo?: any,
  pathMatch?: any,
  component?: any
}
export const MENU: Label[] = [
  {
    label: 'Intro',
  },
  {
    path: '',
    redirectTo: 'observable',
    pathMatch: 'full'
  },
  {
    path: 'playground',
    component: BasicPlaygroundComponent
  },
  {
    label: 'Asynchroniczność',
  },
  {
    path: 'callbacks',
    component: CallbackComponent
  },
  {
    path: 'promises',
    component: PromisesComponent
  },
  {
    path: 'observable',
    component: ObservableComponent
  },
  {
    label: 'Tworzenie strumieni',
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'pipe',
    component: PipeComponent
  },
  {
    path: 'operators',
    component: OperatorsComponent
  },
  {
    label: 'Subject',
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    label: 'Examples',
  },
  {
    path: 'drag-and-drop',
    component: DragAndDropComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  },
  {
    path: 'gestures',
    component: GesturesComponent
  }
];

export const ROUTES: Routes = MENU.filter(v => !v.label);
