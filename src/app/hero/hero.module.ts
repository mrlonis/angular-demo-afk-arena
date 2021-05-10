import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { RouterModule } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroDetailGuard } from './hero-detail.guard';


@NgModule({
  declarations: [HeroListComponent, HeroDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'heroes', component: HeroListComponent },
      {
        path: 'heroes/:id',
        canActivate: [HeroDetailGuard],
        component: HeroDetailComponent
      }
    ]),
  ]
})
export class HeroModule { }
