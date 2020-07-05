import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from './Models/Quote.model';
import { reg } from './Models/reg.model';
//import { Quote } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:44357/';
  //private apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
  constructor(private http:HttpClient) { }
  res:any;

  getAll(){
    return this.http.get<Quote[]>(this.apiUrl+"api/values");
  }

  getByID(ID:string){
    return this.http.get<Quote[]>(this.apiUrl+"api/values/"+ID);
  }

  DelByID(ID:string){
    return this.http.delete(this.apiUrl+"api/values/"+ID);
  }

  putQuote(newQuote:Quote):Observable<any>{
    return this.http.put(this.apiUrl+"api/values/"+ newQuote.QuoteID,newQuote);
  }

  temp:Quote = {QuoteType: 'abc', QuoteID: '1',Contact:'bob',Task:'do task 1',DueDate:'07/21/20',TaskType:'new'};
  
  postRegister(r:reg):Observable<any>{
    return this.http.post(this.apiUrl+"api/Account/Register",r);
  }

}
 