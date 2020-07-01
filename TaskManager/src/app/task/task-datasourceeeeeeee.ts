import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Quote} from '../Models/Quote.model';




//['Quote Type', 'Quote#','Contact','Task','Due Date', 'Task Type','']
// TODO: Replace this with your own data model type
export interface TaskItem {
  QuoteType: string;
  QuoteID: string;
  Contact: string;
  Task: string;
  DueDate: string;
  TaskType: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Quote[] = [
  {QuoteType: 'abc', QuoteID: '1',Contact:'bob',Task:'do task 1',DueDate:'07/21/20',TaskType:'new'},
  {QuoteType: 'cba', QuoteID: '2',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  
];
 
/**
 * Data source for the Task view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable()
export class TaskDataSource extends DataSource<Quote> {
  //data: Quote[] = EXAMPLE_DATA;

  //source = new TaskDataSource
  paginator: MatPaginator;
  sort: MatSort;
  private apiUrl = 'https://localhost:44357/api/values';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
  }
  data: Observable<Quote[]>  = this.http.get<Quote[]>(this.apiUrl,this.httpOptions);

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Quote[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      //observableOf(this.http.get(this.apiUrl,this.httpOptions)),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Quote[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Quote[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        //['Quote Type', 'Quote#','Contact','Task','Due Date', 'Task Type','']
        case 'QuoteType': return compare(a.QuoteType, b.QuoteType, isAsc);
        case 'QuoteID': return compare(+a.QuoteID, +b.QuoteID, isAsc);
        case 'Contact': return compare(a.Contact, b.Contact, isAsc);
        case 'Task': return compare(a.Task, b.Task, isAsc);
        case 'DueDate': return compare(a.DueDate, b.DueDate, isAsc);
        case 'TaskType': return compare(a.TaskType, b.TaskType, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
