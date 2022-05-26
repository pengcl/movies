import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  position;
  positionStatus: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentPosition);

  constructor() {
  }

  get currentPosition() {
    return this.position;
  }

  updatePositionStatus(position) {
    this.position = position;
    this.positionStatus.next(this.position);
  }

  getPositionStatus() {
    return this.positionStatus.asObservable();
  }
}
