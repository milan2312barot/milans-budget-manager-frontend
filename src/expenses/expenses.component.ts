import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddExpensesComponent } from "./add-expenses/add-expenses.component";
import { DisplayExpensesComponent } from './display-expenses/display-expenses.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    AddExpensesComponent,
    DisplayExpensesComponent
],
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  selectedDate: string = ''; // Property to store the selected date
 

  // New expense object
  newExpense = {
    date: '',
    description: '',
    category: '',
    amount: null
  };

  

}
