import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountStatementDownloadService, AmountMaskPipe, CommonService, CurrencyAbbreviationPipe, DashboardService, FccGlobalConstantService, FormAccordionPanelService, FormControlService, FormModelService, HideShowDeleteWidgetsService, ListDataDownloadService, ListDefService, PaymentBatchService, PdfGeneratorService, ProductMappingService, ResolverService, SeveralSubmitService, TabPanelService, TableComponent, TableService, TransactionDetailService, UtilityService } from 'fccui';
import { MessageService, DialogService } from 'primeng';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss'],
  providers: [],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class TableClientComponent  extends TableComponent implements OnInit {

  constructor(protected translate: TranslateService,
    public commonService: CommonService, protected router: Router,
    protected messageService: MessageService,
    protected dialogService: DialogService,
    protected fccGlobalConstantService: FccGlobalConstantService,
    protected currencyAbbreviation: CurrencyAbbreviationPipe,
    protected listDataDownloadService: ListDataDownloadService,
    protected dashboardService: DashboardService,
    protected accounStatementDownloadService: AccountStatementDownloadService,
    protected changedetector: ChangeDetectorRef,
    protected activatedRoute: ActivatedRoute,
    protected amountMask: AmountMaskPipe,
    protected listService: ListDefService,
    protected tableService: TableService,
    protected utilityService: UtilityService,
    protected el: ElementRef,
    protected zone: NgZone,
    protected renderer: Renderer2,
    protected http: HttpClient,
    public dialog: MatDialog,
    protected severalSubmitService: SeveralSubmitService,
    protected translateService: TranslateService, protected resolverService: ResolverService,
    protected hideShowDeleteWidgetsService: HideShowDeleteWidgetsService,
    protected datePipe: DatePipe,
    protected paymentService: PaymentBatchService,
    protected formAccordionPanelService: FormAccordionPanelService,
    protected tabPanelService: TabPanelService,
    protected pdfGeneratorService: PdfGeneratorService,
    protected formModelService: FormModelService,
    protected transactionDetailService: TransactionDetailService,
    protected productMappingService: ProductMappingService,
    protected formControlService: FormControlService) { 
      super( translate,
         commonService,  router,
         messageService,
         dialogService,
         fccGlobalConstantService,
         currencyAbbreviation,
         listDataDownloadService,
         dashboardService,
         accounStatementDownloadService,
         changedetector,
         activatedRoute,
         amountMask,
         listService,
         tableService,
         utilityService,
         el,
         zone,
         renderer,
         http,
       dialog,
         severalSubmitService,
         translateService,  resolverService,
         hideShowDeleteWidgetsService,
         datePipe,
         paymentService,
         formAccordionPanelService,
         tabPanelService,
         pdfGeneratorService,
         formModelService,
         transactionDetailService,
         productMappingService,
         formControlService)
    }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
