
import { Color } from 'three';
import {projects} from './projects.js';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container =  document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({container,backgroundColor: new Color
    (255,255,255)});

viewer.axes.setAxes();
viewer.grid.setGrid();

// Get the current project ID from the URL parameter
const currentUrl = window.location.href; 
const url = new URL(currentUrl);
const currentProjectID = url.searchParams.get("id");

// Get the current project
const currentProject = projects.find(project => project.id === currentProjectID);

// Add the project URL 
viewer.IFC.loadIfcUrl(currentProject.url);

//window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem();
//window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();

//set up selection planes
const selectionButton = document.getElementById('selection-button');
let selectionPlanesActive = false;
selectionButton.onclick =() => {
    selectionPlanesActive =!selectionPlanesActive;
    //viewer.selector.active = selectionPlanesActive;
    if(selectionPlanesActive) {
        selectionButton.classList.add('active');
        window.onclick = async () => await viewer.IFC.selector.pickIfcItem();
        window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();
        viewer.IFC.selector.update();
    }
 else{
    selectionButton.classList.remove('active');
    window.onclick =null;
    window.onmousemove = null;
    viewer.IFC.selector.unpickIfcItems();
    viewer.IFC.selector.unHighlightIfcItems();

   }
   
}

// set up dimension planes
const dimensionButton = document.getElementById('dimension-button');
let dimensionPlanesActive = false;
dimensionButton.onclick =() => {
    dimensionPlanesActive =!dimensionPlanesActive;
    //viewer.selector.active = selectionPlanesActive;
    if(dimensionPlanesActive) {
        dimensionButton.classList.add('active');
        viewer.dimensions.active = true;
        viewer.dimensions.previewActive = true;
        window.ondblclick = () => {
            viewer.dimensions.create();
      }
      
    }
 else{
    dimensionButton.classList.remove('active');
    //window.ondblclick =null;
    viewer.dimensions.delete();
    viewer.dimensions.active =false;
    viewer.dimensions.previewActive =false;
  
   }
   
}


//set up clipping planes
const clipperButton =document.getElementById('clipper-button');
let clippingPlanesActive = false;
clipperButton.onclick =() => {
   
    clippingPlanesActive =!clippingPlanesActive;
    viewer.clipper.active = clippingPlanesActive;
    if(clippingPlanesActive) {
        clipperButton.classList.add('active');
    }
 else{
    clipperButton.classList.remove('active');
   }
}

window.ondblclick =() => {
    if(clippingPlanesActive) {
        viewer.clipper.createPlane();
    }
}
window.onkeydown =(event) => {
    if(event.code ==='Delete' && clippingPlanesActive){viewer.clipper.deletePlane();
    }
  
}