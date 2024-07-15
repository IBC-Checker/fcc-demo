import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EcMessageToBankGeneralDetailsComponent, EcProductService, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FileHandlingService, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, LeftSectionService, PhrasesService, PrevNextService, ProductStateService, ResolverService, SaveDraftService, SearchLayoutService, UtilityService } from 'fccui';
import { DynamicDialogRef, ConfirmationService } from 'primeng';
import { ListClaimsService } from 'src/app/corporate/trade/lc/services/listclaims.service';

@Component({
  selector: 'app-ec-message-to-bank-general-details-client',
  templateUrl: './ec-message-to-bank-general-details-client.component.html',
  styleUrls: ['./ec-message-to-bank-general-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: EcMessageToBankGeneralDetailsClientComponent }]
})
export class EcMessageToBankGeneralDetailsClientComponent extends EcMessageToBankGeneralDetailsComponent implements OnInit {

  name = 'name';
  type = 'type';
  required = 'required';
  maxlength = 'maxlength';
  disabled = 'disabled';
  dataParam = 'data';
  referenceId: any;
  currentDate: any;
  stringValue: any;
  amount: any;
  isStaticAccountEnabled: boolean;
  accounts = [];
  entityName: any;
  entityNameRendered: any;

  contextPath = window[FccGlobalConstant.CONTEXT_PATH];   
  servletName = window[FccGlobalConstant.SERVLET_NAME];   
  restServletName = window[FccGlobalConstant.RESTSERVLET_NAME];
  baseUrl: string = this.contextPath + this.restServletName + '/';
  getAmountEC = this.baseUrl + 'getAmountEC';
  getFinancingValue = this.baseUrl + 'getFinancingValue';
  getMaturityDate = this.baseUrl + 'details';

  constructor(protected commonService: CommonService, protected leftSectionService: LeftSectionService,
    protected router: Router, protected translateService: TranslateService,
    protected prevNextService: PrevNextService, protected utilityService: UtilityService,
    protected elementRef: ElementRef,
    protected saveDraftService: SaveDraftService, protected searchLayoutService: SearchLayoutService,
    protected formModelService: FormModelService, protected formControlService: FormControlService,
    protected stateService: ProductStateService, protected route: ActivatedRoute,
    protected eventEmitterService: EventEmitterService, public fccGlobalConstantService: FccGlobalConstantService,
    protected uploadFile: FilelistService, public phrasesService: PhrasesService, protected resolverService: ResolverService,
    protected dialogRef: DynamicDialogRef, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
    protected currencyConverterPipe: CurrencyConverterPipe, protected ecProductService: EcProductService,
    protected fileHandlingService: FileHandlingService, protected corporateCommonService: CorporateCommonService, public listClaimsService: ListClaimsService) {
    super(commonService, leftSectionService,
      router, translateService,
      prevNextService, utilityService,
      elementRef,
      saveDraftService, searchLayoutService,
      formModelService, formControlService,
      stateService, route,
      eventEmitterService, fccGlobalConstantService,
      uploadFile, phrasesService, resolverService,
      dialogRef, confirmationService,
      customCommasInCurrenciesPipe,
      currencyConverterPipe, ecProductService,
      fileHandlingService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.financingCustomization(); // Khaled Changes
  }

  financingCustomization(){
    //Khaled Changes Start
    this.referenceId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.REF_ID);

    const payWithFinancing = this.commonService.getQueryParametersFromKey('payWithFinancing');
    const tenorType = this.commonService.getQueryParametersFromKey('tenor');
    if(payWithFinancing === 'yes'){
      //Render all customized field to true
      this.form.get('customFinType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customFinancingType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customAmountTitle')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customfinancingAmount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customrequestedPercentage')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customAmount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customCurency')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customtenorNumber')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customtenorDropdown')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('custombaseDate')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customestimatedDate')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customProdType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customProductType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('custompayWithFinancing').setValue('PayWithFinancing');  // Changes
      this.form.get('customPrincipalAccount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
      this.form.get('customFeeAccount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;

      // Add the amount and currency
      this.corporateCommonService.getValues(this.getAmountEC + `?refId=${this.referenceId}`).subscribe(response => {
        console.log(response.body.amountList.amount)
        // add decimal to the amount
        const iso = response.body.amountList.currency;
        this.amount = response.body.amountList.amount;
        let valueupdated = this.commonService.replaceCurrency(this.amount.toString());
        valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);

        this.form.get('customAmount').setValue(valueupdated);
        this.form.get('customCurency').setValue(response.body.amountList.currency);
      })

      // Set the value of the base date to today
      const todayDate = new Date();
      this.form.get('custombaseDate').setValue(todayDate);

      // Checking tnx_id if it is null empty all the fields else keep them
      const tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
      console.log('check tnxId value: ', tnxId)
      if(tnxId === undefined || tnxId === null || tnxId === ''){
        console.log('empty all fields');
        this.form.get('customfinancingAmount').setValue('') ;  // Changes
        this.form.get('customrequestedPercentage').setValue('') ;  // Changes
        this.form.get('customtenorNumber').setValue('') ;  // Changes
        this.form.get('customtenorDropdown').setValue('') ;  // Changes
        this.form.get('customestimatedDate').setValue('') ;  // Changes
        this.form.get('customProductType').setValue('') ;  // Changes
        this.form.get('customPrincipalAccount').setValue('');
        this.form.get('customFeeAccount').setValue('');

        // Set estimated days as maturity date by default
        console.log('tenor type: ' , tenorType)
        if(tenorType !== '01'){
          console.log('not sight (payment)');
          this.commonService.getTransactionDetails(`${this.getMaturityDate}?refId=${this.refId}`).subscribe(response =>{
            console.log(response.body.tenor_maturity_date)
            this.form.get('customestimatedDate').setValue(response.body.tenor_maturity_date);
          });
        } 
      }
    }

    // To open pay with financing in the draft
    this.tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
    this.corporateCommonService.getValues(this.getFinancingValue + `?refId=${this.referenceId}&tnxId=${this.tnxId}`).subscribe(response => {
    this.stringValue = response.body.response;
    })

    const mode = this.commonService.getQueryParametersFromKey('mode');
    console.log(this.stringValue)
    if(mode === 'DRAFT' && this.stringValue === 'PayWithFinancing'){
      console.log('inside draft')
      this.router.navigate([],{queryParams:{'payWithFinancing':'yes'}, queryParamsHandling: 'merge'})
    }
    //Khaled Changes End
  }

  onChangeCustomfinancingAmount() {
    const financingAmount = parseFloat(this.commonService.replaceCurrency(this.form.get('customfinancingAmount').value));
    // const amount = this.form.get('customAmount').value;
    const percentage = (financingAmount/this.amount)*100
	// add decimal value
    const iso = this.form.get('customCurency').value;
    let valueupdated = this.commonService.replaceCurrency(financingAmount.toString());
    valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);

    this.form.get('customfinancingAmount').setValue(valueupdated);
	this.form.get('customrequestedPercentage').setValue(percentage)
    if(Number(financingAmount) > Number(this.amount)){
      const validationError = { "Financing amount must be less than or equal to the Original amount":true }
      this.form.get('customfinancingAmount').clearValidators();
      this.form.addFCCValidators('customfinancingAmount', Validators.compose([() =>validationError]), 0);
      this.form.get('customfinancingAmount').updateValueAndValidity();
    } else {
      this.form.get('customfinancingAmount').clearValidators();
      this.form.get('customfinancingAmount').updateValueAndValidity();
    }
  }

  onChangeCustomrequestedPercentage() {
    const requestPercentage = this.form.get('customrequestedPercentage').value;
    // const amount = this.form.get('customAmount').value;
    const finance = (requestPercentage/100)*this.amount;
	// add decimal value
    const iso = this.form.get('customCurency').value;
    let valueupdated = this.commonService.replaceCurrency(finance.toString());
    valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);
    this.form.get('customfinancingAmount').setValue(valueupdated);
    if(Number(finance) > Number(this.amount)){
      const validationError = { "Financing amount must be less than or equal to the Original amount":true }
      this.form.get('customfinancingAmount').clearValidators();
      this.form.addFCCValidators('customfinancingAmount', Validators.compose([() =>validationError]), 0);
      this.form.get('customfinancingAmount').updateValueAndValidity();
    } else {
      this.form.get('customfinancingAmount').clearValidators();
      this.form.get('customfinancingAmount').updateValueAndValidity();
    }
  }

  onBlurCustomfinancingAmount() {
    const iso = this.form.get('customCurency').value;
    const amount = this.form.get('customfinancingAmount').value;
    let valueupdated = this.commonService.replaceCurrency(amount);
    valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);
    this.form.get('customfinancingAmount').setValue(valueupdated);
  }

  onChangeCustomtenorNumber() {
    const tenor = this.form.get('customtenorNumber').value;
    const period = this.form.get('customtenorDropdown').value;
    this.form.get('customtenorPeriod').setValue(`${tenor} ${period}(s)`);
    const baseDate = this.form.get("custombaseDate").value;
    const baseDateVal = new Date(baseDate);
    console.log(baseDate);
    console.log(baseDateVal);
  
    this.currentDate = new Date(baseDateVal); // Clone the baseDateVal
  
    if (period === 'Day') {
      this.currentDate.setDate(baseDateVal.getDate() + Number(tenor));
    } else if(period === 'Month'){
      const newMonth = baseDateVal.getMonth() + Number(tenor);
      const yearsToAdd = Math.floor(newMonth / 12);
      const remainingMonths = newMonth % 12;
      this.currentDate.setMonth(remainingMonths);
      this.currentDate.setFullYear(baseDateVal.getFullYear() + yearsToAdd);
    } else if (period === 'Year'){
      this.currentDate.setFullYear(baseDateVal.getFullYear() + Number(tenor));
    }
  
    const day = this.currentDate.getDate();
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
	//Khaled Changes Start
    if(!isNaN(tenor)){
      this.form.get('customestimatedDate').setValue(`${day}/${month}/${year}`);
      this.form.get('customtenorNumber').clearValidators();
      this.form.get('customtenorNumber').updateValueAndValidity();
    } else{
      const validationError = { "Tenor must be a number":true }
      this.form.get('customtenorNumber').clearValidators();
      this.form.addFCCValidators('customtenorNumber', Validators.compose([() =>validationError]), 0);
      this.form.get('customtenorNumber').updateValueAndValidity();
    }
    //Khaled Changes End
  }

  onClickCustomtenorDropdown(){
    const tenor = this.form.get('customtenorNumber').value;
    const period = this.form.get('customtenorDropdown').value;
    this.form.get('customtenorPeriod').setValue(`${tenor} ${period}(s)`);
    const baseDate = this.form.get("custombaseDate").value;
    const baseDateVal = new Date(baseDate);
    console.log(baseDate);
    console.log(baseDateVal);
  
    this.currentDate = new Date(baseDateVal); // Clone the baseDateVal
  
    if (period === 'Day') {
      this.currentDate.setDate(baseDateVal.getDate() + Number(tenor));
    } else if(period === 'Month'){
      const newMonth = baseDateVal.getMonth() + Number(tenor);
      const yearsToAdd = Math.floor(newMonth / 12);
      const remainingMonths = newMonth % 12;
      this.currentDate.setMonth(remainingMonths);
      this.currentDate.setFullYear(baseDateVal.getFullYear() + yearsToAdd);
    } else if (period === 'Year'){
      this.currentDate.setFullYear(baseDateVal.getFullYear() + Number(tenor));
    }
  
    const day = this.currentDate.getDate();
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    this.form.get('customestimatedDate').setValue(`${day}/${month}/${year}`);
  }

  onClickCustombaseDate() {
    const tenor = this.form.get('customtenorNumber').value;
    const period = this.form.get('customtenorDropdown').value;
    this.form.get('customtenorPeriod').setValue(`${tenor} ${period}(s)`);
    const baseDate = this.form.get("custombaseDate").value;
    const baseDateVal = new Date(baseDate);
    console.log(baseDate);
    console.log(baseDateVal);
  
    this.currentDate = new Date(baseDateVal); // Clone the baseDateVal
  
    if (period === 'Day') {
      this.currentDate.setDate(baseDateVal.getDate() + Number(tenor));
    } else if(period === 'Month'){
      const newMonth = baseDateVal.getMonth() + Number(tenor);
      const yearsToAdd = Math.floor(newMonth / 12);
      const remainingMonths = newMonth % 12;
      this.currentDate.setMonth(remainingMonths);
      this.currentDate.setFullYear(baseDateVal.getFullYear() + yearsToAdd);
    } else if (period === 'Year'){
      this.currentDate.setFullYear(baseDateVal.getFullYear() + Number(tenor));
    }
  
    const day = this.currentDate.getDate();
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    this.form.get('customestimatedDate').setValue(`${day}/${month}/${year}`);
  }

}
