import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpensesComponent } from "../expenses/expenses.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
   standalone: true,
    imports: [
    FormsModule,
    ExpensesComponent,
],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedDate: string = ''; // Property to store the selected date
}
