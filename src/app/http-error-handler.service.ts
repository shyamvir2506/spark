import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { MessageService } from "./message.service";

export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandler {
    constructor(private msgSerive:MessageService){ }

    createErrorHandler = (serviceName ='') => {
        return <T>(operation='operation', result={} as T) => 
            this.errorHandler(serviceName, operation, result)
    }

    errorHandler<T>(serviceName='', operation='operation', result={} as T){
        return (error:HttpErrorResponse):Observable<T> => {
            const msg = error.error instanceof ErrorEvent ? 
                error.error.message : `server retured code ${error.status} with body ${error.error}`;

            this.msgSerive.add(`${serviceName} : ${operation} failed ${msg}`);
            return of( result );
        }
    }
}