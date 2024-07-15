import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, ConfirmationPartyComponent, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FCCFormGroup, FccBusinessConstantsService, FccGlobalConstant, FilelistService, FormControlService, HOST_COMPONENT, LcProductService, ProductStateService, ResolverService, SearchLayoutService, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-confirmation-party-client',
  templateUrl: './confirmation-party-client.component.html',
  styleUrls: ['./confirmation-party-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: ConfirmationPartyClientComponent }]
})
export class ConfirmationPartyClientComponent extends ConfirmationPartyComponent implements OnInit {

  advisingswiftCode:any;

  constructor(protected stateService: ProductStateService, protected emitterService: EventEmitterService,
    protected formControlService: FormControlService, protected translateService: TranslateService,
    protected commonService: CommonService, protected searchLayoutService: SearchLayoutService,
    protected resolverService: ResolverService, protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe, protected utilityService: UtilityService,
    protected fileList: FilelistService, protected dialogRef: DynamicDialogRef,
    protected currencyConverterPipe: CurrencyConverterPipe, protected lcProductService: LcProductService) {
    super(stateService, emitterService,
      formControlService, translateService,
      commonService, searchLayoutService,
      resolverService, confirmationService,
      customCommasInCurrenciesPipe, utilityService,
      fileList, dialogRef,
      currencyConverterPipe, lcProductService);
  }

  ngOnInit(): void {
    this.mode = this.stateService.getSectionData(FccGlobalConstant.GENERAL_DETAILS).get('transmissionMode').value;
    this.tnxTypeCode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.TNX_TYPE_CODE);
    if (this.tnxTypeCode && this.tnxTypeCode === FccGlobalConstant.N002_AMEND && this.stateService.
      getSectionData(FccGlobalConstant.GENERAL_DETAILS).get('transmissionMode').value[0]) {
      this.mode = this.stateService.getSectionData(FccGlobalConstant.GENERAL_DETAILS).get('transmissionMode').value[0].value;
    }
    this.productCode = this.commonService.getQueryParametersFromKey (FccGlobalConstant.PRODUCT);
    this.confirmationOption = this.stateService.getSectionData(FccGlobalConstant.GENERAL_DETAILS).get('confirmationOptions').value;
    const obj = this.parentForm.controls[this.controlName];
    if (obj !== null) {
      this.form = obj as FCCFormGroup;
    }
    this.tnxType = this.commonService.getQueryParametersFromKey(FccGlobalConstant.TNX_TYPE_CODE);
    if (this.confirmationOption !== FccBusinessConstantsService.WITHOUT_03) {
      this.setMandatoryFields(this.form, ['counterPartyList'], true);
    }
    this.setCnfirmtionDropDownData();

    this.customCounterPartyList(); // Khaled Changes

    this.onClickCounterPartyList();
    this.fieldNames = ['confirmationBankName', 'confirmationFirstAddress',
    'confirmationSecondAddress', 'confirmationThirdAddress', 'confirmationFourthAddress', 'confirmationFullAddress'];

  }

  customCounterPartyList() {
    this.advisingswiftCode = this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['advisingBank'].get('advisingswiftCode').value;
    if(!this.form.get('counterPartyList').value){
      console.log('>>> inside');
      if (this.advisingswiftCode !== null && this.advisingswiftCode!== '') {
        this.form.get('counterPartyList').setValue(FccGlobalConstant.ADVISING_BANK);
      }
    }
  }

}
