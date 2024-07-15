import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, CorporateCommonService, CounterpartyRequest, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, DropDownAPIService, EventEmitterService, FCCFormGroup, FccGlobalConstant, FccGlobalConstantService, FccTaskService, FilelistService, HOST_COMPONENT, MultiBankService, ProductStateService, ResolverService, SearchLayoutService, SgApplicantBeneficiaryComponent, SgProductService, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-sg-applicant-beneficiary-client',
  templateUrl: './sg-applicant-beneficiary-client.component.html',
  styleUrls: ['./sg-applicant-beneficiary-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: SgApplicantBeneficiaryClientComponent }]
})
export class SgApplicantBeneficiaryClientComponent extends SgApplicantBeneficiaryComponent implements OnInit {

  constructor(protected commonService: CommonService,
    protected stateService: ProductStateService,
    protected eventEmitterService: EventEmitterService,
    protected translateService: TranslateService,
    protected corporateCommonService: CorporateCommonService,
    protected fccGlobalConstantService: FccGlobalConstantService,
    protected multiBankService: MultiBankService,
    protected dropdownAPIService: DropDownAPIService,
    protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
    protected searchLayoutService: SearchLayoutService,
    protected utilityService: UtilityService,
    protected resolverService: ResolverService,
    protected fileList: FilelistService,
    protected dialogRef: DynamicDialogRef,
    protected taskService: FccTaskService,
    protected http: HttpClient,
    protected currencyConverterPipe: CurrencyConverterPipe, protected sgProductService: SgProductService) {
    super(commonService,
      stateService,
      eventEmitterService,
      translateService,
      corporateCommonService,
      fccGlobalConstantService,
      multiBankService,
      dropdownAPIService,
      confirmationService,
      customCommasInCurrenciesPipe,
      searchLayoutService,
      utilityService,
      resolverService,
      fileList,
      dialogRef,
      taskService,
      http,
      currencyConverterPipe, sgProductService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onClickTransBeneficiaryEntity(event) {
    if (event.value) {
      this.form.get(FccGlobalConstant.TRANS_BENE_ENTITY).setValue(event.value);
      this.form.get(FccGlobalConstant.TRANS_BENE_NAME).setValue(event.value.name);
      this.form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_1).setValue(event.value.swiftAddressLine1);
      this.form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_2).setValue(event.value.swiftAddressLine2);
      this.form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_3).setValue(event.value.swiftAddressLine3);
      this.form.get('customMobile').setValue(event.value.phone); // Khaled Changes
      this.form.get('customEmail').setValue(event.value.email); // Khaled Changes
      if (this.form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_4)) {
        this.form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_4).setValue(event.value.swiftAddressLine4);
      }
    }
  }

  getBeneficiariesAsList(body: any) {
    this.counterpartyDetailsList = body;
    if (this.commonService.addressType && this.commonService.addressType === FccGlobalConstant.POSTAL_ADDRESS_PA) {
      this.entityAddressType = FccGlobalConstant.POSTAL_ADDRESS;
    } else {
      this.entityAddressType = FccGlobalConstant.SWIFT_ADDRESS_LOWERCASE;
    }
    this.counterpartyDetailsList.items.forEach(value => {
      const beneficiary: { label: string; value: any } = {
        label: this.commonService.decodeHtml(value.name),
        value: {
          label: this.commonService.decodeHtml(value.shortName),
          swiftAddressLine1: this.commonService.decodeHtml(value.swiftAddress.line1),
          swiftAddressLine2: this.commonService.decodeHtml(value.swiftAddress.line2),
          swiftAddressLine3: this.commonService.decodeHtml(value.swiftAddress.line3),
          entity: decodeURI(value.entityShortName),
          shortName: this.commonService.decodeHtml(value.shortName),
          name: this.commonService.decodeHtml(value.name),
          phone: value.contactInformation.phone, // Khaled Changes
          email: this.commonService.decodeHtml(value.contactInformation.email)// Khaled Chanegs
        }
      };
      this.abbvNameList.push(this.commonService.decodeHtml(value.shortName));
      if (this.entityNameList !== undefined) {
        this.entityNameList.push(this.commonService.decodeHtml(value.name));
      }
      this.beneficiaries.push(beneficiary);
      this.updatedBeneficiaries.push(beneficiary);
    });
    if (this.operation === FccGlobalConstant.PREVIEW && this.screenMode === FccGlobalConstant.VIEW_MODE) {
      if (this.form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value !== FccGlobalConstant.EMPTY_STRING &&
      typeof(this.form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value) === 'object') {
        const adhocBene: { label: string; value: any } = {
          label: this.form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value.label,
          value: {
            label: this.form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value.label,
            swiftAddressLine1: '',
            swiftAddressLine2: '',
            swiftAddressLine3: '',
            entity: '&#x2a;',
            shortName: '',
            name: '',
            phone: '', // Khaled Changes
            email: ''// Khaled Chanegs
          }
        };
        this.beneficiaries.push(adhocBene);
        this.updatedBeneficiaries.push(adhocBene);
      }
     }
  }

  getCounterPartyObject(form: FCCFormGroup): CounterpartyRequest {
    const counterpartyRequest: CounterpartyRequest = {
      name: form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value,
      shortName: form.get(FccGlobalConstant.BENE_ABBV_NAME).value,
      swiftAddress: {
        line1: form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_1).value,
        line2: form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_2).value,
        line3: form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_3).value,
      },
      country: form.get(FccGlobalConstant.TRANS_BENE_COUNTRY).value.shortName,
      entityShortName: '*',
      // Khaled Changes Start
      contactInformation: {
        phone: this.form.get('customMobile').value,
        email: this.form.get('customEmail').value
      }
      // Khaled Changes End
    };
    return counterpartyRequest;
  }

  // to create adhoc beneficiary object for Amend
  getCounterPartyObjectForAmend(form: FCCFormGroup): CounterpartyRequest {
    let beneName: string;
    if (form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value.name !== undefined){
    beneName = form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value.name;
  } else {
    beneName = form.get(FccGlobalConstant.TRANS_BENE_ENTITY).value;
  }
    const counterpartyRequest: CounterpartyRequest = {
      name: this.commonService.validateValue(beneName),
      shortName: this.commonService.validateValue(form.get(FccGlobalConstant.BENE_ABBV_NAME).value),
      swiftAddress: {
        line1: this.commonService.validateValue(form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_1).value),
        line2: this.commonService.validateValue(form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_2).value),
        line3: this.commonService.validateValue(form.get(FccGlobalConstant.TRANS_BENE_ADDRESS_3).value),
      },
      country: this.commonService.validateValue(form.get(FccGlobalConstant.TRANS_BENE_COUNTRY).value.shortName),
      entityShortName: FccGlobalConstant.ENTITY_DEFAULT,
      // Khaled Changes Start
      contactInformation: {
        phone: this.form.get('customMobile').value,
        email: this.form.get('customEmail').value
      }
      // Khaled Changes End
    };
    return counterpartyRequest;
  }

  // Khaled Changes Start
  onChangeCustomMobile(){
    const regex = /^[0-9\-\+()]+$/;
    if (!regex.test(this.form.get('customMobile').value)) {
      // validation
      const validationError = { 'Invalid Mobile Number':true };
      this.form.get('customMobile').clearValidators();
      this.form.addFCCValidators('customMobile', Validators.compose([() =>validationError]), 0);
      this.form.get('customMobile').updateValueAndValidity();
    }
    else {
      this.form.get('customMobile').clearValidators();
      this.form.get('customMobile').updateValueAndValidity();
    }
  }

  onChangeCustomEmail(){
    const regex = /^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$/;
    if (!regex.test(this.form.get('customEmail').value)) {
      // validation
      const validationError = { 'Invalid Email':true };
      this.form.get('customEmail').clearValidators();
      this.form.addFCCValidators('customEmail', Validators.compose([() =>validationError]), 0);
      this.form.get('customEmail').updateValueAndValidity();
    }
    else {
      this.form.get('customEmail').clearValidators();
      this.form.get('customEmail').updateValueAndValidity();
    }
  }
  // Khaled Changes End

}
