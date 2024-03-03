import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { employees } from '../model/data';
import { employee } from '../model/employee.types';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { DetailEmployeeDialogComponent } from '../detail-employee-dialog/detail-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    AngularToastifyModule,
    MatDialogModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  public employees = employees;
  public filteredEmployees: employee[] = [];
  public paginatorEmployees: employee[] = [];
  public searchInputControl: UntypedFormControl = new UntypedFormControl();
  protected _unsubscribeAll: Subject<any> = new Subject<any>();
  public debounce = 500;
  public isAscendingOrder = true;
  public pageSize = 13;
  public selectedRowIndex: number | null = null;

  constructor(
    protected _changeDetectorRef: ChangeDetectorRef,
    private toastify: ToastService,
    private dialog: MatDialog
  ) {
    this.filteredEmployees = employees;
    this.paginatorEmployees = this.filteredEmployees.slice(0, this.pageSize);
  }

  ngOnInit(): void {
    this.searchInputControl.valueChanges
      .pipe(debounceTime(this.debounce), takeUntil(this._unsubscribeAll))
      .subscribe((query) => {
        this.filteredEmployees = query
          ? this.filterEmployees(query)
          : employees;
        this.updatePaginatorEmployees();
      });
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatorEmployees = this.filteredEmployees.slice(
      startIndex,
      endIndex
    );
  }

  deleteEmployee(index: number): void {
    this.filteredEmployees.splice(index, 1);
    this.toastify.success('Employee has been deleted');
    this.updatePaginatorEmployees();
  }

  filterEmployees(query: string): employee[] {
    return employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
        employee.email.toLowerCase().includes(query.toLowerCase())
    );
  }

  updatePaginatorEmployees(): void {
    this.paginatorEmployees = this.filteredEmployees.slice(0, this.pageSize);
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleSorting(ascending: boolean) {
    if (ascending) {
      this.paginatorEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else {
      this.paginatorEmployees.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
  }  

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== null) {
        const hasData = Object.entries(result).some(([key, value]) => {
          return typeof value !== 'boolean' && value !== null && value !== '';
        });

        if (hasData) {
          this.filteredEmployees.unshift(result);
          this.updatePaginatorEmployees();
          this._changeDetectorRef.markForCheck();
        }
      }
    });
  }

  openEditEmployeeDialog(employee: employee): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '600px',
      data: { employee },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateEmployee(result);
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  updateEmployee(updatedEmployee: any): void {
    const index = this.paginatorEmployees.findIndex(
      (emp) => emp.username === updatedEmployee.username
    );
    if (index !== -1) {
      this.paginatorEmployees[index] = updatedEmployee;
    }
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

  openDetailEmployeeDialog(item: employee): void {
    const dialogRef = this.dialog.open(DetailEmployeeDialogComponent, {
      width: '800px',
      data: { employee: item },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
