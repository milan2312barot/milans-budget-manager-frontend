import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expensesUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Notify components when expenses are updated
  getExpensesUpdatedListener() {
    return this.expensesUpdated.asObservable();
  }

  // Fetch expenses
  getExpenses() {
    return this.http.get<any[]>('https://localhost:7246/api/Expense');
  }

  // Add a new expense
  addExpense(expense: any) {
    return this.http.post('https://localhost:7246/api/Expense', expense).pipe(
      tap(() => {
        this.expensesUpdated.next(); // Notify listeners on success
      })
    );
  }
}