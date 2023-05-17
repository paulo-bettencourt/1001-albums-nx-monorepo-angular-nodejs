import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { Record } from '../models/record';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule, MatCardModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  albums: Record[] = [];
  currentPageIndex = 0;
  pageSize = 12;
  isBackgrounda = true;

  constructor(private apiService: ApiService) {
    this.apiService.get1001albums().subscribe((albums: Record[]) => {
      this.albums = albums;
    });
  }

  selectedRecord(albumNumber: string) {
    console.log('album number: ', albumNumber);
    const selectedCard = document.getElementById('mat-card-' + albumNumber);
    if (selectedCard && selectedCard.style.backgroundColor !== 'green') {
      selectedCard.style.backgroundColor = 'green';
      selectedCard.style.color = 'white';
    } else if (selectedCard) {
      selectedCard.style.backgroundColor = '';
      selectedCard.style.color = 'black';
    }
  }
}
