import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    messages:string[] = [];

    add(msg:string){
        this.messages.push(msg);
    }

    clear(){
        this.messages = [];
    }
}