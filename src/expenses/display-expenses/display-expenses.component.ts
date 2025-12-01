import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { sortByColumn, SortState } from '../../shared/sorting-utils';
import { ExpensesService } from '../../shared/expenses.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-display-expenses',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    DatePipe, // Added DatePipe for date formatting
    MatProgressSpinnerModule // Added Material spinner module
],
  templateUrl: './display-expenses.component.html',
  styleUrl: './display-expenses.component.css',
  providers: [DatePipe] // Added DatePipe to the providers array
})
export class DisplayExpensesComponent {
  expenses: any[] = []; // Initialize an empty array for expenses
  sortState: SortState = 'none'; // Use the shared SortState type
  sortColumn: string = ''; // Track the column being sorted
  private expensesSub: Subscription | null = null; // Initialize as null
  isLoading: boolean = true; // Property to track loading state
  errorMessage: string = ''; // Property to store error messages

  constructor(private expensesService: ExpensesService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.sortColumn = 'date'; // Set initial sort column to 'date'
    this.sortState = 'desc'; // Set initial sort state to 'desc'
    this.fetchExpenses();

    // Subscribe to updates
    this.expensesSub = this.expensesService.getExpensesUpdatedListener().subscribe(() => {
      this.fetchExpenses();
    });
  }

  fetchExpenses() {
    this.isLoading = true; // Set loading to true before fetching data
    this.errorMessage = ''; // Clear any previous error messages
    this.expensesService.getExpenses().subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          // Sort expenses by date in descending order after fetching
          this.expenses = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
          console.error('Unexpected response format:', response);
          this.errorMessage = 'Failed to load expenses. Please try again later.';
        }
        this.isLoading = false; // Set loading to false after data is loaded
      },
      (error) => {
        console.error('Error fetching expenses:', error);
        this.errorMessage = 'Unable to fetch expenses. Please check your connection and try again.';
        this.isLoading = false; // Set loading to false in case of error
      }
    );
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

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }
  }
}
