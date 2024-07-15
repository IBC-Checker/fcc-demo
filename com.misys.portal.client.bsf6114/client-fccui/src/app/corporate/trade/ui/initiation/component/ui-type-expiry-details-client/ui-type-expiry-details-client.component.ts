/* eslint-disable no-console */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FccTradeFieldConstants, FilelistService, HOST_COMPONENT, LeftSectionService, ProductStateService, ResolverService, SearchLayoutService, UiProductService, UiService, UiTypeExpiryDetailsComponent, UtilityService, expiryDateLessThanCurrentDate } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-ui-type-expiry-details-client',
  templateUrl: './ui-type-expiry-details-client.component.html',
  styleUrls: ['./ui-type-expiry-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: UiTypeExpiryDetailsClientComponent }]
})
export class UiTypeExpiryDetailsClientComponent extends UiTypeExpiryDetailsComponent implements OnInit {

  contextPath = this.fccGlobalConstantService.contextPath;
  servletName = window[FccGlobalConstant.SERVLET_NAME]; //'/portal'; 
  restServletName = window[FccGlobalConstant.RESTSERVLET_NAME]; //'/restportal'; 
  baseUrl = this.contextPath + this.restServletName + '/';
  hijariDate = this.baseUrl + 'getHijriDate';



  constructor(protected translateService: TranslateService, protected eventEmitterService: EventEmitterService,
    protected productStateService: ProductStateService, protected commonService: CommonService,
    protected leftSectionService: LeftSectionService, protected uiService: UiService,
    protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected searchLayoutService: SearchLayoutService,
    protected utilityService: UtilityService, protected resolverService: ResolverService,
    protected fileArray: FilelistService, protected dialogRef: DynamicDialogRef,
    protected currencyConverterPipe: CurrencyConverterPipe, protected uiProductService: UiProductService,
    protected cdRef: ChangeDetectorRef,protected fccGlobalConstantService: FccGlobalConstantService,protected corporateCommonService: CorporateCommonService) { 

      super( translateService , eventEmitterService ,
         productStateService , commonService ,
         leftSectionService , uiService ,
         confirmationService ,
         customCommasInCurrenciesPipe , searchLayoutService ,
         utilityService , resolverService ,
         fileArray , dialogRef ,
         currencyConverterPipe , uiProductService ,
         cdRef );
    }

  ngOnInit(): void {
    console.log("Inside the Client - UiTypeExpiryDetailsClientComponent!");
    

    super.ngOnInit();
    this.form.get("bgApproxExpiryDate").valueChanges.subscribe(value => {
      if(!value) return;
      console.log("bgApproxExpiryDate changed");
      const d=value.toString().replace(/\s/g, "_");

      this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijribgExpDate").setValue(response.body.response);
      });
      
    })
    this.form.get("bgProjectedExpiryDate").valueChanges.subscribe(value => {
      if(!value) return;
      console.log("bgProjectedExpiryDate changed");
      const d=value.toString().replace(/\s/g, "_");

      this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijribgExpDate").setValue(response.body.response);
      });
      
    })
  }
  onClickBgExpDate() {
    this.uiService.calculateFinalExpiryDate();
    this.validateExpiryDate();

    const bgExpDate = this.form.get('bgExpDate').value;

    const contractDate = this.stateService.getSectionData(FccGlobalConstant.UI_UNDERTAKING_DETAILS)
      .get(FccGlobalConstant.UI_CONTRACT_DETAILS).get('contractDate').value;
    const effectiveDate = this.form.get('bgIssDateTypeDetails').value;
    const bgIssDateTypeCode = this.form.get('bgIssDateTypeCode');
    if (bgExpDate !== null && bgExpDate !== '') {

      console.log("The bgExpDate is:",bgExpDate);

      const d=bgExpDate.toString().replace(/\s/g, "_");

      this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijribgExpDate").setValue(response.body.response);
      });

      if (contractDate && contractDate !== '' ) {
        this.checkContractDate();
      }
      if (bgIssDateTypeCode && bgIssDateTypeCode.value === '99' && effectiveDate && effectiveDate !== '') {
        this.uiService.calculateExpiryDate(effectiveDate, bgExpDate, this.form.get('bgExpDate'));
      }
      else if(!this.commonService.isnonEMptyString(effectiveDate)){
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        if(bgExpDate < currentDate) {
          this.form.get('bgExpDate').setValidators([expiryDateLessThanCurrentDate]);
          this.form.get('bgExpDate').updateValueAndValidity();
          this.form.updateValueAndValidity();
        }
      }
    } else {
      this.form.get('bgExpDate').clearValidators();
    }
  }
  onClickBgIssDateTypeCode() {
    // show bgIssDateTypeDetails field , when 04 is selected.
    if (this.form.get('bgIssDateTypeCode') && this.form.get('bgIssDateTypeCode').value === '99') {
      console.log("fatima hijri date test inside if");
      
      this.toggleControls(this.form, ['bgIssDateTypeDetails'], true);
      this.setMandatoryField(this.form, 'bgIssDateTypeDetails', true);
      this.patchFieldParameters(this.form.get('HijribgIssDateTypeDetails'), {
        rendered: true     
      });
      //this.toggleControls(this.form, ['HijribgIssDateTypeDetails'], true);
      if (this.option === FccGlobalConstant.TEMPLATE) {
        this.setMandatoryField(this.form, 'bgIssDateTypeDetails', false);
      }
      //this.togglePreviewScreen(this.form, [FccTradeFieldConstants.ISSUE_DATETYPE_DETAILS], false);

      this.form.get('bgIssDateTypeDetails').updateValueAndValidity();     
      //this.togglePreviewScreen(this.form, ['HijribgIssDateTypeDetails'], true);
      //this.patchFieldParameters(this.form.get("HijribgIssDateTypeDetails"), { previewScreen: true });
    } else {
      console.log("fatima hijri date test inside else");
      //this.patchFieldParameters(this.form.get("HijribgIssDateTypeDetails"), { previewScreen: false });
      this.toggleControls(this.form, ['bgIssDateTypeDetails'], false);
      this.setMandatoryField(this.form, 'bgIssDateTypeDetails', false);
      this.patchFieldParameters(this.form.get('HijribgIssDateTypeDetails'), {
        rendered: false     
      });
      //this.toggleControls(this.form, ['HijribgIssDateTypeDetails'], false);
      this.form.get('bgIssDateTypeDetails').updateValueAndValidity();
      //this.togglePreviewScreen(this.form, ['HijribgIssDateTypeDetails'], false);
    }
    this.onClickBgIssDateTypeDetails();
  }
  onClickBgIssDateTypeDetails() {
    const expDate = this.form.get('bgExpDate').value;
    const effectiveDate = this.form.get('bgIssDateTypeDetails').value;
    if (effectiveDate !== null && effectiveDate !== '') {

      console.log("The effectiveDate is:",effectiveDate);

      const d=effectiveDate.toString().replace(/\s/g, "_");

      this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijribgIssDateTypeDetails").setValue(response.body.response);
      });
    }
    if (this.form.get('bgIssDateTypeCode') && this.form.get('bgIssDateTypeCode').value === '99') {
    this.uiService.calculateExpiryDate(effectiveDate, expDate, this.form.get('bgExpDate'));
    } else {
      this.uiService.calculateExpiryDate('', expDate, this.form.get('bgExpDate'));
    }

  }

  
}
