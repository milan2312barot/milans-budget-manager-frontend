import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseCategory } from '../../shared/expense-category.enum';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [FormsModule],
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

  categories = Object.values(ExpenseCategory); // Use the enum values for the dropdown

   isFormValid(): boolean {
    return (
      !!this.newExpense.date &&
      !!this.newExpense.description &&
      !!this.newExpense.category &&
      this.newExpense.amount != null
    );
  }

  addExpense() {
    // Generate a new ID for the expense
    const newId = this.expenses.length > 0 ? Math.max(...this.expenses.map(e => e.id)) + 1 : 1;

    // Add the new expense to the array
    const expense = {
      id: newId,
      ...this.newExpense
    };

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
  }
}
