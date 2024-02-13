import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeDialogComponent implements OnInit {
  userName: string | null = '';
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  birthDate: Date | null = null;
  basicSalary: number | null = null;
  status: boolean = true;
  group: string | null = '';
  description: string | null = '';

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = {
      username: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      basicSalary: this.basicSalary,
      status: this.status,
      group: this.group,
      description: this.description,
    };

    this.dialogRef.close(formData);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
