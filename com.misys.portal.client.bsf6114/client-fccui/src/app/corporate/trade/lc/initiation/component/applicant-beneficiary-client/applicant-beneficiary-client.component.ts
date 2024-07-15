import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AmendCommonService, ApplicantBeneficiaryComponent, CommonService, CorporateCommonService, CounterpartyRequest, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, DropDownAPIService, EventEmitterService, FCCFormGroup, FccBusinessConstantsService, FccGlobalConstant, FccGlobalConstantService, FccTaskService, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, LcProductService, LcReturnService, LcTemplateService, LeftSectionService, MultiBankService, PrevNextService, ProductStateService, ResolverService, SearchLayoutService, SessionValidateService, UtilityService } from 'fccui';
import { DialogService, ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-applicant-beneficiary-client',
  templateUrl: './applicant-beneficiary-client.component.html',
  styleUrls: ['./applicant-beneficiary-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: ApplicantBeneficiaryClientComponent }]
})
export class ApplicantBeneficiaryClientComponent extends ApplicantBeneficiaryComponent implements OnInit {

  constructor(    protected commonService: CommonService,
    protected translateService: TranslateService,
    protected router: Router,
    protected leftSectionService: LeftSectionService,
    protected lcReturnService: LcReturnService,
    protected utilityService: UtilityService,
    protected corporateCommonService: CorporateCommonService,
    protected sessionValidation: SessionValidateService,
    protected fccGlobalConstantService: FccGlobalConstantService,
    protected prevNextService: PrevNextService,
    protected lcTemplateService: LcTemplateService,
    protected formModelService: FormModelService,
    protected formControlService: FormControlService,
    protected stateService: ProductStateService,
    protected emitterService: EventEmitterService,
    protected multiBankService: MultiBankService,
    protected dropdownAPIService: DropDownAPIService,
    protected dialogService: DialogService,
    protected searchLayoutService: SearchLayoutService,
    protected amendCommonService: AmendCommonService,
    protected confirmationService: ConfirmationService,
    protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
    protected resolverService: ResolverService,
    protected fileList: FilelistService,
    protected dialogRef: DynamicDialogRef,
    protected taskService: FccTaskService,
    protected currencyConverterPipe: CurrencyConverterPipe,
    protected lcProductService: LcProductService) {
    super(    commonService,
      translateService,
      router,
      leftSectionService,
      lcReturnService,
      utilityService,
      corporateCommonService,
      sessionValidation,
      fccGlobalConstantService,
      prevNextService,
      lcTemplateService,
      formModelService,
      formControlService,
      stateService,
      emitterService,
      multiBankService,
      dropdownAPIService,
      dialogService,
      searchLayoutService,
      amendCommonService,
      confirmationService,
      customCommasInCurrenciesPipe,
      resolverService,
      fileList,
      dialogRef,
      taskService,
      currencyConverterPipe,
      lcProductService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onClickBeneficiaryEntity(event) {
    if (event.value) {
      this.form
      .get('beneficiaryEntity')
      .setValue(event.value.name);
      this.form
        .get('beneficiaryFirstAddress')
        .setValue(event.value.swiftAddressLine1);
      this.form
        .get('beneficiarySecondAddress')
        .setValue(event.value.swiftAddressLine2);
      this.form
        .get('beneficiaryThirdAddress')
        .setValue(event.value.swiftAddressLine3);
      this.form
        .get('beneficiaryFourthAddress')
        .setValue(event.value.swiftAddressLine4);
      this.form
        .get('customMobile')
        .setValue(event.value.phone); // Khaled Changes
      this.form
        .get('customEmail')
        .setValue(event.value.email); // Khaled Changes
      if (!event.value.country){
        this.form.get(FccGlobalConstant.BENEFICIARY_COUNTRY).setValue(null);
      } else {
        const exist = this.beneficiaryCountry.filter(task => task.value.shortName === event.value.country);
        if (exist !== null && exist.length > 0) {
          this.form.get(FccGlobalConstant.BENEFICIARY_COUNTRY).setValue(this.beneficiaryCountry.filter(
            task => task.value.shortName === event.value.country)[0].value);
        } else if (!this.form.get(FccGlobalConstant.BENEFICIARY_COUNTRY).value) {
          this.patchFieldValueAndParameters(
            this.form.get(FccGlobalConstant.BENEFICIARY_COUNTRY), { label: event.value.country, shortName: event.value.country }, {});
        }
      }
      this.handleLinkedLicense();
    }
    if (this.tnxTypeCode === FccGlobalConstant.N002_AMEND){
      this.addAmendLabel();
    }
    if (this.mode === FccBusinessConstantsService.SWIFT) {
      this.beneficiaryDropdownValValidation();
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
          swiftAddressLine1: this.commonService.decodeHtml(value[this.entityAddressType].line1),
          swiftAddressLine2: this.commonService.decodeHtml(value[this.entityAddressType].line2),
          swiftAddressLine3: this.commonService.decodeHtml(value[this.entityAddressType].line3),
          country: value.country,
          entity: decodeURI(value.entityShortName),
          shortName: this.commonService.decodeHtml(value.shortName),
          name: this.commonService.decodeHtml(value.name),
          phone: value.contactInformation.phone, // Khaled Changes
          email: this.commonService.decodeHtml(value.contactInformation.email)// Khaled Chanegs
        }
      };
      this.abbvNameList.push(this.commonService.decodeHtml(value.shortName));
      this.entityNameList.push(this.commonService.decodeHtml(value.name));
      this.beneficiaries.push(beneficiary);
      this.updatedBeneficiaries.push(beneficiary);
    });
    if (this.operation === FccGlobalConstant.PREVIEW && this.screenMode === FccGlobalConstant.VIEW_MODE) {
      if (this.form.get('beneficiaryEntity').value !== FccGlobalConstant.EMPTY_STRING &&
      typeof(this.form.get('beneficiaryEntity').value) === 'object') {
        const adhocBene: { label: string; value: any } = {
          label: this.form.get('beneficiaryEntity').value.label,
          value: {
            label: this.form.get('beneficiaryEntity').value.label,
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
    if (this.form.get('beneficiaryEntity') && !this.commonService.isEmptyValue(this.form.get('beneficiaryEntity').value)) {
      const valObj = this.dropdownAPIService.getDropDownFilterValueObj(this.updatedBeneficiaries, 'beneficiaryEntity', this.form);
      if (valObj && valObj[`value`]) {
        this.form.get('beneficiaryEntity').patchValue(valObj[`value`]);
        this.form.get('beneficiaryEntity').clearValidators();
        this.form.get('beneficiaryEntity').setErrors(null);
        this.form.get('beneficiaryEntity').updateValueAndValidity();
      } else {
        this.form.get('beneficiaryEntity').patchValue(this.form.get('beneficiaryEntity').value);
        this.form.get('beneficiaryEntity').clearValidators();
        this.form.get('beneficiaryEntity').setErrors(null);
        this.form.get('beneficiaryEntity').updateValueAndValidity();
      }
    }
    this.beneficiaryInputValValidation();
  }

  // to create adhoc beneficiary object
  getCounterPartyObject(form: FCCFormGroup): CounterpartyRequest {
    const counterpartyRequest: CounterpartyRequest = {
      name: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ENTITY).value),
      shortName: this.commonService.validateValue(form.get(FccGlobalConstant.BENE_ABBV_NAME).value),
      swiftAddress: {
        line1: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_1).value),
        line2: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_2).value),
        line3: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_3).value),
      },
      country: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_COUNTRY).value.shortName),
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

  // to create adhoc beneficiary object
  getCounterPartyObjectForAmend(form: FCCFormGroup): CounterpartyRequest {
    let beneName: string;
    if (form.get(FccGlobalConstant.BENEFICIARY_ENTITY).value.name !== undefined){
          beneName = form.get(FccGlobalConstant.BENEFICIARY_ENTITY).value.name;
        } else {
          beneName = form.get(FccGlobalConstant.BENEFICIARY_ENTITY).value;
        }
    const counterpartyRequest: CounterpartyRequest = {
            name: this.commonService.validateValue(beneName),
          shortName: this.commonService.validateValue(form.get(FccGlobalConstant.BENE_ABBV_NAME).value),
          swiftAddress: {
            line1: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_1).value),
            line2: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_2).value),
            line3: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_ADDRESS_3).value),
          },
          country: this.commonService.validateValue(form.get(FccGlobalConstant.BENEFICIARY_COUNTRY).value.shortName),
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
