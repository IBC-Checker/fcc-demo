import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AmendCommonService, CommonService, CurrencyConverterPipe, FCCFormGroup, FccGlobalConstant, FccTaskService, FileHandlingService, FilelistService, FormAccordionPanelService, FormControlService, FormModelService, GroupClubService, LendingCommonDataService, NarrativeService, PreviewService, ProductStateService, SaveDraftService, SiProductService, SummaryDetailsComponent, TabPanelService, TableService, TransactionDetailService, TransactionDetailsMap, UiProductService, UtilityService } from 'fccui';

@Component({
  selector: 'app-summary-details-client',
  templateUrl: './summary-details-client.component.html',
  styleUrls: ['./summary-details-client.component.scss']
})
export class SummaryDetailsClientComponent extends SummaryDetailsComponent implements OnInit {

  constructor(protected utilityService: UtilityService, protected translateService: TranslateService,
    protected formModelService: FormModelService, protected formControlService: FormControlService,
    protected saveDraftService: SaveDraftService, protected formControl: FormControlService,
    protected previewService: PreviewService, protected stateService: ProductStateService,
    protected commonService: CommonService, protected groupClubService: GroupClubService,
    protected tabPanelService: TabPanelService, public uploadFile: FilelistService, protected router: Router,
    protected transactionDetailsMap: TransactionDetailsMap, protected formAccordionPanelService: FormAccordionPanelService,
    protected narrativeService: NarrativeService, protected lendingCommonDataService: LendingCommonDataService,
    protected taskService: FccTaskService, protected tableService: TableService, protected amendCommonService: AmendCommonService,
    public dialog: MatDialog, protected fileHandlingService: FileHandlingService,
    protected currencyConverterPipe: CurrencyConverterPipe, protected uiProductService: UiProductService,
    protected transactionDetailService: TransactionDetailService,
    protected activatedRoute: ActivatedRoute,
    protected siProductService: SiProductService) {
      super(utilityService, translateService,
        formModelService, formControlService,
        saveDraftService, formControl,
        previewService, stateService,
        commonService, groupClubService,
        tabPanelService,uploadFile, router,
        transactionDetailsMap, formAccordionPanelService,
        narrativeService, lendingCommonDataService,
        taskService, tableService, amendCommonService,
        dialog, fileHandlingService,
        currencyConverterPipe, uiProductService,
        transactionDetailService,
        activatedRoute,
        siProductService);
     }

  ngOnInit(): void {
    console.log("summary-details-client!!");   
    super.ngOnInit();
  }


