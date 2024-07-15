import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, FormAccordionPanelService, PdfGeneratorService, ProductStateService, ReviewTransactionDetailsComponent, TabPanelService } from 'fccui';

@Component({
  selector: 'app-review-transaction-details-client',
  templateUrl: './review-transaction-details-client.component.html',
  styleUrls: ['./review-transaction-details-client.component.scss']
})
export class ReviewTransactionDetailsClientComponent extends ReviewTransactionDetailsComponent implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute, protected stateService: ProductStateService,
    protected pdfGeneratorService: PdfGeneratorService, protected tabPanelService: TabPanelService,
    protected formAccordionPanelService: FormAccordionPanelService, protected commonService: CommonService) { 
      super( activatedRoute,  stateService,
         pdfGeneratorService,  tabPanelService,
         formAccordionPanelService,  commonService);
    }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
