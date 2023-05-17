import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Record } from '../models/record';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule],
  providers: [ApiService, provideAnimations()],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [MatPaginatorModule],
})
export class DashboardComponent {
  albums$ = new BehaviorSubject<Record[]>([
    { number: '', artist: '', album: '' },
  ]);

  constructor(private apiService: ApiService) {
    this.get1001albums();
  }

  get1001albums() {
    this.apiService.get1001albums().subscribe((albums: Record[]) => {
      this.albums$.next(albums);
    });
  }
}
