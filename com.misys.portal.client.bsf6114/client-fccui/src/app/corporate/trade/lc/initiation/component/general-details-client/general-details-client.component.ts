/* eslint-disable no-console */
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AmendCommonService, CodeDataService, CommonService, CorporateCommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, DropDownAPIService, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FccTaskService, FilelistService, FormModelService, FormatAmdNoService, GeneralDetailsComponent, HOST_COMPONENT, LcProductService, LcReturnService, LcTemplateService, LeftSectionService, MultiBankService, NarrativeService, PhrasesService, PrevNextService, ProductMappingService, ProductStateService, ResolverService, SearchLayoutService, SessionValidateService, TabPanelService, TransactionDetailService, UtilityService, expiryDateLessThanCurrentDate } from "fccui";
import { DialogService, ConfirmationService, DynamicDialogRef } from "primeng";

@Component({
	selector: "app-general-details-client",
	templateUrl: "./general-details-client.component.html",
	styleUrls: ["./general-details-client.component.scss"],
	providers: [
		{ provide: HOST_COMPONENT, useExisting: GeneralDetailsClientComponent },
	],
})
export class GeneralDetailsClientComponent extends GeneralDetailsComponent implements OnInit {

  contextPath = this.fccGlobalConstantService.contextPath;
  servletName = window[FccGlobalConstant.SERVLET_NAME]; //'/portal'; 
  restServletName = window[FccGlobalConstant.RESTSERVLET_NAME]; //'/restportal'; 
  baseUrl = this.contextPath + this.restServletName + '/';
  hijariDate = this.baseUrl + 'getHijriDate';

	constructor(
		protected commonService: CommonService,
		protected leftSectionService: LeftSectionService,
		protected router: Router,
		protected translateService: TranslateService,
		protected multiBankService: MultiBankService,
		protected dropDownAPIservice: DropDownAPIService,
		protected sessionValidation: SessionValidateService,
		protected taskService: FccTaskService,
		protected corporateCommonService: CorporateCommonService,
		protected fccGlobalConstantService: FccGlobalConstantService,
		protected lcReturnService: LcReturnService,
		protected prevNextService: PrevNextService,
		protected utilityService: UtilityService,
		protected searchLayoutService: SearchLayoutService,
		protected lcTemplateService: LcTemplateService,
		protected formModelService: FormModelService,
		protected stateService: ProductStateService,
		protected route: ActivatedRoute,
		protected eventEmitterService: EventEmitterService,
		protected transactionDetailService: TransactionDetailService,
		protected tabservice: TabPanelService,
		protected fccTaskService: FccTaskService,
		protected datePipe: DatePipe,
		protected dialogService: DialogService,
		protected phrasesService: PhrasesService,
		protected narrativeService: NarrativeService,
		protected productMappingService: ProductMappingService,
		protected amendCommonService: AmendCommonService,
		protected resolverService: ResolverService,
		protected confirmationService: ConfirmationService,
		protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
		protected fileList: FilelistService,
		protected dialogRef: DynamicDialogRef,
		protected currencyConverterPipe: CurrencyConverterPipe,
		protected formatAmdNoService: FormatAmdNoService,
		protected codeDataService: CodeDataService,
		protected lcProductService: LcProductService,
	) {
		super(
			commonService,
			leftSectionService,
			router,
			translateService,
			multiBankService,
			dropDownAPIservice,
			sessionValidation,
			taskService,
			corporateCommonService,
			fccGlobalConstantService,
			lcReturnService,
			prevNextService,
			utilityService,
			searchLayoutService,
			lcTemplateService,
			formModelService,
			stateService,
			route,
			eventEmitterService,
			transactionDetailService,
			tabservice,
			fccTaskService,
			datePipe,
			dialogService,
			phrasesService,
			narrativeService,
			productMappingService,
			amendCommonService,
			resolverService,
			confirmationService,
			customCommasInCurrenciesPipe,
			fileList,
			dialogRef,
			currencyConverterPipe,
			formatAmdNoService,
			codeDataService,
			lcProductService,
		);
	}

	ngOnInit(): void {
		console.log("Inside the Client - GeneralDetailsClientComponent!");
		super.ngOnInit();
	}
	onClickExpiryDate() {
		let expiryDate = this.form.get(this.expiryDateField).value;
		const currentDate = this.commonService.getBankDateForComparison();
		this.form.addFCCValidators(
			this.expiryDateField,
			Validators.pattern(FccGlobalConstant.datePattern),
			0,
		);
		if (expiryDate !== null && expiryDate !== "") {
			expiryDate = `${expiryDate.getDate()}/${
				expiryDate.getMonth() + 1
			}/${expiryDate.getFullYear()}`;
			expiryDate =
				expiryDate !== "" && expiryDate !== null
					? this.commonService.convertToDateFormat(expiryDate)
					: "";
			this.form.get(this.expiryDateField).clearValidators();

      console.log("The expiryDate is:",expiryDate);

      const d=expiryDate.toString().replace(/\s/g, "_");

      this.corporateCommonService.getValues(this.hijariDate + `?date=${d}`).subscribe(response => {
        console.log("The response is:",response);
        console.log("The response body is:",response.body);
        console.log("The response body response is:",response.body.response);
        this.form.get("HijriExpDate").setValue(response.body.response);
      });
      

			if (
				expiryDate !== "" &&
				expiryDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
			) {
				if (
					this.mode === FccGlobalConstant.EXISTING &&
					this.tnxTypeCode === FccGlobalConstant.N002_AMEND
				) {
					this.form.get(this.expiryDateField).markAsTouched();
					this.form
						.get(this.expiryDateField)
						.setValidators([expiryDateLessThanCurrentDate]);
				}
				if (
					this.mode === FccGlobalConstant.DRAFT_OPTION &&
					this.tnxTypeCode === FccGlobalConstant.N002_AMEND
				) {
					this.form.get(this.expiryDateField).markAsTouched();
					this.form
						.get(this.expiryDateField)
						.setValidators([Validators.required]);
				}
			} else {
				this.form.get(this.expiryDateField).clearValidators();
			}
		} else {
			this.form.get(this.expiryDateField).clearValidators();
			if (
				this.commonService.isNonEmptyValue(this.option) &&
				this.option !== FccGlobalConstant.TEMPLATE
			) {
				this.form
					.get(this.expiryDateField)
					.setValidators([Validators.required]);
			}
		}
		this.validateExpiryDate();
		this.form.get(this.expiryDateField).updateValueAndValidity();
	}
}
