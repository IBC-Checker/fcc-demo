/* eslint-disable no-console */
import { Component, OnInit,ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AmendCommonService, CommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FilelistService, HOST_COMPONENT, ProductStateService, ResolverService, SearchLayoutService, UiProductService, UiTypeExpiryDetailsComponent, UiUndertakingDetailsComponent, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';
import { UiTypeExpiryDetailsClientComponent } from '../ui-type-expiry-details-client/ui-type-expiry-details-client.component';

@Component({
  selector: 'app-ui-undertaking-details-client',
  templateUrl: './ui-undertaking-details-client.component.html',
  styleUrls: ['./ui-undertaking-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: UiUndertakingDetailsClientComponent }]
})
export class UiUndertakingDetailsClientComponent extends UiUndertakingDetailsComponent implements OnInit {
  @ViewChild(UiTypeExpiryDetailsClientComponent, { read: UiTypeExpiryDetailsClientComponent }) public uiTypeAndExpiry:
  UiTypeExpiryDetailsClientComponent;
  
  constructor(protected translateService: TranslateService, protected eventEmitterService: EventEmitterService,
    protected productStateService: ProductStateService, protected commonService: CommonService,
    protected amendCommonService: AmendCommonService, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected searchLayoutService: SearchLayoutService,
    protected utilityService: UtilityService, protected resolverService: ResolverService,
    protected fileArray: FilelistService, protected dialogRef: DynamicDialogRef,
    protected currencyConverterPipe: CurrencyConverterPipe, protected uiProductService: UiProductService) { 
      super( translateService , eventEmitterService ,
         productStateService , commonService ,
         amendCommonService , confirmationService ,
         customCommasInCurrenciesPipe , searchLayoutService ,
         utilityService , resolverService ,
         fileArray , dialogRef ,
         currencyConverterPipe , uiProductService );
    }

  ngOnInit(): void {
    console.log("Inside the UiUndertakingDetailsClientComponent");
    super.ngOnInit();
  }

}
