import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Password} from "../Model/Password";

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  host = "http://localhost:3000";

  constructor(private http:HttpClient ) {
  }

  getAllPasswords():Observable<Password[]>{
    return this.http.get<Password[]>(this.host+"/passwords");
  }

  addPassword(password: Password):Observable<Password>{
    return this.http.post<Password>(this.host+"/passwords",password);
  }
  deletePassword(id: number):Observable<Password>{
    return this.http.delete<Password>(this.host+"/passwords/"+id);
  }
}
