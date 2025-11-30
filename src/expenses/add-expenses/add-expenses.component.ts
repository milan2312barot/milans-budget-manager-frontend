import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseCategory } from '../../shared/expense-category.enum';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [FormsModule, NgFor],
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

  constructor(private http: HttpClient) {
    
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

    // Make the HTTP POST request to add the expense
    this.http.post('https://localhost:7246/api/Expense', expense).subscribe(
      response => {
        console.log('Expense added successfully:', response);

        // Add the new expense to the array
        this.expenses.push(expense);

        // Emit the updated expenses array
        this.expensesChange.emit(this.expenses);

        // Reset the form
        this.newExpense = {
          date: '',
          description: '',
          category: '',
          amount: null
        };
      },
      error => {
        console.error('Error adding expense:', error);
      }
    );
  }
}
