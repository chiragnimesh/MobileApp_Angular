import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Mobile } from '../../interfaces/mobile';
import { MobileService } from '../../services/mobile.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss',
})
export class MobileComponent implements OnInit {
  mobiles: Mobile[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;

  private http = inject(HttpClient);
  private mobileService = inject(MobileService);
  private router = inject(Router);

  ngOnInit() {
    this.fetchMobiles(); //Initial load

    const socket = new WebSocket('ws://localhost:8080/ws/mobiles');

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      this.fetchMobiles(); // refresh list when new data is added
    };
  }

  async fetchMobiles() {
    this.loading = true;
    try {
      const data = await lastValueFrom(this.mobileService.getMobiles());
      this.mobiles = data;
    } catch (error: any) {
      if (
        error.status === 404 ||
        error.error?.message?.includes('list is Empty')
      ) {
        this.mobiles = [];
        this.errorMessage = 'No mobile data available.';
      } else {
        this.mobiles = [];
        this.errorMessage =
          'Failed to load data. Backend service might be down.';
      }
    } finally {
      this.loading = false;
    }
  }

  async deleteMobile(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this mobile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await lastValueFrom(this.mobileService.deleteMobile(id));
        // await this.loadMobiles();
        Swal.fire('Deleted!', 'Mobile has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Failed!', 'Mobile could not be deleted.', 'error');
      }
    }
  }

  async updateMobile(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this mobile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // API call to update the mobile data
        const mobile = await lastValueFrom(
          this.mobileService.getMobileById(id)
        );
        this.router.navigate(['/admin'], {
          state: { mobileData: mobile },
        });
      } catch (error) {
        Swal.fire('Failed!', 'Mobile could not be updated.', 'error');
      }
    }
  }
}
