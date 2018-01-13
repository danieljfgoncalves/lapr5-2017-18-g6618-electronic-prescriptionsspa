import {Component, ViewChild, ElementRef} from '@angular/core';
import * as THREE from 'three';
import * as Tee from 'assets/WebGL/Dashboard/teechart.js';


import { MedicalReceiptService } from '../shared/medical-receipts/medical-receipt.service'
import { MedicalReceipt } from '../model/medical-receipt'
import {recordMapEntry} from "@angular/compiler-cli/src/metadata/evaluator";
import {UserService} from "../shared/user.service";
import {AuthService} from "../shared/auth/auth.service";
import {Role} from "../model/role";


@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
    styleUrls: ['./changelog.component.scss'],


})

export class ChangeLogComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @ViewChild('style') style :  ElementRef;

  canvas = null;
  activeCharts = [];
  scenes = [];
  renderer = null;
  graphNr = 4;
  receipts: MedicalReceipt[] = [];
  medicinesMap  = new Map();
  fillsDataMap = new Map();
  logsDataMap = new Map();
  logsDataMapReq = new Map();
  apiDataMap = new Map();
  tokenRequestsDataMap = new Map();

  constructor(private receiptService: MedicalReceiptService, private userService: UserService, private authService : AuthService) {


  }

  getLogsDataForGraphics(query)
  {

    return new Promise((resolve, reject) => {
      this. getApplicationsLogsForGraphics();

        this.userService.getLogs(query).subscribe(data=>{
          console.log(data);
           var logs = [];
           logs.push(data);
           var logins = 0;

           var signups = 0;
           var failedAttempts=0;
           var unauthorizedRequests=0;
           var authorizedRequests = 0;
           var logsDataMap = new Map();
           logsDataMap.set("Logins",logins);
           logsDataMap.set("Signups",signups);
           logsDataMap.set("Failed Logins",failedAttempts);
           logsDataMap.set("Unauthorized Requests",unauthorizedRequests);
           logsDataMap.set("Successful Requests",authorizedRequests);
           for(var i = 0; i  < logs[0].length;i++)
           {
             if(logs[0][i].type == 's')
             {
                logsDataMap.set("Logins", logsDataMap.get("Logins") + 1 );
               continue;
             }
             if(logs[0][i].type == 'ss')
             {
                logsDataMap.set("Signups", logsDataMap.get("Signups") + 1);
               continue;
             }
             if(logs[0][i].type == 'fu')
             {
                logsDataMap.set("Failed Logins", logsDataMap.get("Failed Logins") + 1);
               continue;
             }
             if(logs[0][i].type == 'feccft')
             {
              logsDataMap.set("Unauthorized Requests", logsDataMap.get("Unauthorized Requests") + 1);
               continue;
             }
             if(logs[0][i].type == 'seccft')
             {
               logsDataMap.set("Successful Requests", logsDataMap.get("Successful Requests") + 1);
               continue;
             }
           }
           resolve(logsDataMap);
        });

    }
    )};

  getApplicationsLogsForGraphics()
  {
    return new Promise((resolve, reject) => {

      this.userService.getApiRequestLogs('&where={"host":{"$ne":"localhost:3000"}}').subscribe(data =>{
        console.log(data);
        var logs = [];
        logs.push(data);
        var epresc,pharm,orders,travels = 0;
        this.apiDataMap.set("ePrescription",epresc);
        this.apiDataMap.set("Pharmacy",pharm);
        this.apiDataMap.set("Orders",orders);
        this.apiDataMap.set("Travels",travels);

        for(var i = 0; i  < logs[0].length;i++) {
          if(logs[0][i].method == 'POST' && logs[0][i].status == "200" )
          {

          }
        }
      });
    });
  }

  getMostUsedMedicinesDataForGraphics()
  {

    return new Promise((resolve, reject) => {
    this.receiptService.getReceipts().subscribe(receipts => {
        this.receipts = receipts;
        var indexFills = 0;
        var indexNotFills = 0;
        this.fillsDataMap.set("Filled",indexFills);
        this.fillsDataMap.set("Not filled",indexNotFills);
        for (var i = 0; i < this.receipts.length; i++) {
          for (var j = 0; j < this.receipts[i].prescriptions.length; j++) {
            var index = 1;
            if (this.medicinesMap.has(this.receipts[i].prescriptions[j].medicine)) {
              index = this.medicinesMap.get(this.receipts[i].prescriptions[j].medicine) + 1;
              }
            this.medicinesMap.set(this.receipts[i].prescriptions[j].medicine, index);

            if(this.receipts[i].prescriptions[j].quantity == this.receipts[i].prescriptions[j].fills.length)
            {
              indexFills =  this.fillsDataMap.get("Fills") + 1;
              this.fillsDataMap.set("Filled",indexFills);
            }
            else{
             indexNotFills =  this.fillsDataMap.get("Not filled") + 1;
             this.fillsDataMap.set("Not filled",indexNotFills);
            }

            }
          }
          resolve();
        });
    })
  }

  init() {

  var content = document.createElement( "content" );



  for ( var i =  0; i < this.graphNr  ; i ++ ) {

    var scene = new THREE.Scene();

    // make a list item

    var element = document.createElement( "div" );
    element.style.position = "relative";
    element.className =  "container-fluid";
    element.style.display = "inline-block";
    element.style.margin = "8em";
    element.style.padding = "0em";
    element.style.top = "-30";
    element.style.left ="-10";

    var canvas = document.createElement("canvas");

    canvas.style.position = "absolute";


    canvas.style.boxShadow = "3px 3px 4px 1px black";
    canvas.id = 'canvas'+i;

    canvas.width =   window.innerWidth  * 500 / 1600 ;
    canvas.height =  window.innerHeight  * 500 / 900;
    canvas.style.transform = "scale(0.9)";
    canvas.style.transition = "all 0.5s";

    element.appendChild(canvas);
    // Look up the element that represents the area
    // we want to render the scene
    element.style.width =  '500px';
    element.style.height =  '500px';
    scene.userData.element = element;


    content.appendChild( element );
    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    //var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
    //camera.position.z = 2;
    scene.userData.camera = camera;

    var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    this.scenes.push( scene );

  }
    //this.rendererContainer.nativeElement.getElementsByTagName("body")[0].style.width = "1500px";
    this.rendererContainer.nativeElement.getElementsByTagName("body")[0].appendChild(content);

    for(var i = 0 ; i< this.graphNr; i++) {
      document.getElementsByTagName("canvas")[i].setAttribute("id", "canvas" + i)
      switch(i){
        case 0:
          var labelsArr = Array.from(this.medicinesMap.keys());
          this.createPieChart("Medicines Information","Most common medicines",Array.from(this.medicinesMap.values()), i,labelsArr);
          break;
        case 1:
          var fullDataArray = [];
          fullDataArray.push(this.fillsDataMap.get("Filled") + this.fillsDataMap.get("Not filled"));
          fullDataArray.push(this.fillsDataMap.get("Filled"));
          fullDataArray.push(this.fillsDataMap.get("Not filled"));
          var labelsArray = ["Total prescriptions","Filled","Not filled"];
          this.createHBarChart("Prescription information","Filled to not filled prescription ratio",fullDataArray, i,labelsArray);
          break;
      case 2:
        var fullDataArray = [];
        fullDataArray.push(this.logsDataMap.get("Signups"));
        fullDataArray.push(this.logsDataMap.get("Logins"));
        fullDataArray.push(this.logsDataMap.get("Failed Logins"));
        var labelsArray = ["Signups","Logins", "Failed Logins"];
        this.createBarChart("Auth0 Information","Authentication and requests",fullDataArray, i,labelsArray);
        break;
      case 3:
        var fullDataArray = [];
        fullDataArray.push(this.logsDataMapReq.get("Successful Requests"));
        fullDataArray.push(this.logsDataMapReq.get("Unauthorized Requests"));
        var labelsArray = ["Successful Requests","Unauthorized Requests"];
        this.createPieChart("Auth0 Information","Requests - Last 100 requests",fullDataArray, i,labelsArray);
        break;
      }

    }

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( 0xffffff, 1 );
    this.renderer.setPixelRatio( window.devicePixelRatio );

  }

  ngAfterViewInit() {
    if(this.authService.hasRole(Role.ADMIN))
    {
      this.getLogsDataForGraphics('?per_page=100&q=type%3As%20type%3Afu%20type%3Ass').then((data)=> {
        let map = [];
        map.push(data);
        this.logsDataMap  = map[0];
        this.getLogsDataForGraphics('?per_page=100&q=type%3Afeccft%20type%3Aseccft').then((dataReq) => {
          let map = [];
          map.push(dataReq);
          this.logsDataMapReq  = map[0];
          console.log(this.logsDataMapReq);
          this.getMostUsedMedicinesDataForGraphics().then(() => {
            this.init();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
            this.animate();
          });
        });
      });
    }
    else{
      this.getMostUsedMedicinesDataForGraphics().then(() => {
        this.graphNr -=1;
        this.init();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
      });
    }
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.setClearColor( 0xffffff );
    this.renderer.setScissorTest( false );
    this.renderer.clear();

    this.renderer.setClearColor( 0xe0e0e0 );
    this.renderer.setScissorTest( true );

    for (var i = 0; i < this.activeCharts.length; i++) {

      this.activeCharts[i].draw();
      this.resize(this.activeCharts[i]);
    }
    for(var i = 0 ; i < this.scenes.length;i++)
    {

      // get the element that is a place holder for where we want to
      // draw the scene
      var element = this.scenes[i].userData.element;

      // get its position relative to the page's viewport
      var rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it --> Unneeded for now, unless we draw many graphs
      if ( rect.bottom < 0 || rect.top  > this.renderer.domElement.clientHeight ||
        rect.right  < 0 || rect.left > this.renderer.domElement.clientWidth ) {

        return;  // it's off screen

      }

      // set the viewport
      var width  = rect.right - rect.left;
      var height = rect.bottom - rect.top;
      var left   = rect.left;
      var top    = rect.top;

      this.renderer.setViewport( left, top, width, height );
      this.renderer.setScissor( left, top, width, height );

      var camera = this.scenes[i].userData.camera;


      //camera.aspect = width / height; // not changing in this example
      //camera.updateProjectionMatrix();

      //scene.userData.controls.update();

      this.renderer.render( this.scenes[i], camera );

    }
  }

  /**
   * Creates a Pie chart with the given data, and draws it in a canvas.
   * @param dataInputs the data for the chart
   * @param canvasIndex the index of the canvas it will be drawn
   */
  createPieChart(title,footer,dataInputs,canvasIndex,labelsArr)
  {
    var canvas = document.getElementById("canvas"+canvasIndex);
    canvas.addEventListener('dblclick', function(evt) {
      canvas.style.transform = "scale(1.05)";
    }, false);
    canvas.addEventListener('click', function(evt) {
      canvas.style.transform = "scale(0.9)";
    }, false);
    // Create Chart
    var Chart1 = new Tee.Tee.Chart("canvas"+canvasIndex);
    Chart1.title.text = title;
    Chart1.footer.text = footer;
    Chart1.panel.format.fill = "blue";
    Chart1.panel.transparent = true;
    // Add Bar series to Chart
    var pieData = new Tee.Tee.Pie( dataInputs );
    pieData.data.labels = labelsArr;
    Chart1.addSeries(pieData);
    Chart1.panel.format.fill = "blue";
    var  tip=new Tee.Tee.ToolTip(Chart1);

    tip.format.font.style="16px Tahoma";
    var t=new Tee.Tee.CursorTool(Chart1);

    t.format.stroke.size=2;

    t.format.stroke.fill="#BB0000";

    Chart1.tools.add(t);
    Chart1.tools.add(tip);
    this.activeCharts.push(Chart1);

   }






  /**
     * Creates a Line chart with the given data, and draws it in a canvas.
     * @param dataInputs the data for the chart
     * @param canvasIndex the index of the canvas it will be drawn
     */
   createLineChart(dataInputs,canvasIndex)
  {
    var Chart1 = new Tee.Tee.Chart("canvas"+canvasIndex);
    Chart1.title.text = "WebGL Line Chart";
    Chart1.footer.text = "TestFooter";

    // Add Bar series to Chart
    var lineData = new Tee.Tee.Line(dataInputs );
    Chart1.addSeries(lineData);
    Chart1.panel.format.fill = "blue";

    this.activeCharts.push(Chart1);
  }

    /**
     * Creates a Bar chart with the given data, and draws it in a canvas.
     * @param dataInputs the data for the chart
     * @param canvasIndex the index of the canvas it will be drawn
     */
   createBarChart(title,footer,dataInputs,canvasIndex,labels) {

      var canvas = document.getElementById("canvas"+canvasIndex);
      canvas.addEventListener('dblclick', function(evt) {
        canvas.style.transform = "scale(1.05)";
      }, false);
      canvas.addEventListener('click', function(evt) {
        canvas.style.transform = "scale(0.9)";
      }, false);
      var Chart1 = new Tee.Tee.Chart("canvas" + canvasIndex);
      Chart1.title.text = title;
      Chart1.footer.text = footer;
      Chart1.panel.format.fill = "blue";
      Chart1.panel.transparent = true;
      // Add Bar series to Chart:
      var bars = new Tee.Tee.Bar(dataInputs);

      bars.data.labels = labels;
      //Chart1.addSeries(new Tee.Line()).addRandom(10);
      Chart1.addSeries(bars);
      Chart1.panel.format.fill = "blue";
      var tip = new Tee.Tee.ToolTip(Chart1);

      tip.format.font.style = "16px Tahoma";

      Chart1.tools.add(tip);

      var b1 = new Tee.Tee.Annotation(Chart1, "Change Axis", 465, 105);

      b1.cursor = "pointer";

      b1.onclick = function (button, x, y) {
        Chart1.getSeries(0).vertAxis = (Chart1.getSeries(0).vertAxis) == "left" ? "right" : "left";


      }

      Chart1.tools.add(b1);


      this.activeCharts.push(Chart1);

    }


    /*
     animation.onstop=function() {
     if (animation.chart != Chart3)
     if (fadeAnimation.active)
     fadeAnimation.animate(animation.chart);
     }
    this.activeCharts.push(Chart1);
  }
  /**
   * Creates a Bar chart with the given data, and draws it in a canvas.
   * @param dataInputs the data for the chart
   * @param canvasIndex the index of the canvas it will be drawn
   */
  createHBarChart(title,footer,dataInputs,canvasIndex,labels)
  {

    var canvas = document.getElementById("canvas"+canvasIndex);
    canvas.addEventListener('dblclick', function(evt) {
      canvas.style.transform = "scale(1.05)";
    }, false);
    canvas.addEventListener('click', function(evt) {
      canvas.style.transform = "scale(0.9)";
    }, false);
    var Chart1 = new Tee.Tee.Chart("canvas"+canvasIndex);
    Chart1.title.text = title;
    Chart1.footer.text = footer;
    Chart1.panel.format.fill = "blue";
    Chart1.panel.transparent = true;
    // Add Bar series to Chart:
    var bars = new Tee.Tee.HorizBar(dataInputs);

    bars.data.labels = labels;
    //Chart1.addSeries(new Tee.Line()).addRandom(10);
    Chart1.addSeries(bars);
    Chart1.panel.format.fill = "blue";
    var  tip=new Tee.Tee.ToolTip(Chart1);

    tip.format.font.style="16px Tahoma";

    Chart1.tools.add(tip);

    var  b1=new Tee.Tee.Annotation(Chart1, "Change Axis", 455, 105);

    b1.cursor="pointer";

    b1.onclick=function(button,x,y)
    {
      Chart1.getSeries(0).vertAxis = (Chart1.getSeries(0).vertAxis)=="left"?"right":"left";


    }

    Chart1.tools.add( b1 );

    this.activeCharts.push(Chart1);
  }
   resize(chart){
  if (chart!=null){
    var startWidth=600;
    var startHeight=400;
    var w;
    var h;
    var canvas = chart.canvas;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

      w = window.innerWidth;
      h = window.innerHeight;
      if(w<=991){
        canvas.style.width="" + w* 1.3 + "px";
        canvas.style.height="" + w*1.3*startHeight/startWidth + "px";
      }
      else{
        canvas.style.width = "" + startWidth + "px";
        canvas.style.height = "" + startHeight + "px";
        chart.bounds.width = startWidth;
        chart.bounds.height = startHeight;
      }
      chart.draw();
    }
    else{
      w = startWidth;
      h = startHeight;

      if ((window.innerWidth - canvas.offsetLeft - 20) < startWidth)
        w = window.innerWidth - canvas.offsetLeft - 20;
      else
        w = startWidth;

      if ((window.innerWidth * startHeight / startWidth) < startHeight)
        h =window.innerWidth * startHeight / startWidth;
      else
        h = startHeight;

      canvas.setAttribute('width', ""+w+"px");

      canvas.setAttribute('height', ""+h+"px");

      canvas.style.width=""+w+"px";
      canvas.style.height=""+h+"px";

      chart.bounds.width=w;
      chart.bounds.height=h;

      chart.draw();
    }
  }
}
}
