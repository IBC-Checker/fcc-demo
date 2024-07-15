import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodeData, CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FccTradeFieldConstants, FileHandlingService, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, LcGeneralDetailsComponent, LcProductService, LeftSectionService, PhrasesService, PrevNextService, ProductMappingService, ProductStateService, ResolverService, SaveDraftService, SearchLayoutService, TransactionDetailService, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';
import { ListClaimsService } from '../../services/listclaims.service';
import { ListOfClaimsMap } from '../../services/listofclaims';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-lc-general-details-client',
  templateUrl: './lc-general-details-client.component.html',
  styleUrls: ['./lc-general-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: LcGeneralDetailsClientComponent }]
})
export class LcGeneralDetailsClientComponent extends LcGeneralDetailsComponent implements OnInit {

  ele: any;
  btndisable = 'btndisable';
  productCodeValue = FccGlobalConstant.PRODUCT_EC;
  codeData = new CodeData();
  documentDetails: any;
  name = 'name';
  type = 'type';
  required = 'required';
  maxlength = 'maxlength';
  disabled = 'disabled';
  dataParam = 'data';
  documentFormValid = true;
  validationErrorFlag = false;
  claimsModel: ListOfClaimsMap;
  tnxTypeCode: any;
  referenceId;
  amount: any;
  currentDate: any;
  stringValue: any;

  contextPath = window[FccGlobalConstant.CONTEXT_PATH];   
  servletName = window[FccGlobalConstant.SERVLET_NAME];   
  restServletName = window[FccGlobalConstant.RESTSERVLET_NAME];
  baseUrl: string = this.contextPath + this.restServletName + '/';
  getListClaims = this.baseUrl + 'getListClaims';
  getAmount = this.baseUrl + 'getAmount';
  getFinancingValue = this.baseUrl + 'getFinancingValue';

  constructor(protected commonService: CommonService, protected leftSectionService: LeftSectionService,
    protected router: Router, protected translateService: TranslateService,
    protected prevNextService: PrevNextService, protected utilityService: UtilityService,
    protected elementRef: ElementRef,
    protected saveDraftService: SaveDraftService, protected searchLayoutService: SearchLayoutService,
    protected formModelService: FormModelService, protected formControlService: FormControlService,
    protected stateService: ProductStateService, protected route: ActivatedRoute,
    public fccGlobalConstantService: FccGlobalConstantService, public uploadFile: FilelistService,
    protected eventEmitterService: EventEmitterService, protected transactionDetailService: TransactionDetailService,
    protected corporateCommonService: CorporateCommonService, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected resolverService: ResolverService,
    protected dialogRef: DynamicDialogRef, protected currencyConverterPipe: CurrencyConverterPipe,
    public phrasesService: PhrasesService, protected lcProductService: LcProductService,
    protected productMappingService: ProductMappingService,
    protected fileHandlingService: FileHandlingService, protected activatedRoute: ActivatedRoute, public listClaimsService : ListClaimsService ) {
    super(commonService, leftSectionService,
      router, translateService,
      prevNextService, utilityService,
      elementRef,
      saveDraftService, searchLayoutService,
      formModelService, formControlService,
      stateService, route,
      fccGlobalConstantService, uploadFile,
      eventEmitterService, transactionDetailService,
      corporateCommonService, confirmationService,
      customCommasInCurrenciesPipe, resolverService,
      dialogRef, currencyConverterPipe,
      phrasesService, lcProductService,
      productMappingService,
      fileHandlingService);
  }

