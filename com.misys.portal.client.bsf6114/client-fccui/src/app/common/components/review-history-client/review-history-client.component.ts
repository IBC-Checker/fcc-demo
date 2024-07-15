import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, FccGlobalConstantService, FormAccordionPanelService, FormService, FormatAmdNoService, ListDefService, PdfGeneratorService, ProductStateService, ReviewHistoryComponent, TabPanelService, UtilityService } from 'fccui';
import { DialogService } from 'primeng';

@Component({
  selector: 'app-review-history-client',
  templateUrl: './review-history-client.component.html',
  styleUrls: ['./review-history-client.component.scss']
})
export class ReviewHistoryClientComponent extends ReviewHistoryComponent implements OnInit {

  constructor(protected listService: ListDefService, protected formatAmdNoService: FormatAmdNoService,
    protected utilityService: UtilityService, protected translate: TranslateService, protected router: Router,
    protected commonService: CommonService, protected fccGlobalConstantService: FccGlobalConstantService,
    protected dialogService: DialogService, protected stateService: ProductStateService,
    protected pdfGeneratorService: PdfGeneratorService, protected tabPanelService: TabPanelService,
    protected formAccordionPanelService: FormAccordionPanelService,protected listdefFormService: FormService) {
      super( listService,  formatAmdNoService,
         utilityService,  translate,  router,
         commonService,  fccGlobalConstantService,
         dialogService,  stateService,
         pdfGeneratorService,  tabPanelService,
         formAccordionPanelService, listdefFormService);
     }

  ngOnInit(): void {
  }

}
