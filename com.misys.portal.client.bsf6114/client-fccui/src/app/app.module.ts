import { MatSidenavModule } from '@angular/material/sidenav';
/* tslint:disable */

import { ClientAppComponent } from './app.component';
import {
    FccTranslationService, CheckTimeoutService, DynamicContentComponent, ComponentService, FccCorporateModule,
    FccCommonModule, FccGlobalConstant, CalendarComponent, CheckboxComponent, InputTextComponent,
    RadioButtonComponent, AmountComponent, Interceptor, MultiselectComponent, FormResolverModule,
    InputtextareaComponent, FccRetrievecredentialModule, AppModule, UtilityService, LocaleService, DynamicContentComponentService, UserAuditComponent, GraphColorService } from 'fccui';
import { OverlayModule } from '@angular/cdk/overlay';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
const contextPath = window[FccGlobalConstant.CONTEXT_PATH];
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgIdleModule } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import localeUS from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RatingModule } from 'primeng/rating';
import { LimitsWidgetComponent } from './client/common/widgets/components/limits-widget/limits-widget.component';
import { DynamicContentClientComponentService } from './base/service/dynamic-content-component.service';
import { CurrencyConverterComponent } from './base/common/widgets/components/currency-converter/currency-converter.component';
import { NewsComponent } from './base/common/widgets/components/news/news.component';
import { GeneralDetailsClientComponent } from './corporate/trade/lc/initiation/component/general-details-client/general-details-client.component';
import { UiTypeExpiryDetailsClientComponent } from './corporate/trade/ui/initiation/component/ui-type-expiry-details-client/ui-type-expiry-details-client.component';
import { UiUndertakingDetailsClientComponent } from './corporate/trade/ui/initiation/component/ui-undertaking-details-client/ui-undertaking-details-client.component';
import { TableClientComponent } from './base/components/table-client/table-client.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ReviewHistoryClientComponent } from './common/components/review-history-client/review-history-client.component';
import { ReviewTransactionDetailsClientComponent } from './common/components/review-transaction-details-client/review-transaction-details-client.component';
import { GraphColorClientService } from './common/services/graph-color-client.service';
import { SgGeneralDetailsClientComponent } from './corporate/trade/sg/initiation/sg-general-details-client/sg-general-details-client.component';
import { ApplicantBeneficiaryClientComponent } from './corporate/trade/lc/initiation/component/applicant-beneficiary-client/applicant-beneficiary-client.component';
import { ConfirmationPartyClientComponent } from './corporate/trade/lc/initiation/component/confirmation-party-client/confirmation-party-client.component';
import { PaymentDetailsClientComponent } from './corporate/trade/lc/initiation/component/payment-details-client/payment-details-client.component';
import { LcGeneralDetailsClientComponent } from './corporate/trade/lc/messagetobank/lc-general-details-client/lc-general-details-client.component';
import { UiApplicantBeneficiaryClientComponent } from './corporate/trade/ui/initiation/component/ui-applicant-beneficiary-client/ui-applicant-beneficiary-client.component';
import { SgApplicantBeneficiaryClientComponent } from './corporate/trade/sg/initiation/sg-applicant-beneficiary-client/sg-applicant-beneficiary-client.component';
import { EcDocumentDetailsClientComponent } from './corporate/trade/ec/initiation/ec-document-details-client/ec-document-details-client.component';
import { EcMessageToBankGeneralDetailsClientComponent } from './corporate/trade/ec/messagetobank/component/ec-message-to-bank-general-details-client/ec-message-to-bank-general-details-client.component';
import { ElGeneralDetailsClientComponent } from './corporate/trade/el/el-general-details-client/el-general-details-client.component';
import { SummaryDetailsClientComponent } from './corporate/trade/lc/initiation/component/summary-details-client/summary-details-client.component';





registerLocaleData(localeFr);
registerLocaleData(localeAr);
registerLocaleData(localeUS);

declare global {
    interface Navigator {
     msSaveOrOpenBlob: (blob: Blob,fileName?:any) => void
   }
 }
 
const globalSettings = window[FccGlobalConstant.SITE_KEY];
@NgModule({
    declarations: [
        ClientAppComponent,
        LimitsWidgetComponent,
        CurrencyConverterComponent,
        NewsComponent,
        GeneralDetailsClientComponent,
        UiTypeExpiryDetailsClientComponent,
        UiUndertakingDetailsClientComponent,
        TableClientComponent,
        ReviewHistoryClientComponent,
        ReviewTransactionDetailsClientComponent,
        SgGeneralDetailsClientComponent,
        ApplicantBeneficiaryClientComponent,
        ConfirmationPartyClientComponent,
        PaymentDetailsClientComponent,
        LcGeneralDetailsClientComponent,
        UiApplicantBeneficiaryClientComponent,
        SgApplicantBeneficiaryClientComponent,
        EcDocumentDetailsClientComponent,
        EcMessageToBankGeneralDetailsClientComponent,
        ElGeneralDetailsClientComponent,
        SummaryDetailsClientComponent
        
    ],
    imports: [
        AppRoutingModule,
        AppModule,
        RatingModule,
        MatSlideToggleModule,
        CardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        TableModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        InputTextModule,
        ReactiveFormsModule,
        BrowserModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        BrowserAnimationsModule,
        FccCommonModule,
        MultiSelectModule,
        FormsModule,
        CalendarModule,
        MessageModule,
        TabViewModule,
        CheckboxModule,
        RadioButtonModule,
        RecaptchaV3Module,
        DropdownModule,
        FccCorporateModule,
        InputSwitchModule,
        ProgressBarModule,
        RouterModule.forRoot([], { useHash: true, relativeLinkResolution: 'legacy' }),
        OverlayModule,
        HttpClientModule,
        SidebarModule,
        SlideMenuModule,
        FccRetrievecredentialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: FccTranslationService,
                deps: [HttpClient]
            }
        }),
        BreadcrumbModule,
        MenubarModule,
        OverlayPanelModule,
        ToastModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'x-xsrf-token'
        }),
        NgIdleModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        MatExpansionModule,
        MatSidenavModule,
        AngularEditorModule,
        FormResolverModule,
        DragDropModule,
        MatMenuModule ,
        DialogModule
          
    ],
    providers: [CheckTimeoutService, ComponentService, CurrencyPipe, UtilityService, LocaleService,
        { provide: DynamicContentComponentService, useClass: DynamicContentClientComponentService},
        { provide: GraphColorService, useClass: GraphColorClientService },
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: globalSettings },
        { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: globalSettings } as RecaptchaSettings },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: LOCALE_ID, useValue: 'ar' },
        { provide: LOCALE_ID, useValue: 'en' },
        Title
    ],
    bootstrap: [ClientAppComponent],
    entryComponents: [
        LimitsWidgetComponent, ApplicantBeneficiaryClientComponent, ConfirmationPartyClientComponent, LcGeneralDetailsClientComponent, PaymentDetailsClientComponent,UiApplicantBeneficiaryClientComponent,
        SgApplicantBeneficiaryClientComponent, EcDocumentDetailsClientComponent, EcMessageToBankGeneralDetailsClientComponent, ElGeneralDetailsClientComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA, 
        NO_ERRORS_SCHEMA] 
})
export class ClientAppModule {

}

