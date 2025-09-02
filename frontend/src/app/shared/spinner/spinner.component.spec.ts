import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { BehaviorSubject } from 'rxjs';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;
  let isLoadingSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    const spinnerServiceMock = {
      isLoading$: isLoadingSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
      providers: [
        { provide: SpinnerService, useValue: spinnerServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when isLoading$ emits true', () => {
    isLoadingSubject.next(true);
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('.spinner-wrapper');
    expect(spinnerElement).toBeTruthy();
  });

  it('should hide spinner when isLoading$ emits false', () => {
    isLoadingSubject.next(false);
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('.spinner-wrapper');
    expect(spinnerElement).toBeFalsy();
  });  
});
