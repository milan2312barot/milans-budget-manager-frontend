import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ExpensesService } from '../../shared/expenses.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.css'],
  imports: [
    MatIconModule // Import MatIconModule to use mat-icon
  ],
  standalone: true
})
export class DeleteExpenseComponent {
  @Input() expenseId!: number; // Receive the expense ID as input
  @Output() expenseDeleted = new EventEmitter<number>(); // Emit the ID of the deleted expense

  constructor(private expensesService: ExpensesService, private dialog: MatDialog) {}

  deleteExpense(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this expense?'
      },
      panelClass: 'custom-dialog-container' // Add custom CSS class for dialog container
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.expensesService.deleteExpense(this.expenseId).subscribe(
          () => {
            console.log(`Expense with ID ${this.expenseId} deleted successfully.`);
            this.expenseDeleted.emit(this.expenseId); // Notify parent component
          },
          (error) => {
            console.error(`Failed to delete expense with ID ${this.expenseId}:`, error);
          }
        );
      }
    });
  }
}