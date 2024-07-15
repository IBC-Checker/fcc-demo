import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AmendCommonService, CodeDataService, CommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EventEmitterService, FccBusinessConstantsService, FccGlobalConstant, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, LcProductService, LcReturnService, LcTemplateService, LeftSectionService, MultiBankService, PaymentDetailsComponent, PhrasesService, PrevNextService, ProductStateService, ResolverService, SearchLayoutService, SessionValidateService, TradeCommonService, UtilityService } from 'fccui';
import { ConfirmationService, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-payment-details-client',
  templateUrl: './payment-details-client.component.html',
  styleUrls: ['./payment-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: PaymentDetailsClientComponent }]
})
export class PaymentDetailsClientComponent extends PaymentDetailsComponent implements OnInit {

  confirmationOption:any;
  counterpartyList:any;

  constructor(protected commonService: CommonService, protected sessionValidation: SessionValidateService,
    protected translateService: TranslateService, protected router: Router, protected leftSectionService: LeftSectionService,
    protected lcReturnService: LcReturnService, protected stateService: ProductStateService,
    protected utilityService: UtilityService, protected prevNextService: PrevNextService,
    protected phrasesService: PhrasesService, protected multiBankService: MultiBankService,
    protected lcTemplateService: LcTemplateService, protected searchLayoutService: SearchLayoutService,
    protected formModelService: FormModelService, protected formControlService: FormControlService,
    protected emitterService: EventEmitterService, protected amendCommonService: AmendCommonService,
    protected confirmationService: ConfirmationService, protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
    protected resolverService: ResolverService, protected fileList: FilelistService, protected dialogRef: DynamicDialogRef,
    protected currencyConverterPipe: CurrencyConverterPipe, protected lcProductService: LcProductService,
    protected codeDataService: CodeDataService, protected tradeCommonService: TradeCommonService) {
    super(commonService, sessionValidation,
      translateService, router, leftSectionService,
      lcReturnService, stateService,
      utilityService, prevNextService,
      phrasesService, multiBankService,
      lcTemplateService, searchLayoutService,
      formModelService, formControlService,
      emitterService, amendCommonService,
      confirmationService, customCommasInCurrenciesPipe,
      resolverService, fileList, dialogRef,
      currencyConverterPipe, lcProductService,
      codeDataService, tradeCommonService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    
    setTimeout(() => {
      this.customCreditAvailableWith(); // Khaled Changes
    }, 3000);
  }

  customCreditAvailableWith() {
    this.confirmationOption = this.stateService.getSectionData(FccGlobalConstant.GENERAL_DETAILS).get('confirmationOptions').value;
    this.counterpartyList = this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['confirmationParty'].get('counterPartyList').value;
    if(this.confirmationOption === '01'){
      if(this.counterpartyList === 'Advising Bank') {
        this.form.get('paymentDetailsBankEntity').setValue('02');
      }
      else if(this.counterpartyList === 'Other') {
        this.form.get('paymentDetailsBankEntity').setValue('99'); 
       
        this.form.get('paymentDetailsBankName').patchValue(this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['confirmationParty'].get('confirmationBankName').value);
        this.form.get('paymentDetailsBankFirstAddress').patchValue(this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['confirmationParty'].get('confirmationFirstAddress').value);
        this.form.get('paymentDetailsBankSecondAddress').patchValue(this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['confirmationParty'].get('confirmationSecondAddress').value);
        this.form.get('paymentDetailsBankThirdAddress').patchValue(this.stateService.getSectionData(FccGlobalConstant.BANK_DETAILS).controls['confirmationParty'].get('confirmationThirdAddress').value);
      }
    }
  }


}
