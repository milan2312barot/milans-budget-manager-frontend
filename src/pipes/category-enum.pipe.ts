import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseCategory } from '../shared/expense-category.enum';

@Pipe({
  name: 'categoryEnum',
  standalone: true
})
export class CategoryEnumPipe implements PipeTransform {
  transform(value: number): string {
    return ExpenseCategory[value] || 'Unknown';
  }
}