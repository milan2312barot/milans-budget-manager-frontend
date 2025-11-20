import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { sortByColumn, SortState } from '../../shared/sorting-utils';

@Component({
  selector: 'app-display-expenses',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './display-expenses.component.html',
  styleUrl: './display-expenses.component.css'
})
export class DisplayExpensesComponent {

  expenses: any[] = []; // Initialize an empty array for expenses
  sortState: SortState = 'none'; // Use the shared SortState type
  sortColumn: string = ''; // Track the column being sorted

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Fetch the expenses data from the JSON file
    this.http.get<any[]>('assets/expenses.json').subscribe(data => {
      this.expenses = data;
    });
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

    this.expenses = sortByColumn(this.expenses, column, this.sortState);
  }
}
