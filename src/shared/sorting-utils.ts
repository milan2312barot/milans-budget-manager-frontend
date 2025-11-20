export type SortState = 'none' | 'asc' | 'desc';

/**
 * Sorts an array of objects dynamically based on a column and sort state.
 * @param data The array of objects to sort.
 * @param column The column to sort by.
 * @param sortState The current sort state ('asc', 'desc', or 'none').
 * @returns The sorted array.
 */
export function sortByColumn<T>(data: T[], column: keyof T, sortState: SortState): T[] {
  return data.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (valueA < valueB) {
      return sortState === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortState === 'asc' ? 1 : -1;
    }
    return 0;
  });
}