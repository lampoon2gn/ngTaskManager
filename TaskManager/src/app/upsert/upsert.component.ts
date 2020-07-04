
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {Quote} from '../Models/Quote.model';

// import { Component, Inject,OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';

// import { MatSort,Sort, SortDirection } from '@angular/material/sort';
// import { ApiService } from '../api.service';
// import { Observable, of} from 'rxjs';

// export interface DialogData {
//   quote:Quote
// }

// /**
//  * @title Dialog Overview
//  */
// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: 'upsert.component.html',
//   //styleUrls: ['dialog-overview-example.css'],
// })
// export class upsertComponent {

//   upsertQuote:Quote

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       width: '250px',
//       //['QuoteType', 'QuoteID','Contact','Task','DueDate', 'TaskType'];
//       data: {
//         QuoteType:this.upsertQuote.QuoteType,
//         QuoteID:this.upsertQuote.QuoteID,
//         Contact: this.upsertQuote.Contact,
//         Task: this.upsertQuote.Task,
//         DueDate: this.upsertQuote.DueDate,
//         TaskType: this.upsertQuote.TaskType
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       //this.animal = result;
//     });
//   }

// }

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-upsert-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: Quote) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }

import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Quote } from '../Models/Quote.model';
import { ApiService } from '../api.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';



export interface DialogData {
  QuoteType: string;
  QuoteID: string;
  Contact: string;
  Task: string;
  DueDate: string;
  TaskType: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'upsert.component.html',
  styleUrls: ['upsert.component.css'],
})
export class upsertComponent {

  quote:Quote;
  QuoteType: string;
  QuoteID: string;
  Contact: string;
  Task: string;
  DueDate: string;
  TaskType: string;

  constructor(public dialog: MatDialog,private myService: ApiService) {}

  //['QuoteType', 'QuoteID','Contact','Task','DueDate', 'TaskType'];
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        QuoteType: this.QuoteType, 
        QuoteID: this.QuoteID,
        Contact: this.Contact,
        Task: this.Task,
        DueDate: this.DueDate,
        TaskType: this.TaskType,
      }
    });
    //dialogRef.

    dialogRef.afterClosed().subscribe(result => {
      
      debugger;
      console.log('The dialog was closed');
      this.quote = result as Quote;

      this.myService.putQuote(this.quote).subscribe(data=>{
        console.log(data);
        
      })
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-upsert-dialog.html',
})
export class DialogOverviewExampleDialog {

  quoteid = new FormControl('', [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

