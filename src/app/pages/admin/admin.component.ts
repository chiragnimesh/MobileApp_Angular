import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { MobileService } from '../../services/mobile.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { MobileComponent } from "../mobile/mobile.component";
import { Router } from '@angular/router';
import { Mobile } from '../../interfaces/mobile';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private mobileService = inject(MobileService);
  private router = inject(Router);

  isRamFocused = false;
  isStorageFocused = false;
  model = signal<any>({});
  cover = signal<String | null>(null);
  cover_file = signal<any>(null);
  showError = signal<boolean>(false);
  mobileData: any = {};


  ngOnInit(): void {
    const stateData = history.state.mobileData;
    if (stateData) {
      this.mobileData = { ...stateData };
      this.model.set({ ...stateData });
      // console.log(stateData);
      if (stateData.image) {
        this.cover.set(stateData.image);
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover()) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover()) {
        this.showError.set(true);
      }
      return;
    }
    this.saveMobile(form.value, form);
    this.isRamFocused = false;
    this.isStorageFocused = false;
  }

  async saveMobile(formValue: any, form: NgForm) {
    try {
      const payload = {
        ...formValue,
        image: this.cover(),
      };
      console.log('Payload sent to backend:', payload);

      if (this.mobileData?.id) {
        // Update mode
        await lastValueFrom(
          this.mobileService.updateMobile(this.mobileData.id, payload)
        );
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Mobile updated successfully!',
        });
      } else {
        await lastValueFrom(this.mobileService.addMobile(payload));
        console.log('Mobile added successfully!');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Mobile added successfully!',
        });
      }

      form.resetForm(); // this will reset the form
      this.model.set({}); 
      this.cover.set(null); // 🔥 Clears image preview
      this.cover_file.set(null);
      this.router.navigate(['/mobile']);
    } catch (e) {
      console.error('Error adding mobile:', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to add mobile. Please try again.',
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // this.cover_file = file;
      this.cover_file.set(file);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        // this.cover = dataUrl;
        this.cover.set(dataUrl);
        console.log('image: ', this.cover);
      };
      reader.readAsDataURL(file);
      // this.showError = false;
      this.showError.set(false);
    }
  }
}
