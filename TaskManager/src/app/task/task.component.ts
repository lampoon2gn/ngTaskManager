// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTable } from '@angular/material/table';
// import { TaskDataSource, TaskItem } from './task-datasource';
// import { HttpClientModule } from '@angular/common/http';
// import {HttpClient, HttpHeaders} from '@angular/common/http';

// @Component({
//   selector: 'app-task',
//   templateUrl: './task.component.html',
//   styleUrls: ['./task.component.css']
// })
// export class TaskComponent implements AfterViewInit, OnInit {
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatTable) table: MatTable<TaskItem>;
//   dataSource: TaskDataSource;


//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = ['QuoteType', 'QuoteID','Contact','Task','DueDate', 'TaskType'];
//   //constructor(service:TaskDataSource){}

//   ngOnInit() {
//     this.dataSource = new TaskDataSource();
//   }

//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.table.dataSource = this.dataSource;
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Quote } from '../Models/Quote.model';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../api.service';
import { Observable, of} from 'rxjs';

const EXAMPLE_DATA: Quote[] = [
  {QuoteType: 'abc', QuoteID: '1',Contact:'bob',Task:'do task 1',DueDate:'07/21/20',TaskType:'new'},
  {QuoteType: 'cba', QuoteID: '2',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '3',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '4',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '5',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '6',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '7',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '8',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '9',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '10',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},
  {QuoteType: 'cba', QuoteID: '11',Contact:'bob2',Task:'do task 2',DueDate:'07/22/20',TaskType:'old'},

  
];
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  displayedColumns = ['QuoteType', 'QuoteID','Contact','Task','DueDate', 'TaskType'];
  myDataSource = new MatTableDataSource<Quote>();//(EXAMPLE_DATA);
  //service:ApiService;

  constructor(private myService: ApiService){
    //this.service = _service;
  }
  //myDataSource = new MatTableDataSource(this.myService.getAll());

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    //this.myService.DelByID('2');
    this.myService.getAll().subscribe((things) => {
      //console.log(things);
      this.myDataSource.data = things;
      this.myDataSource.paginator = this.paginator;
      this.myDataSource.sort = this.sort;
  });
  }
}

