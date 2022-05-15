import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Campaign } from './common/campaign';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
  
@Injectable()
export class DataService {
    private handleError: HandleError;
    private params:HttpParams;
    private path:string="../api.php"; //'../api.php';//'http://localhost:80/spark/api.php';//'https://creative.exponential.com/creative/creative_dev/widgets/spark/v5/api.php';

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.params = new HttpParams();
        this.handleError = httpErrorHandler.createErrorHandler('DataService');
    }

    searchUnit(unit:string): Observable<Campaign[]> {
        this.params = new HttpParams().set('unit', unit);
        let res = this.http.get<Campaign[]>(this.path, { params:this.params })
            .pipe(catchError(this.handleError('getData', [])) );
        return res;
    }

    searchAllUnits(): Observable<string[]> {
        this.params = new HttpParams().set('allUnits', 'all');
        let res = this.http.get<string[]>(this.path, {params:this.params})
            .pipe(catchError(this.handleError('getData', [])) );
        return res;
    }

    uploadFile(file_data:any){
        let res = this.http.post<string>(this.path, file_data)
        .pipe(catchError(this.handleError('getData', [])) );
        return res;
    }
}