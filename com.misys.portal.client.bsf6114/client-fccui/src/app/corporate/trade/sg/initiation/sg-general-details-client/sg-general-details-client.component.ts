import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FccTaskService, FileHandlingService, FilelistService, FormModelService, HOST_COMPONENT, PhrasesService, ProductMappingService, ProductStateService, ResolverService, SearchLayoutService, SgGeneralDetailsComponent, SgProductService, TransactionDetailService, UtilityService, expiryDateLessThanCurrentDate } from 'fccui';
import { DialogService, ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-sg-general-details-client',
  templateUrl: './sg-general-details-client.component.html',
  styleUrls: ['./sg-general-details-client.component.scss'],
  providers: [
		{ provide: HOST_COMPONENT, useExisting: SgGeneralDetailsClientComponent },
	],
})
export class SgGeneralDetailsClientComponent extends SgGeneralDetailsComponent implements OnInit {
  contextPath = this.fccGlobalConstantService.contextPath;
  servletName = window[FccGlobalConstant.SERVLET_NAME]; //'/portal'; 
  restServletName = window[FccGlobalConstant.RESTSERVLET_NAME]; //'/restportal'; 
  baseUrl = this.contextPath + this.restServletName + '/';
  hijariDate = this.baseUrl + 'getHijriDate';

  constructor(protected commonService: CommonService, protected stateService: ProductStateService,
    protected eventEmitterService: EventEmitterService, protected translateService: TranslateService,
    public uploadFile: FilelistService, protected phrasesService: PhrasesService, protected corporateCommonService: CorporateCommonService,
    public fccGlobalConstantService: FccGlobalConstantService, protected elementRef: ElementRef,
    protected searchLayoutService: SearchLayoutService, protected transactionDetailService: TransactionDetailService,
    protected formModelService: FormModelService,
    protected dialogService: DialogService, protected productMappingService: ProductMappingService,
    protected resolverService: ResolverService, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected utilityService: UtilityService,
    protected dialogRef: DynamicDialogRef, protected currencyConverterPipe: CurrencyConverterPipe,
    protected fccTaskService: FccTaskService,
    protected sgProductService: SgProductService, protected fileHandlingService: FileHandlingService) {
      super(commonService, stateService,
        eventEmitterService, translateService,
        uploadFile, phrasesService,
        fccGlobalConstantService, elementRef,
        searchLayoutService, transactionDetailService,
        formModelService,
        dialogService, productMappingService,
        resolverService, confirmationService,
        customCommasInCurrenciesPipe, utilityService,
        dialogRef, currencyConverterPipe,
        fccTaskService,
        sgProductService, fileHandlingService)
     }

  ngOnInit(): void {
    console.log("sg component overriden");
    
    super.ngOnInit();
  }

  onClickExpiryDate() {
    console.log("inside onClickExpiryDate");
    let expiryDate = this.form.get(this.expiryDateField).value;
    const currentDate = this.commonService.getBankDateForComparison();
    this.form.addFCCValidators(this.expiryDateField, Validators.pattern(FccGlobalConstant.datePattern), 0);
    this.form.get(this.expiryDateField).updateValueAndValidity();
    console.log("inside onClickExpiryDate2");
    
    const d=expiryDate.toString().replace(/\s/g, "_");

    this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijriExpDate").setValue(response.body.response);
      });
    if ((expiryDate !== null && expiryDate !== '')) {
    expiryDate = `${expiryDate.getDate()}/${(expiryDate.getMonth() + 1)}/${expiryDate.getFullYear()}`;
    expiryDate = (expiryDate !== '' && expiryDate !== null) ?
                                this.commonService.convertToDateFormat(expiryDate) : '';
    this.form.get(this.expiryDateField).clearValidators();
    if (expiryDate !== '' && (expiryDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) ) {
      this.form.get(this.expiryDateField).setValidators([expiryDateLessThanCurrentDate]);
      this.form.get(this.expiryDateField).updateValueAndValidity();
    } else {
      this.form.get(this.expiryDateField).clearValidators();
      this.form.get(this.expiryDateField).updateValueAndValidity();
    }
    } else {
      this.form.get(this.expiryDateField).clearValidators();
      this.form.get(this.expiryDateField).setValidators([Validators.required]);
      this.form.get(this.expiryDateField).updateValueAndValidity();
    }
    }

}
