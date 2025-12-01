import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseCategory } from '../../shared/expense-category.enum';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { NgFor } from '@angular/common';
import { ExpensesService } from '../../shared/expenses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CommonModule // Added CommonModule for *ngIf
  ],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent {

  @Input() expenses: any[] = []; // Input property to receive expenses array
  @Output() expensesChange = new EventEmitter<any[]>(); // Output event to notify parent of changes
  // New expense object
  newExpense = {
    date: '',
    description: '',
    category: '',
    amount: null
  };

  successMessage: string = ''; // Added successMessage property

  constructor(private http: HttpClient, private expensesService: ExpensesService) {
    const indianTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    this.newExpense.date = indianTime.getFullYear() + '-' +
                          String(indianTime.getMonth() + 1).padStart(2, '0') + '-' +
                          String(indianTime.getDate()).padStart(2, '0');
  }

   get categories(): string[] {
    return Object.values(ExpenseCategory).filter(value => typeof value === 'string') as string[];
  }

   isFormValid(): boolean {
    return (
      !!this.newExpense.date &&
      !!this.newExpense.description &&
      !!this.newExpense.category &&
      this.newExpense.amount != null
    );
  }

  addExpense() {
    // Generate a new GUID for the expense
    const newId = uuidv4();

    // Create the expense object
    const expense = {
      id: newId,
      ...this.newExpense
    };

    const categoryValue: number = Object.entries(ExpenseCategory).find(
      ([key, value]) => value === this.newExpense.category
    )?.[0] as unknown as number || 0;

    // Use the shared service to add the expense
    this.expensesService.addExpense(expense).subscribe(
      () => {
        console.log('Expense added successfully');

        // Reset the form
        this.newExpense = {
          date: '',
          description: '',
          category: '',
          amount: null
        };

        // Display success message for 3 seconds
        this.successMessage = 'Item added successfully!!!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }
}
