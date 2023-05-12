import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  albums$ = new Subject();

  constructor(private apiService: ApiService) {
    this.get1001albums();
  }

  get1001albums() {
    this.apiService.get1001albums().subscribe((albums: any) => {
      this.albums$.next(albums);
    });
  }
}
