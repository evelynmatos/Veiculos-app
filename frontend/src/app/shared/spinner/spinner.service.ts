import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  startSpinner() {
    this._isLoading.next(true);
  }

  stopSpinner() {
    this._isLoading.next(false);
  }
}
