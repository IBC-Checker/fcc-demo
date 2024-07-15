import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AmendCommonService, CommonService, CurrencyConverterPipe, CustomCommasInCurrenciesPipe, EcDocumentDetailsComponent, EcProductService, EventEmitterService, FccGlobalConstant, FccGlobalConstantService, FileHandlingService, FilelistService, FormControlService, FormModelService, HOST_COMPONENT, HideShowDeleteWidgetsService, LcTemplateService, LeftSectionService, PrevNextService, ProductStateService, ResolverService, SaveDraftService, SearchLayoutService, SessionValidateService, TransactionDetailService, UtilityService } from 'fccui';
import { DialogService, DynamicDialogRef, ConfirmationService } from 'primeng';

@Component({
  selector: 'app-ec-document-details-client',
  templateUrl: './ec-document-details-client.component.html',
  styleUrls: ['./ec-document-details-client.component.scss'],
  providers: [{ provide: HOST_COMPONENT, useExisting: EcDocumentDetailsClientComponent }]
})
export class EcDocumentDetailsClientComponent extends EcDocumentDetailsComponent implements OnInit {

  constructor(protected commonService: CommonService, protected sessionValidation: SessionValidateService,
    protected translateService: TranslateService, protected router: Router, protected leftSectionService: LeftSectionService,
    public dialogService: DialogService, public uploadFile: FilelistService, public deleteFile: CommonService,
    public downloadFile: CommonService, protected prevNextService: PrevNextService, protected utilityService: UtilityService,
    protected hideShowDeleteWidgetsService: HideShowDeleteWidgetsService, protected searchLayoutService: SearchLayoutService,
    public autoUploadFile: CommonService, protected fileListSvc: FilelistService,
    protected lcTemplateService: LcTemplateService, protected formModelService: FormModelService,
    protected formControlService: FormControlService, protected fccGlobalConstantService: FccGlobalConstantService,
    protected emitterService: EventEmitterService, protected stateService: ProductStateService,
    protected fileHandlingService: FileHandlingService, protected saveDraftService: SaveDraftService,
    protected dialogRef: DynamicDialogRef, protected resolverService: ResolverService,
    protected confirmationService: ConfirmationService, protected customCommasInCurrenciesPipe: CustomCommasInCurrenciesPipe,
    protected currencyConverterPipe: CurrencyConverterPipe, protected datepipe: DatePipe,
    protected ecProductService: EcProductService, protected route: ActivatedRoute,
    protected transactionDetailService: TransactionDetailService,protected amendCommonService: AmendCommonService,) {
    super(commonService, sessionValidation,
      translateService, router, leftSectionService,
      dialogService, uploadFile, deleteFile,
      downloadFile, prevNextService, utilityService,
      hideShowDeleteWidgetsService, searchLayoutService,
      autoUploadFile, fileListSvc,
      lcTemplateService, formModelService,
      formControlService, fccGlobalConstantService,
      emitterService, stateService,
      fileHandlingService, saveDraftService,
      dialogRef, resolverService,
      confirmationService, customCommasInCurrenciesPipe,
      currencyConverterPipe, datepipe,
      ecProductService, route,
      transactionDetailService,amendCommonService,);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.setAttachmentRequired(); // Khaled Changes
  }

  setAttachmentRequired() {
    const mode = this.commonService.getQueryParametersFromKey(FccGlobalConstant.MODE);
    console.log('tnx ', this.tnxTypeCode, ' mode ', mode)
    if(this.form.get('customHiddenField') && this.tnxTypeCode !== FccGlobalConstant.N002_INQUIRE){
      if(!this.form.get('customHiddenField').value) {
        this.patchFieldParameters(this.form.get('fileUploadTable'), { hasError: true }); // Changes
        this.patchFieldParameters(this.form.get('fileUploadTable'), { message: `${this.translateService.instant('NoFileUploaded')}` }); // Changes
      }
    }
    //Khaled Changes Start
    if(this.tnxTypeCode === "03" && (mode === "EXISTING" || mode === "DRAFT")){
      console.log('remove validation');
      this.patchFieldParameters(this.form.get('fileUploadTable'), { hasError: false }); // Changes
      this.form.get('customHiddenField').setValue('default'); // Changes
    }
    //Khaled Changes End
  }

  showUploadedFiles() { 
    this.noOfFiles = this.uploadFile.numberOfFiles;
    this.renderBrowseButton(this.noOfFiles);
    if (this.noOfFiles !== 0) {
      if(this.tnxTypeCode !== FccGlobalConstant.N002_INQUIRE || this.mode){
        this.form.get('customHiddenField').setValue('default'); // Changes
      }
      this.patchFieldParameters(this.form.get('fileUploadTable'), { columns: this.getColumns() });
      this.patchFieldParameters(this.form.get('fileUploadTable'), { data: this.fileList() });
      this.patchFieldParameters(this.form.get('fileUploadTable'), { hasData: true });
      this.form.updateValueAndValidity();
      this.form.get('fileUploadTable').updateValueAndValidity();
      this.setAttachmentIds(this.fileList(), this.form);
    } else {
        this.patchFieldParameters(this.form.get('fileUploadTable'), { hasData: false });
        this.patchFieldParameters(this.form.get('fileUploadTable'), { data: this.fileList() });
        this.form.updateValueAndValidity();
        this.form.get('fileUploadTable').updateValueAndValidity();
        this.setAttachmentIds(this.fileList(), this.form);
    }
    this.handleDocumentUploadgrid();
    this.setValidations();
    const hasError = 'hasError';
    if (this.form.get(this.documentTableDetails)[this.params][hasError] === true) {
      this.form.get(FccGlobalConstant.ADD_DOCUMENT_BUTTON)[FccGlobalConstant.PARAMS][this.btndisable] = false;
    }
  }

  removeSelectedRow(deleteID: string) {
    let attids = null;
    let removeIndex = null;
    for (let i = 0; i < this.uploadFile.fileMap.length; ++i) {
      if (this.uploadFile.fileMap[i].attachmentId !== deleteID) {
          if (attids === null) {
              attids = this.uploadFile.fileMap[i].attachmentId;
          } else {
            attids = `${attids} | ${this.uploadFile.fileMap[i].attachmentId}`;
          }
        } else {
          removeIndex = i;
        }
      }
    if (removeIndex !== null) {
      this.uploadFile.fileMap.splice(removeIndex, 1);
    }
    if (this.uploadFile.fileMap.length === 0) {
      this.patchFieldParameters(this.form.get('fileUploadTable'), { hasData: false });
      if(this.tnxTypeCode !== FccGlobalConstant.N002_INQUIRE){
        this.form.get('customHiddenField').setValue(''); // Changes
        this.patchFieldParameters(this.form.get('fileUploadTable'), { hasError: true }); // Changes
        this.patchFieldParameters(this.form.get('fileUploadTable'), { message: `${this.translateService.instant('NoFileUploaded')}` }); // Changes
      }
    }
    this.renderBrowseButton(this.uploadFile.numberOfFiles);
    this.showUploadedFiles();
  }

}
