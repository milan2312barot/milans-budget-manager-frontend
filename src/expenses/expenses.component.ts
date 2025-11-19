import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddExpensesComponent } from "../add-expenses/add-expenses.component";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    CurrencyPipe,
    CommonModule,
    FormsModule,
    AddExpensesComponent
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

}
