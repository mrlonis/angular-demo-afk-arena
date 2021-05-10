import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'afk-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  pageTitle = 'hero List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredHeroes = this.performFilter(value);
  }

  filteredHeroes: IHero[] = [];
  heroes: IHero[] = [];

  constructor(private heroService: HeroService) { }

  performFilter(filterBy: string): IHero[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.heroes.filter((hero: IHero) =>
      hero.heroName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.heroService.getHeroes().subscribe({
      next: heroes => {
        this.heroes = heroes;
        this.filteredHeroes = this.heroes;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'hero List: ' + message;
  }

}
