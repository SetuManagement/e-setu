import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { Route, RouterModule } from '@angular/router';

const Routes: Route[] = [
  {
    path: '',
    component: LayoutComponent
  }
];

@NgModule({
  declarations: [
    LayoutComponent,
    HorizontalComponent,
    VerticalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes)
  ]
})
export class LayoutModule { }
