import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, HideShowDeleteWidgetsService, GlobalDashboardComponent, FccGlobalConstantService, CorporateCommonService, FccGlobalConstant, OPEN_CLOSE_ANIMATION } from 'fccui';
//import { Limit } from 'src/app/common/model/client-limit';
//import { LimitList } from 'src/app/common/model/client-limit-list';
import { ClientHideShowDeleteWidgetsService } from '../../../../services/client-hide-show-delete-widgets-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fcc-limits-widget',
  templateUrl: './limits-widget.component.html',
  styleUrls: ['./limits-widget.component.scss'],
  animations: [OPEN_CLOSE_ANIMATION]
})
export class LimitsWidgetComponent implements OnInit {

    @Input () dashboardName;
    @Input() widgetDetails;
    newTabURL: string;
    display = false;
    checkCustomise;
    hideShowCard;
    classCheck;
    nudges: any;
    typesList = [];
    selectedLimit;
    //This is commit test
    contextPath = this.fccGlobalConstantService.contextPath;
    servletName = '/portal'; // window[FccGlobalConstant.SERVLET_NAME];
    restServletName = '/restportal'; // window[FccGlobalConstant.RESTSERVLET_NAME];
    baseUrl = this.contextPath + this.restServletName + '/';
    limits = this.baseUrl + 'getLimits';
    codeData = this.baseUrl + 'getListFromCodeData?codeId=C820';
    allLimits = []
    //public clientLimitList: LimitList;
    // clientLimitList = {
      // allLimits =  [
      //   {allocationNumber: 1, totalLimit: 456, utilizedLimit: 200, availableLimit: 950, limitExpiry: '25/11/2025', facultyType: 'ALC-3030'},
      //   {allocationNumber: 2, totalLimit: 250, utilizedLimit: 150, availableLimit: 300, limitExpiry: '26/02/2024', facultyType: 'ALC-5320'},
      //   {allocationNumber: 3, totalLimit: 533, utilizedLimit: 324, availableLimit: 875, limitExpiry: '03/12/2024', facultyType: 'ALC-3030'},
      //   {allocationNumber: 4, totalLimit: 675, utilizedLimit: 125, availableLimit: 345, limitExpiry: '11/05/2025', facultyType: 'ALC-4010'},
      //   {allocationNumber: 5, totalLimit: 770, utilizedLimit: 980, availableLimit: 400, limitExpiry: '30/08/2025', facultyType: 'ALC-5400'}
      // ] 
    filteredLimits = [];
    // }
    //public clientLimit: Limit;
    // contextPath = ''; // window[FccGlobalConstant.CONTEXT_PATH];
    // servletName = '/portal'; // window[FccGlobalConstant.SERVLET_NAME];
    // restServletName = '/restportal'; // window[FccGlobalConstant.RESTSERVLET_NAME];
    // baseUrl: string = this.contextPath + this.restServletName + '/';
    // usefulDocuments = this.baseUrl + 'usefulDocuments';
    constructor(protected router: Router,
      protected commonService: CommonService,
      protected hideShowDeleteWidgetsService: ClientHideShowDeleteWidgetsService,
      protected globalDashboardComponent: GlobalDashboardComponent,
      protected fccGlobalConstantService: FccGlobalConstantService,
      protected corporateCommonService: CorporateCommonService,
      protected http: HttpClient) { }
  
      ngOnInit() {
  
        this.http.get<any>(this.codeData).subscribe(response => {
          response = JSON.parse(JSON.stringify(response));
          this.typesList = response.dataList;
          this.typesList.unshift({codeVal: 'All Limits', shortDesc:'all', longDesc: 'All Limits'})
        })
        console.log(this.typesList);
        // this.corporateCommonService.getValues(this.limits).subscribe(response => {
        //   this.clientLimitList = response.body;
        // });
        this.http.get<any>(this.limits)
        .subscribe((response)=>{
          console.log("response is", response);
          let parsedData = JSON.parse(JSON.stringify(response));
          let limitsList = parsedData.DataList;
          this.allLimits = []
          for (const item of limitsList) {
            const allocNum = item.allocNum.trim();
            const totalLim = this.formatNumber(item.totalLim);
            const utilLim = this.formatNumber(item.utilLim);
            const avLim = this.formatNumber(item.avLim);
            const limExp = this.formatDate(item.limExp);
            const facultyType = item.facultyType;

            console.log('allocNum:', allocNum);
            console.log('totalLim:', totalLim);
            console.log('utilLim:', utilLim); 
            console.log('avLim:', avLim);
            console.log('limExp:', limExp); 
            console.log('facultyType:', facultyType); 
            let limitRecord = {allocationNumber: allocNum, totalLimit: totalLim, utilizedLimit: utilLim, availableLimit: avLim, limitExpiry: limExp, facultyType: facultyType }
            this.allLimits.push(limitRecord);
            this.filteredLimits.push(limitRecord);
          }
        })
        this.commonService.getNudges(this.widgetDetails).then(data => {
          this.nudges = data;
        });
        this.contextPath = this.fccGlobalConstantService.contextPath;
        this.commonService.loadDefaultConfiguration().subscribe(response => {
          if (response) {
            this.newTabURL = response.newTabURL;
          }
        });
        this.commonService.dashboardOptionsSubject.subscribe(data => {
          this.classCheck = data;
        });
        this.hideShowDeleteWidgetsService.customiseSubject.subscribe(data => {
          this.checkCustomise = data;
        });
      }
      showDialog() {
        this.display = true;
      }
    
      eventDetails() {
        this.router.navigate([]).then(() => {
          window.open('newTabURL', '_self');
        });
      }
      deleteCards() {
        this.hideShowDeleteWidgetsService.awbTrackingCardHideShow.next(true);
        this.hideShowDeleteWidgetsService.awbTrackingCardHideShow.subscribe(res => {
          this.hideShowCard = res;
        });
        setTimeout(() => {
          this.hideShowDeleteWidgetsService.getSmallWidgetActions(JSON.parse(this.widgetDetails).widgetName,
          JSON.parse(this.widgetDetails).widgetPosition);
          this.globalDashboardComponent.deleteCardLayout(JSON.parse(this.widgetDetails).widgetName);
        }, FccGlobalConstant.DELETE_TIMER_INTERVAL);
     }
    
     closeDialog() {
      this.display = false;
    }

    LimitsDropdownChangeHandler(){
      console.log("Limits changed value became:", this.selectedLimit);
      let type=this.selectedLimit.shortDesc;
      if(type == 'all'){
        this.filteredLimits = this.allLimits;
      }else{
        this.filteredLimits = this.allLimits.filter(limit => limit.facultyType.includes(type));
      }
    }

    formatDate(inputDate) {
      // Split the date string into an array
      var parts = inputDate.split('-');
      
      // Rearrange the parts into the desired format
      var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
      
      return formattedDate;
  }

   formatNumber(numberString) {
    if (numberString=="") {
      return ;
    }
    var number = parseFloat(numberString);
    // Use toLocaleString to format the number with thousands separators
    return ""+number.toLocaleString();
}
  }
