import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-employee-dialog',
  standalone: true,
  imports: [],
  templateUrl: './detail-employee-dialog.component.html',
  styleUrl: './detail-employee-dialog.component.scss',
})
export class DetailEmployeeDialogComponent {
  employee: any;

  constructor(
    public dialogRef: MatDialogRef<DetailEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.employee = { ...data.employee };
  }

  convertISOToDateTime(isoDate: string): string {
    const date: Date = new Date(isoDate);
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
