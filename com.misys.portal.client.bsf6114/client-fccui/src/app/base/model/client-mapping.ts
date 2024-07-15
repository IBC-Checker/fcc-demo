
import { LimitsWidgetComponent } from "src/app/client/common/widgets/components/limits-widget/limits-widget.component";
import { CurrencyConverterComponent } from "../common/widgets/components/currency-converter/currency-converter.component";
import { NewsComponent } from "../common/widgets/components/news/news.component";
import { UiUndertakingDetailsClientComponent } from "src/app/corporate/trade/ui/initiation/component/ui-undertaking-details-client/ui-undertaking-details-client.component";
import { UiTypeExpiryDetailsClientComponent } from "src/app/corporate/trade/ui/initiation/component/ui-type-expiry-details-client/ui-type-expiry-details-client.component";
import { GeneralDetailsClientComponent } from "src/app/corporate/trade/lc/initiation/component/general-details-client/general-details-client.component";
import { ReviewHistoryClientComponent } from "src/app/common/components/review-history-client/review-history-client.component";
import { ReviewTransactionDetailsClientComponent } from "src/app/common/components/review-transaction-details-client/review-transaction-details-client.component";
import { SgGeneralDetailsClientComponent } from "src/app/corporate/trade/sg/initiation/sg-general-details-client/sg-general-details-client.component";
import { ApplicantBeneficiaryClientComponent } from "src/app/corporate/trade/lc/initiation/component/applicant-beneficiary-client/applicant-beneficiary-client.component";
import { ConfirmationPartyClientComponent } from "src/app/corporate/trade/lc/initiation/component/confirmation-party-client/confirmation-party-client.component";
import { PaymentDetailsClientComponent } from "src/app/corporate/trade/lc/initiation/component/payment-details-client/payment-details-client.component";
import { LcGeneralDetailsClientComponent } from "src/app/corporate/trade/lc/messagetobank/lc-general-details-client/lc-general-details-client.component";
import { UiApplicantBeneficiaryClientComponent } from "src/app/corporate/trade/ui/initiation/component/ui-applicant-beneficiary-client/ui-applicant-beneficiary-client.component";
import { SgApplicantBeneficiaryClientComponent } from "src/app/corporate/trade/sg/initiation/sg-applicant-beneficiary-client/sg-applicant-beneficiary-client.component";
import { EcDocumentDetailsClientComponent } from "src/app/corporate/trade/ec/initiation/ec-document-details-client/ec-document-details-client.component";
import { EcMessageToBankGeneralDetailsClientComponent } from "src/app/corporate/trade/ec/messagetobank/component/ec-message-to-bank-general-details-client/ec-message-to-bank-general-details-client.component";
import { ElGeneralDetailsClientComponent } from "src/app/corporate/trade/el/el-general-details-client/el-general-details-client.component";
import { SummaryDetailsClientComponent } from "src/app/corporate/trade/lc/initiation/component/summary-details-client/summary-details-client.component";

export class ClientMapping  {
  static widgetMappings = {
    limitsWidgetComponent: LimitsWidgetComponent,
    currencyConverterComponent: CurrencyConverterComponent,
    fccNewsComponent: NewsComponent,
    uiUndertakingDetails: UiUndertakingDetailsClientComponent,
    uiTypeAndExpiry: UiTypeExpiryDetailsClientComponent,
    generalDetails: GeneralDetailsClientComponent,
    sgGeneralDetails: SgGeneralDetailsClientComponent,
    applicantBeneficiaryDetails: ApplicantBeneficiaryClientComponent,
    confirmationParty : ConfirmationPartyClientComponent,
    paymentDetails: PaymentDetailsClientComponent,
    lcgeneralDetails: LcGeneralDetailsClientComponent,
    uiApplicantBeneficiaryDetails: UiApplicantBeneficiaryClientComponent,
    sgApplicantBeneficiary: SgApplicantBeneficiaryClientComponent,
    ecDocumentDetails: EcDocumentDetailsClientComponent,
    ecMessageToBankGeneralDetails: EcMessageToBankGeneralDetailsClientComponent,
    elgeneralDetails: ElGeneralDetailsClientComponent,
    summaryDetails: SummaryDetailsClientComponent
    // reviewHistoryComponent: ReviewHistoryClientComponent,
    // reviewTransactionDetailsComponent: ReviewTransactionDetailsClientComponent
  };
 
 static mappings = ClientMapping.widgetMappings;
}