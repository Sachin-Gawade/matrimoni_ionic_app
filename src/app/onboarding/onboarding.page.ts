import { Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingPage implements AfterViewInit {
  @ViewChild('swiperEl', { static: false }) swiperEl?: ElementRef;

  constructor(private router: Router) {}

  // Track if the current slide is the last one to toggle header action.
  isLastSlide = false;
  totalSlides = 0;

  // After the view initializes, read Swiper instance to set initial state.
  ngAfterViewInit(): void {
    queueMicrotask(() => this.updateSlideState());
  }

  // Called by Swiper's slidechange event; updates header button label.
  onSlideChange() {
    this.updateSlideState();
  }

  // Helper: compute whether we're on the last slide.
  private updateSlideState() {
    const hostEl = this.swiperEl?.nativeElement as any;
    const swiper = hostEl?.swiper;
    if (!swiper || !hostEl) return;

    // Determine total slides using DOM to avoid edge cases in some builds
    // where swiper.slides length may include duplicates.
    const domSlides = (hostEl as HTMLElement).querySelectorAll('swiper-slide');
    this.totalSlides = domSlides.length;

    // Active index from Swiper (0-based)
    const activeIndex: number = swiper.activeIndex ?? 0;
    this.isLastSlide = this.totalSlides > 0 && activeIndex >= this.totalSlides - 1;
  }

  next() {
    const el = this.swiperEl?.nativeElement as any;
    el?.swiper?.slideNext();
  }

  skip() {
    // Navigate to tabs without replacing history so Back returns to onboarding
    this.router.navigateByUrl('/tabs');
  }

  register() {
    // Go to dedicated Register page per design
    this.router.navigateByUrl('/register');
  }

  login() {
    // Navigate to dedicated Login page per design
    this.router.navigateByUrl('/login');
  }

  changeLanguage() {
    // TODO: open language selector modal
  }

  // Header action: Next on slides 1..n-1, Skip on last slide
  onHeaderAction() {
    if (this.isLastSlide) {
      this.skip();
    } else {
      this.next();
    }
  }

  // Compute label for header action button
  get headerActionLabel(): string {
    return this.isLastSlide ? 'Skip →' : 'Next →';
  }
}
