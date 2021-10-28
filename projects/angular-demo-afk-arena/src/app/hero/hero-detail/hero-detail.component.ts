import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'afk-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  hero: IHero | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private heroService: HeroService) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.heroService.getProduct(id).subscribe({
      next: (hero) => (this.hero = hero),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/heroes']);
  }
}
