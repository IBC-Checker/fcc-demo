import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService, FccGlobalConstant, FccGlobalConstantService, HideShowDeleteWidgetsService } from 'fccui';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientHideShowDeleteWidgetsService extends HideShowDeleteWidgetsService {
  public limitsWidgetComponent = new BehaviorSubject(false);
  constructor(protected http: HttpClient,
      protected commonService: CommonService,
      protected fccGlobalConstantService: FccGlobalConstantService) {
      super(http,commonService,fccGlobalConstantService);
    }
  }
