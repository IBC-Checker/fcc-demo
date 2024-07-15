import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, ElGeneralDetailsComponent, ElProductService, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FileHandlingService, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, LeftSectionService, PhrasesService, PrevNextService, ProductStateService, ResolverService, SaveDraftService, SearchLayoutService, TransactionDetailService, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';
import { ListClaimsService } from '../../lc/services/listclaims.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-el-general-details-client',
  templateUrl: './el-general-details-client.component.html',
  styleUrls: ['./el-general-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: ElGeneralDetailsClientComponent }]
})
export class ElGeneralDetailsClientComponent extends ElGeneralDetailsComponent implements OnInit {

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
  getAmountEL = this.baseUrl + 'getAmountEL';
  getFinancingValue = this.baseUrl + 'getFinancingValue';
  getListClaims = this.baseUrl + 'getListClaimsEL';

  constructor(protected commonService: CommonService, protected leftSectionService: LeftSectionService,
    protected router: Router, protected translateService: TranslateService,
    protected elementRef: ElementRef,
    protected prevNextService: PrevNextService, protected utilityService: UtilityService,
    protected saveDraftService: SaveDraftService, protected searchLayoutService: SearchLayoutService,
    protected formModelService: FormModelService, protected formControlService: FormControlService,
    protected stateService: ProductStateService, protected route: ActivatedRoute,
    protected eventEmitterService: EventEmitterService, public uploadFile: FilelistService,
    public fccGlobalConstantService: FccGlobalConstantService, protected transactionDetailService: TransactionDetailService,
    protected phrasesService: PhrasesService, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected resolverService: ResolverService,
    protected dialogRef: DynamicDialogRef, protected currencyConverterPipe: CurrencyConverterPipe,
    protected elProductService: ElProductService, protected fileHandlingService: FileHandlingService, protected corporateCommonService: CorporateCommonService, public listClaimsService: ListClaimsService) {
    super(commonService, leftSectionService,
      router, translateService,
      elementRef,
      prevNextService, utilityService,
      saveDraftService, searchLayoutService,
      formModelService, formControlService,
      stateService, route,
      eventEmitterService, uploadFile,
      fccGlobalConstantService, transactionDetailService,
      phrasesService, confirmationService,
      customCommasInCurrenciesPipe, resolverService,
      dialogRef, currencyConverterPipe,
      elProductService, fileHandlingService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.financingCustomization(); // Khaled Changes
  }

  financingCustomization(){
    //Khaled Changes Start
    this.referenceId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.REF_ID);

    const payWithFinancing = this.commonService.getQueryParametersFromKey('payWithFinancing');
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
      this.corporateCommonService.getValues(this.getAmountEL + `?refId=${this.referenceId}`).subscribe(response => {
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

      // Check if the financing type is Pre or Post
      this.onClickCustomFinancingType();

      // Checking tnx_id if it is null empty all the fields else keep them
      const tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
      console.log('check tnxId value: ', tnxId)
      if(tnxId === undefined || tnxId === null || tnxId === ''){
        console.log('empty all fields');
        this.form.get('customFinancingType').setValue('') ;  // Changes
        this.form.get('customfinancingAmount').setValue('') ;  // Changes
        this.form.get('customrequestedPercentage').setValue('') ;  // Changes
        this.form.get('customclaimId').setValue('') ;  // Changes
        this.form.get('customtenorNumber').setValue('') ;  // Changes
        this.form.get('customtenorDropdown').setValue('') ;  // Changes
        this.form.get('customestimatedDate').setValue('') ;  // Changes
        this.form.get('customProductType').setValue('') ;  // Changes
        this.form.get('customPrincipalAccount').setValue('');
        this.form.get('customFeeAccount').setValue('');
      }
    }

    // To open pay with financing in the draft
    this.tnxId = this.commonService.getQueryParametersFromKey(FccGlobalConstant.tnxId);
    this.corporateCommonService.getValues(this.getFinancingValue + `?refId=${this.referenceId}&tnxId=${this.tnxId}`).subscribe(response => {
    this.stringValue = response.body.response;
    })

    const mode = this.commonService.getQueryParametersFromKey('mode');
    const subTnxTypeCode = this.commonService.getQueryParametersFromKey('subTnxTypeCode');
    console.log(this.stringValue)
    console.log('subtnx: ',subTnxTypeCode)
    if(mode === 'DRAFT' &&  this.stringValue === 'PayWithFinancing' && subTnxTypeCode === '24'){
      console.log('inside draft')
      this.router.navigate([],{queryParams:{'payWithFinancing':'yes'}, queryParamsHandling: 'merge'})
    }
    //Khaled Changes End
  }

  onClickCustomFinancingType() {
    const payWithFinancing = this.commonService.getQueryParametersFromKey('payWithFinancing');
    if(payWithFinancing === 'yes'){
      if(this.form.get('customFinancingType').value == '01'){
        this.form.get('listOfClaims')[this.params][this.rendered] = false;
        this.form.get('customlistOfClaimsField')[this.params][this.rendered] = false;
        this.form.get('customlistOfClaims')[this.params][this.rendered] = false;
        this.form.get('customclaimId')[this.params][this.rendered] = false;
        this.form.get('customclaimId')[this.params][this.required] = false;
        this.form.get('customclaimId').setValue('');
      }
      else if (this.form.get('customFinancingType').value == '02'){
        this.form.get('listOfClaims')[this.params][this.rendered] = true;
        this.form.get('customclaimId')[this.params][this.rendered] = true;
        this.form.get('customclaimId')[this.params][this.required] = true;

        // call the restapi for the claim list
        this.corporateCommonService.getValues(this.getListClaims + `?refId=${this.referenceId}`).subscribe(response => {
          const jsonArr = response.body.response;
          this.listClaimsService.listOfClaimsMap = jsonArr;

          console.log(this.listClaimsService.listOfClaimsMap)
          if(this.listClaimsService.listOfClaimsMap.length !== 0){
            console.log('inside if 1')
            this.handleDocumentUploadgrid();
          }
        })

        // render the claim list data
        // this.handleDocumentUploadgrid();
      }
    }
  }

  onChangeCustomfinancingAmount() {
    console.log('amount is: ', this.amount);
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
    console.log('amount is: ', this.amount);
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

  // handling the claim list
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
      let creditAvailableBy;
      let maturityDate;
      const documentArr = this.form.get('customlistOfClaims')[FccGlobalConstant.PARAMS][FccGlobalConstant.DATA];
      claimId =  documentArr[index].column1;
      claimAmount =  documentArr[index].column2;
      creditAvailableBy =  documentArr[index].column3;
      maturityDate =  documentArr[index].column4;
      this.form.get('customclaimId').setValue(claimId);
      //
      const iso = this.form.get('customCurency').value;
      const amount = claimAmount;
      let valueupdated = this.commonService.replaceCurrency(amount);
      valueupdated = this.currencyConverterPipe.transform(valueupdated.toString(), iso);
      this.form.get('customAmount').setValue(valueupdated);
      //
      // this.form.get('customAmount').setValue(claimAmount);
      this.amount=claimAmount;

      // Set the estimated date as the maturity date when clicking
      console.log(creditAvailableBy);
      if(creditAvailableBy !== 'Payment'){
        console.log('not sight (payment)');
        console.log('maturity date', maturityDate)
        this.form.get('customestimatedDate').setValue(maturityDate);
      } 
   } 
  }

}
