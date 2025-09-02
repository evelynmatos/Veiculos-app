import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
import { skip } from 'rxjs';

describe('SpinnerService', () => {
    let service: SpinnerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SpinnerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit true when startSpinner is called', (done) => {
        service.isLoading$.subscribe(value => {
            if (value === true) {
                expect(value).toBeTrue();
                done();
            }
        });
        service.startSpinner();
    });

    it('should emit false when stopSpinner is called', (done) => {
        service.startSpinner();
        service.isLoading$.pipe(skip(1)).subscribe(value => {
            expect(value).toBeFalse();
            done();
        });
        service.stopSpinner();
    });
});
