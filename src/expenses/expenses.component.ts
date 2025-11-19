import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    CurrencyPipe,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  selectedDate: string = ''; // Property to store the selected date
  expenses: any[] = []; // Initialize an empty array for expenses
  sortState: 'none' | 'asc' | 'desc' = 'none'; // Track sorting state
  sortColumn: string = ''; // Track the column being sorted

  // New expense object
  newExpense = {
    date: '',
    description: '',
    category: '',
    amount: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the expenses data from the JSON file
    this.http.get<any[]>('assets/expenses.json').subscribe(data => {
      this.expenses = data;
    });
  }

  get filteredExpenses() {
    // Filter expenses based on the selected date
    return this.selectedDate
      ? this.expenses.filter(expense => expense.date === this.selectedDate)
      : this.expenses;
  }

  sortByColumn(column: string) {
    // If the same column is clicked, toggle the sorting order
    if (this.sortColumn === column) {
      this.sortState = this.sortState === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set it to ascending order
      this.sortState = 'asc';
      this.sortColumn = column;
    }

    // Sort the expenses array dynamically based on the column
    this.expenses.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortState === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortState === 'asc' ? 1 : -1;
      }
      return 0;
    });
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

    // Reset the form
    this.newExpense = {
      date: '',
      description: '',
      category: '',
      amount: null
    };

    // Optionally, save the updated expenses to the JSON file (requires backend support)
    // this.saveExpensesToJson();
  }

  // Uncomment this method if you have backend support to save the updated JSON
  // saveExpensesToJson() {
  //   this.http.post('assets/expenses.json', this.expenses).subscribe(() => {
  //     console.log('Expenses saved successfully!');
  //   });
  // }

  isFormValid(): boolean {
    return (
      !!this.newExpense.date &&
      !!this.newExpense.description &&
      !!this.newExpense.category &&
      this.newExpense.amount != null
    );
  }
}