  protected initSummary() {
    console.log("initSummary function client");   
    this.initializeSummaryDetailsMap();
    this.checkSectionEmpty();
    this.initializeFormGroup();
  }
  initializeSummaryDetailsMap() {
    console.log("initializeSummaryDetailsMap function client");
    
    this.summaryDetailsMap = new Map();
    this.clubbedDetailsMap = new Map();
    console.log("this.sectionNames is", this.sectionNames);
    
    this.sectionNames.forEach(sectionName => {
      console.log("section Name", sectionName)
      if (this.tabPanelService.getTabSectionList().indexOf(sectionName) !== -1 && this.tabSectionControlMap.has(sectionName)
          && this.formAccordionPanelService.getAccordionSectionList().indexOf(sectionName) === -1) {
        const controls: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, control] of this.tabSectionControlMap.get(sectionName)) {
          console.log(sectionName, "key, control", key, "\n-----",control)
          controls.push(control);
        }
        this.iterateMapControl(sectionName, controls);
      } else if (this.formAccordionPanelService.getAccordionSectionList().indexOf(sectionName) !== -1 &&
      this.accordionPanelControlMap.has(sectionName)) {
        const sectionForm = this.stateService.getSectionData(sectionName, undefined, this.master, this.stateType);
        console.log("sectionForm", sectionForm)
        this.updateAmountFormatting(sectionName, sectionForm);
        const accordionSubSectionsListMap = this.formAccordionPanelService.getAccordionSubSectionListMap();
        const accordionSubSectionAndControlsListMap = this.formAccordionPanelService.getAccordionSubSectionAndControlsListMap();
        const subSectionList = accordionSubSectionsListMap.get(sectionName);
        const subSectionControlsMap = accordionSubSectionAndControlsListMap.get(sectionName);
        const controls: any[] = [];
        subSectionList.forEach(subSection => {
          const subSectionForm = sectionForm.controls[subSection] as FCCFormGroup;
          if (subSectionForm[this.rendered] !== false) {
          const subSectionControls = subSectionControlsMap.get(subSection);
          controls.push(subSectionControls);
          }
        });

        this.iterateMapControl(sectionName, controls);
      } else {
        console.log("sectionName:", sectionName, "in else");
        
        if (this.stateService.isStateSectionSet(sectionName, this.master, this.stateType)) {
          const sectionForm: FCCFormGroup = this.stateService.getSectionData(sectionName, undefined, this.master, this.stateType);
          if (sectionForm) {
            console.log("section form is:");
            console.log("section controls", sectionForm.controls);
            if(sectionName == "eventDetails"){
              console.log("event details bank name", sectionForm.get('issuingBankName'));
              this.patchFieldParameters(sectionForm.get('issuingBankName'), {rendered: false});
              this.patchFieldParameters(sectionForm.get("placeOfExpiry"), {rendered: false});
            }
            
            this.updateAmountFormatting(sectionName, sectionForm);
            this.iterateMapControl(sectionName, sectionForm.controls);
          }
        }
      }
    });
  }

  public setProductItemsMap(productCode: string) {
    console.log("setProductItemsMap function client");   
    this.productItems = new Map();
    this.tabSectionControlMap = new Map();
    this.accordionPanelControlMap = new Map();
    this.amendNarrativeItemsMap = new Map();
    this.amendNarrativeMap = new Map();
    this.viewDisplayItemsMap = new Map();

    this.formModelService.getFormModel(productCode, this.eventTypeCode, this.subTnxTypeCode).subscribe(modelJson => {
      this.accordionView = modelJson.isAccordionView !== undefined ? (modelJson.isAccordionView) : this.accordionView;
      this.showDateField = modelJson.showPreviewDateField !== undefined ? (modelJson.showPreviewDateField) : this.showDateField;
      if (this.isAmendComparison) {
        this.accordionView = false;
      }
      //setting initSummary through this block of code is the normal behaviour but we need to redirect it
      if (this.operation === 'LIST_INQUIRY' || (this.operation === 'PREVIEW' && !this.amendedValue) || this.commonService.parent) {
        this.formModelService.getFormModelForEvent().subscribe(eventModelJson => {
          if ((this.tnxTypeCode === FccGlobalConstant.N002_AMEND || this.transactionDetailtnxTypeCode === FccGlobalConstant.N002_AMEND)
            && this.subTnxType !== FccGlobalConstant.N003_AMEND_RELEASE
            && this.subTnxType !== FccGlobalConstant.N003_INCREASE
            && this.subTnxType !== FccGlobalConstant.N003_DRAWDOWN) {
            this.handleNarrativeGroupChildrenMap(productCode);
          }
          if((this.productCode === FccGlobalConstant.PRODUCT_TD || this.productCode === FccGlobalConstant.PRODUCT_FT)
            && (this.subProductCode === FccGlobalConstant.SUB_PRODUCT_CODE_CSTD || this.subProductCode === FccGlobalConstant.FT_TPT)) {
              this.getExchangeFields(modelJson);
            }
          this.groupClubService.setEventModel(eventModelJson);
          this.groupClubService.initializeMaps(modelJson);
          this.initGroupService();
          this.addSection(eventModelJson, this.option, this.inquirySubTnxTypeCode, this.mode, this.tnxTypeCode);
          if (this.operation !== undefined && (this.operation === 'LIST_INQUIRY' || this.operation === 'PREVIEW')) {
            this.addSection(modelJson, this.option, this.inquirySubTnxTypeCode, this.mode, this.tnxTypeCode);
        } else {
          this.addSection(modelJson, this.option, this.subTnxType, this.mode, this.tnxTypeCode);
        }
          this.initSummary();
        });
      } else {
        if (this.operation !== undefined && this.operation === 'LIST_INQUIRY') {
          this.addSection(modelJson, this.option, this.inquirySubTnxTypeCode, this.mode, this.tnxTypeCode);
        } else {
          if((this.productCode === FccGlobalConstant.PRODUCT_TD || this.productCode === FccGlobalConstant.PRODUCT_FT)
            && (this.subProductCode === FccGlobalConstant.SUB_PRODUCT_CODE_CSTD || this.subProductCode === FccGlobalConstant.FT_TPT)) {
            this.getExchangeFields(modelJson);
          }
          this.groupClubService.initializeMaps(modelJson, this.amendedValue);
          this.initGroupService();
          this.addSection(modelJson, this.option, this.subTnxType, this.mode, this.tnxTypeCode);
          this.initSummary();
        }
      }
    });
  }


}
