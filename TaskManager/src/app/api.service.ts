import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Quote } from './Models/Quote.model';
import { reg } from './Models/reg.model';
import { login } from './Models/login.model';
//import { Quote } from '@angular/compiler';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private apiUrl = 'https://localhost:44357/';
  private apiUrl = 'https://webapipractice20200710123335.azurewebsites.net/';
  constructor(private http:HttpClient) { }
  res:any;

  getAll(){
    return this.http.get<Quote[]>(this.apiUrl+"api/values");
  }

  getByID(ID:string){
    return this.http.get<Quote[]>(this.apiUrl+"api/values/"+ID).pipe(
      catchError(this.handleError('getByID',[]))
    )
  }

  DelByID(ID:string){
    //debugger;
    return this.http.delete(this.apiUrl+"api/values/"+ID);
  }

  putQuote(newQuote:Quote):Observable<any>{
    return this.http.put(this.apiUrl+"api/values/"+ newQuote.QuoteID,newQuote);
  }

  temp:Quote = {QuoteType: 'abc', QuoteID: '1',Contact:'bob',Task:'do task 1',DueDate:'07/21/20',TaskType:'new'};
  
  postRegister(r:reg):Observable<any>{
    return this.http.post(this.apiUrl+"api/Account/Register",r)//.pipe(
      //catchError(this.handleError('postRegister',[]))
    //)
  }

  postLogin(l:login){
    let body = new URLSearchParams();
    body.set("grant_type","password");
    body.set("username",l.userName);
    body.set("password",l.Password);
    
    return this.http.post(this.apiUrl+"token",body.toString())//.subscribe(
    //   (data:any)=>{
    //     localStorage.setItem('userToken',data.access_token);
    //   },
    //   (err:HttpErrorResponse)=>{
    //     alert("Email/Password Incorrect!")
    //   }
    // )
    
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${Object.keys(error.error.ModelState).map(it=>error.error.ModelState[it])}`);
  
      return of(result as T);
    };
  }
  
}
 