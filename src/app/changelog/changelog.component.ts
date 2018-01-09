import {Component, ViewChild, ElementRef} from '@angular/core';
import * as THREE from 'three';
import * as Tee from 'assets/WebGL/Dashboard/teechart.js';
import { MedicalReceiptService } from '../shared/medical-receipts/medical-receipt.service'
import { MedicalReceipt } from '../model/medical-receipt'
import {recordMapEntry} from "@angular/compiler-cli/src/metadata/evaluator";


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
  graphNr = 2;
  receipts: MedicalReceipt[] = [];
  medicinesMap  = new Map();
  fillsDataMap = new Map();

  constructor(private receiptService: MedicalReceiptService) {


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
    element.className =  "list-item";
    element.style.display = "inline-block";
    element.style.margin = "10em";
    element.style.padding = "10em";

    var canvas = document.createElement("canvas");

    canvas.style.position = "relative";


    canvas.style.boxShadow = "3px 3px 4px 1px black";
    canvas.id = 'canvas'+i;

    canvas.width = 400;
    canvas.height = 500;

    element.appendChild(canvas);
    // Look up the element that represents the area
    // we want to render the scene
    element.style.width =  '1px';
    element.style.height =  '1px';
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
          this.createBarChart("Prescription information","Filled to not filled prescription ratio",fullDataArray, i,labelsArray);
          break;
      }

    }

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( 0xffffff, 1 );
    this.renderer.setPixelRatio( window.devicePixelRatio );

  }

  ngAfterViewInit() {
    this.getMostUsedMedicinesDataForGraphics().then(() => {
      this.init();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      this.animate();
    });
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
    // Create Chart
    var Chart1 = new Tee.Tee.Chart("canvas"+canvasIndex);
    Chart1.title.text = title;
    Chart1.footer.text = footer;

    // Add Bar series to Chart
    var pieData = new Tee.Tee.Pie( dataInputs );
    pieData.data.labels = labelsArr;
    Chart1.addSeries(pieData);
    Chart1.panel.format.fill = "blue";

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
   createBarChart(title,footer,dataInputs,canvasIndex,labels)
  {

    var Chart1 = new Tee.Tee.Chart("canvas"+canvasIndex);
    Chart1.title.text = title;
    Chart1.footer.text = footer;

    // Add Bar series to Chart:
    var bars = new Tee.Tee.Bar(dataInputs);
    bars.data.labels = labels;
    //Chart1.addSeries(new Tee.Line()).addRandom(10);
    Chart1.addSeries(bars);
    Chart1.panel.format.fill = "blue";

    this.activeCharts.push(Chart1);
  }
}
