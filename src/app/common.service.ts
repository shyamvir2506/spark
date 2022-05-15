import { Injectable } from "@angular/core";

@Injectable()
export class CommonService{
    constructor(private campaignName:string, private selectedUnit:string){ }
}