import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { HeaderComponent } from './shared/components/header/header/header.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HeaderComponent],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