  ngOnInit(): void {
    this.contextPath = this.fccGlobalConstantService.contextPath;
    this.refId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.REF_ID);
    this.option = this.commonService.getQueryParametersFromKey('option');
    this.tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
    this.productCode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.PRODUCT);
    this.subTnxTypeCode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.SUB_TRANSACTION_TYPE_CODE);
    this.mode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.MODE);
    if (this.commonService.referenceId === undefined) {
      sessionStorage.removeItem(FccGlobalConstant.idempotencyKey);
    }
    if (this.mode === FccGlobalConstant.DRAFT_OPTION) {
      this.actionReqCode = this.commonService.getQueryParametersFromKey('actionReqCode');
    }
    this.initializeFormGroup();
    this.commonService.loadDefaultConfiguration().subscribe(response => {
      if (response) {
        this.nonNumericCurrencyValidator = response.nonNumericCurrencyValidator;
        this.currencyDecimalplacesThree = response.currencyDecimalplacesThree;
        this.currencyDecimalplacesZero = response.currencyDecimalplacesZero;
      }
    });
    this.iterateFields(FccGlobalConstant.LC_MESSAGE_GENERAL_DETAILS, this.form.controls);
    this.updateNarrativeCount();
    this.iso = this.stateService.getValue(FccGlobalConstant.LC_MESSAGE_GENERAL_DETAILS, 'currency', false);
    if (this.form.get(this.settlementAmountWithCurrency)) {
    this.form.get(this.settlementAmountWithCurrency)[this.params][this.rendered] = false;
    }

    const payWithFinancing = this.commonService.getQueryParametersFromKey('payWithFinancing'); // Khaled Changes
    if (this.subTnxTypeCode === FccGlobalConstant.N003_SETTLEMENT_REQUEST && payWithFinancing !== 'yes') {
      this.onBlurAmt();
    }

    this.customPayWithFinancing(payWithFinancing); // Khaled Changes
  }

  customPayWithFinancing(payWithFinancing:any) {
    this.referenceId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.REF_ID);
    
    if(payWithFinancing === 'yes'){
      this.toggleCustomizedField(true);
      this.form.get('amt')[FccGlobalConstant.PARAMS][FccGlobalConstant.READONLY] = true;
      this.form.get('feeAct')[FccGlobalConstant.PARAMS][FccGlobalConstant.REQUIRED] = false;
      this.form.get('feeAct').clearValidators();

      this.corporateCommonService.getValues(this.getListClaims + `?refId=${this.referenceId}`).subscribe(response => {
        const jsonArr = response.body.response;
        this.listClaimsService.listOfClaimsMap = jsonArr;

        if(this.listClaimsService.listOfClaimsMap.length !== 0){
          this.handleDocumentUploadgrid();
        }
      })
      this.corporateCommonService.getValues(this.getAmount + `?refId=${this.referenceId}`).subscribe(response => {
        this.amount = response.body.amount;
        const iso = this.form.get(FccGlobalConstant.CURRENCY).value;
        const amount = this.amount;
        let valueupdated = this.commonService.replaceCurrency(amount);
        valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);
        this.form.get('amt').setValue(valueupdated);
        //
      });

      // Checking tnx_id if it is null empty all the fields else keep them
      const tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
      console.log('check tnxId value: ', tnxId)
      if(tnxId === undefined || tnxId === null || tnxId === ''){
        console.log('empty all fields');
        this.emptyCustomField();
      }
    } 
    
    this.tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
    this.corporateCommonService.getValues(this.getFinancingValue + `?refId=${this.referenceId}&tnxId=${this.tnxId}`).subscribe(response => {
      this.stringValue = response.body.response;
    })
    
    const mode = this.commonService.getQueryParametersFromKey('mode');
    if(mode === 'DRAFT' && this.subTnxTypeCode !== FccGlobalConstant.N003_CORRESPONDENCE && this.stringValue === 'PayWithFinancing'){
      this.router.navigate([],{queryParams:{'payWithFinancing':'yes'}, queryParamsHandling: 'merge'})
    }

    const todayDate = new Date();
    this.form.get('custombaseDate').setValue(todayDate);
  }

  toggleCustomizedField(flag: boolean) {
    // render the existing field start
    this.form.get('settlementAmount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag;
    this.form.get('currency')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag;
    this.form.get('currency')[this.params].layoutClass = 'p-col-1 p-lg-1 p-md-1 p-sm-12 currencyView';
    const currencyForm = this.stateService.getControl("lcgeneralDetails", "currency");
    currencyForm.type = 'view-mode';
    this.form.get('amt')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag;
    this.form.get('principalAct')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag;
    this.form.get('feeAct')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag;
    // render the existing field end
    this.form.get('customfinancingAmount')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customrequestedPercentage')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('listOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customclaimId')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customclaimId')[FccGlobalConstant.PARAMS][FccGlobalConstant.REQUIRED] = flag;
    this.form.get('customtenorNumber')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customtenorDropdown')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customestimatedDate')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('custombaseDate')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('custompayWithFinancing').setValue('PayWithFinancing'); 
    this.form.get('customFinType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customFinancingType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customProdType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
    this.form.get('customProductType')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = flag; 
  }

  emptyCustomField() {
    this.form.get('customfinancingAmount').setValue('') ; 
    this.form.get('customrequestedPercentage').setValue('') ; 
    this.form.get('customclaimId').setValue('') ; 
    this.form.get('customtenorNumber').setValue('') ; 
    this.form.get('customtenorDropdown').setValue('') ; 
    this.form.get('customestimatedDate').setValue('') ; 
    this.form.get('customProductType').setValue('') ; 
  }

  onChangeCustomfinancingAmount() {
    const financingAmount = parseFloat(this.commonService.replaceCurrency(this.form.get('customfinancingAmount').value));
    const percentage = (financingAmount/this.amount)*100
	  // add decimal value
    const iso = this.form.get(FccGlobalConstant.CURRENCY).value;
    let valueupdated = this.commonService.replaceCurrency(financingAmount.toString());
    valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);

    this.form.get('customfinancingAmount').setValue(valueupdated);
	  this.form.get('customrequestedPercentage').setValue(percentage);

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
    const finance = (requestPercentage/100)*this.amount;

	  // add decimal value
    const iso = this.form.get(FccGlobalConstant.CURRENCY).value;
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
    const iso = this.form.get(FccGlobalConstant.CURRENCY).value;
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

  onBlurAmt() {
    if(this.nonNumericCurrencyValidator){
      this.form.get('amt').setValidators([Validators.pattern(this.commonService.getRegexBasedOnlanguage())]);
      if(!this.commonService.isValidAmountValue(this.form, 'amt',
        this.form.get('amt').value, this.iso,
        this.currencyDecimalplacesZero,
        this.currencyDecimalplacesThree)){
        return;
      }
    }
    const amtform = this.commonService.replaceCurrency(this.form.get('amt').value);
    const amount = parseFloat(amtform);
    const tnxAmt = parseFloat(this.commonService.replaceCurrency(this.form.get('amount').value));
    if ((amount && tnxAmt) && (amount > tnxAmt) ) {
      const validationError = { settlementAmtLessThanTnxAmt:true };
      this.form.get('amt').clearValidators();
      this.form.addFCCValidators('amt', Validators.compose([() =>validationError]), 0);
      this.form.get('amt').updateValueAndValidity();
     //this.form.get('amt').setErrors({ settlementAmtLessThanLCAmt: true });
    } 
    // else{
      // if(this.commonService.isNonEmptyValue(amtform) && amtform !== '' && this.iso !== ''){
        // this.form.get('amt').setValue(this.currencyConverterPipe.transform(amtform.toString(), this.iso)); // Khaled Commented
      // }
      // const settlementAmt = this.currencyConverterPipe.transform(amtform, this.iso);
      // if (this.form.get('settlementAmountWithCurrency')) {
      //   this.form.get(this.settlementAmountWithCurrency).setValue(this.iso.concat(' ').concat(settlementAmt));
      // }
    //   this.form.get('amt').clearValidators();
    //   this.form.get('amt').updateValueAndValidity();
    // }
    if (isNaN(amount)) {
      this.form.get('tnxAmt').setValue("");
    } else {
      this.form.get('tnxAmt').setValue(this.currencyConverterPipe.transform(amtform.toString(), this.iso));
    }
  
  }

  onClickSave(){
    console.log('save');
  }

  handleDocumentUploadgrid() {
    setTimeout(() => {
        this.responseArray = this.documentList();
        this.formModelArray = this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.SUB_CONTROLS_DETAILS];
        this.columnsHeader = [];
        this.columnsHeaderData = [];
        this.formateResult();
        this.patchFieldParameters(this.form.get('customlistOfClaims'), { columns: this.columnsHeader });
        this.patchFieldParameters(this.form.get('customlistOfClaims'), { columnsHeaderData: this.columnsHeaderData });
        this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.DATA] = this.responseArray;
        this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = true;
        this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.DOWNLOAD_ACTION] = 'pi-download';
        this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.TRASH_ACTION] = 'pi-check';
        if (this.listClaimsService.numberOfClaims === 0 ) {
          this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.RENDERED] = false;
        }
        this.updateDataArray();
        this.form.updateValueAndValidity();
      }, FccGlobalConstant.LENGTH_2000);
  }

  documentList() {
    return this.listClaimsService.getListOfClaims();
  }

  updateDataArray() {
    this.referenceId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.REF_ID);
    this.tnxTypeCode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.TNX_TYPE_CODE);
    const finalArr = [];
    const documentArr = this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.DATA];
    for (let i = 0; i < documentArr.length; i++) {
      const obj = {};
      obj['column1'] = (documentArr[i].column1 !== null) ? documentArr[i].column1 : '';
      obj['column2'] = (documentArr[i].column2 !== null) ? documentArr[i].column2 : '';
      obj['column3'] = (documentArr[i].column3 !== null) ? documentArr[i].column3 : '';
      obj['column4'] = (documentArr[i].column4 !== null) ? documentArr[i].column4 : '';
      obj['column5'] = (documentArr[i].column5 !== null) ? documentArr[i].column5 : '';
      finalArr.push(obj);
    }
    let obj2 = {};
    obj2['row'] = finalArr;
    obj2 = JSON.stringify(obj2);
    if(finalArr.length !== 0){
      this.form.get('customlistOfClaimsField').setValue(obj2);
    }
    else {
      this.form.get('customlistOfClaimsField').setValue('');
    }
    this.form.updateValueAndValidity();
  }

  formateResult() {
    for (let i = 0; i < this.formModelArray.length; i++) {
      let key: any;
      key = Object.keys(this.formModelArray[i]);
      key = key[0];
      this.columnsHeader.push(key);
      const headerdata = this.translateService.instant(key);
      this.columnsHeaderData.push(headerdata);
    }
    for (let i = 0; i < this.responseArray.length; i++) {
      for (let j = 0; j < this.columnsHeader.length; j++) {
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j],
          { value: this.getValue(this.responseArray[i][this.columnsHeader[j]]), writable: true });
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j] + 'Type',
          { value: this.getType(this.columnsHeader[j]), writable: true });
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j] + 'Options',
          { value: this.getOptions(this.columnsHeader[j]), writable: true });
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j] + 'Status',
          { value: this.getEditStatus(this.columnsHeader[j]), writable: true });
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j] + 'Required',
          { value: this.getRequiredType(this.columnsHeader[j]), writable: true });
        Object.defineProperty(this.responseArray[i], this.columnsHeader[j] + 'Maxlength',
          { value: this.getMaxlength(this.columnsHeader[j]), writable: true });
      }
    }
  }

  getValue(val: any) {
    if (val) {
      return val;
    } else {
      return '';
    }
  }

  setOption(key: any, Val: any) {
    const attId = Val.attachmentId;
    const fileName = Val.fileName;
    let linkedValue;
    if (attId === '' || attId === null){
      linkedValue = {
        label: '',
        value: {
          label: '',
          value: attId
        }
      };
    }
    else{
     linkedValue = {
      label: fileName,
      value: {
        label: fileName,
        value: attId
      }
    };
  }
    return linkedValue;
  }

  getOptions(key: any) {
    let options = [];
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if ('linkTo' === this.formModelArray[i][key][this.name].toString()) {
          options.push({
            label : '',
            value: {
              label: '',
              value: ''
            }
          });
          this.uploadFile.fileMap.forEach(file => {
            const link = {
              label : file.fileName,
              value: {
                label: file.fileName,
                value: file.attachmentId
              }
            };
            options.push(link);
          });
        } else if ('documentType' === this.formModelArray[i][key][this.name].toString()) {
          options = this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.OPTIONS];
        }
      } catch (e) {
      }
    }
    return options;
  }

  getType(key: any) {
    let returntype;
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if (key.toString() === this.formModelArray[i][key][this.name].toString()) {
          returntype = this.formModelArray[i][key][this.type];
        }
      } catch (e) {
      }
    }
    return returntype;
  }

  getRequiredType(key: any) {
    let returnRequiredType;
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if (key.toString() === this.formModelArray[i][key][this.name].toString()) {
          returnRequiredType = this.formModelArray[i][key][this.required];
        }
      } catch (e) {
      }
    }
    return returnRequiredType;
  }

  getMaxlength(key: any) {
    let returnMaxlength;
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if (key.toString() === this.formModelArray[i][key][this.name].toString()) {
          returnMaxlength = this.formModelArray[i][key][this.maxlength];
        }
      } catch (e) {
      }
    }
    return returnMaxlength;
  }

  getDisabledStatus(key: any) {
    let returnDisabled;
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if (key.toString() === this.formModelArray[i][key][this.name].toString()) {
          returnDisabled = this.formModelArray[i][key][this.disabled];
        }
      } catch (e) {
      }
    }
    return returnDisabled;
  }

  getEditStatus(key) {
    const editStatus = 'editStatus';
    let returntype;
    for (let i = 0; i < this.formModelArray.length; i++) {
      try {
        if (key.toString() === this.formModelArray[i][key][this.name].toString()) {
          returntype = this.formModelArray[i][key][editStatus];
        }
      } catch (e) {
      }
    }
    return returntype;
  }

  onClickTrashIcon(event: any, key: any, index: any) {
    if (key === 'customlistOfClaims') {
      let claimId;
      let claimAmount;
      const documentArr = this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.DATA];
      claimId =  documentArr[index].column1;
      claimAmount =  documentArr[index].column2;
      this.form.get('customclaimId').setValue(claimId);
      //
      const iso = this.form.get(FccGlobalConstant.CURRENCY).value;
      const amount = claimAmount;
      let valueupdated = this.commonService.replaceCurrency(amount);
      valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);
      this.form.get('amt').setValue(valueupdated);
      //
      // this.form.get('amt').setValue(claimAmount);
      this.amount=claimAmount;
   } 
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // Disposal Instructions Start
  isDiscrepantDraft(): boolean {
    return (this.mode === FccGlobalConstant.DRAFT_OPTION && (this.subTnxTypeCode === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_08 ||
    this.subTnxTypeCode === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_09 || this.subTnxTypeCode === 'PW')); // Khaled Changes
  }

  renderedDiscrepantFields() {
    if ((this.mode && this.mode === FccGlobalConstant.DISCREPANT) || (this.subTnxTypeCode &&
      this.subTnxTypeCode === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_08 ||
      this.subTnxTypeCode === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_09 || this.subTnxTypeCode === 'PW')) { // Khaled Changes
    this.form.get('disposalInstructions')[this.params][this.rendered] = true;
    this.form.get('disposalInstructionsvalue')[this.params][this.rendered] = true;
    if (this.mode === FccGlobalConstant.DRAFT_OPTION) {
      this.patchFieldValueAndParameters(this.form.get('disposalInstructionsvalue'),
      this.subTnxTypeCode, {});
    }
    this.onClickDisposalInstructionsvalue();
    const reportingStatusField = this.form.get(FccTradeFieldConstants.REPORTING_STATUS);
    if (reportingStatusField && reportingStatusField.value && (reportingStatusField.value === FccGlobalConstant.PROD_STAT_CODE_CLAIM
      || this.mode === FccGlobalConstant.DISCREPANT)) {
      const claimRefField = this.form.get(FccTradeFieldConstants.CLAIM_REFERENCE);
      if (claimRefField && this.commonService.isnonEMptyString(claimRefField.value)) {
        claimRefField[this.params][this.rendered] = true;
      }
      const claimPresentDateField = this.form.get(FccTradeFieldConstants.CLAIM_PRESENT_DATE);
      if (claimPresentDateField && this.commonService.isnonEMptyString(claimPresentDateField.value)) {
        claimPresentDateField[this.params][this.rendered] = true;
      } else {
        this.getBoReleaseDateValue();
      }
      const claimAmtField = this.form.get('claimAmount');
      const claimCurCodeField = this.form.get('claimCurrencyCode');
      if (claimAmtField && this.commonService.isnonEMptyString(claimAmtField.value) &&
      claimCurCodeField && this.commonService.isnonEMptyString(claimCurCodeField.value)) {
        this.form.get(FccTradeFieldConstants.CLAIM_AMT_VAL)[this.params][this.rendered] = true;
        this.form.get('docAmountValue')[this.params][this.rendered] = false;
        const claimAmtValue = claimCurCodeField.value.concat(FccGlobalConstant.BLANK_SPACE_STRING).concat(claimAmtField.value);
        this.form.get(FccTradeFieldConstants.CLAIM_AMT_VAL).setValue(claimAmtValue);
      } else {
        this.setCurrencyAndAmountField('docAmount', 'docCurCode', 'docAmountValue');
      }
    }


  }
  }

  onClickDisposalInstructionsvalue() {
    console.log(this.form.get('disposalInstructionsvalue').value)
    if (this.form.get('disposalInstructionsvalue').value === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_08) {
      this.patchFieldValueAndParameters(this.form.get(FccGlobalConstant.SUB_TRANSACTION_TYPE_CODE),
    FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_08, {});
    } else if (this.form.get('disposalInstructionsvalue').value === FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_09) {
      this.patchFieldValueAndParameters(this.form.get(FccGlobalConstant.SUB_TRANSACTION_TYPE_CODE),
    FccGlobalConstant.N003_DISPOSAL_INSTRUCTIONS_09, {});
    }
    else if (this.form.get('disposalInstructionsvalue').value === 'PW') {
      this.patchFieldValueAndParameters(this.form.get(FccGlobalConstant.SUB_TRANSACTION_TYPE_CODE),
    'PW', {}); // Khaled Changes
    }
  }
  // Disposal Instructions End

}
