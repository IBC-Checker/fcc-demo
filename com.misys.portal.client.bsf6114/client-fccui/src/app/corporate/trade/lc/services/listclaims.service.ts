import { Injectable } from '@angular/core';
// import { CourierDetailsMap } from './courierdetails';
import { ListOfClaimsMap } from './listofclaims';
import { HttpClient } from '@angular/common/http';
import { FccGlobalConstantService } from 'fccui';


@Injectable({
  providedIn: 'root'
})

export class ListClaimsService {
    public listOfClaimsMap: ListOfClaimsMap[] = [];

    constructor(protected http: HttpClient, public fccGlobalConstantService: FccGlobalConstantService) { }

    getListOfClaims() {
        return this.listOfClaimsMap;
    }

    get numberOfClaims(): number {
        return this.listOfClaimsMap.length;
    }

    pushListOfClaimsMap(listOfClaimsMap: ListOfClaimsMap) {
        this.listOfClaimsMap.push(listOfClaimsMap);
    }

    resetListOfClaims() {
        const len = this.listOfClaimsMap.length;
        this.listOfClaimsMap.splice(0, len);
      }
}