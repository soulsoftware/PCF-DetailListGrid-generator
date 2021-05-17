"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailListGridTemplate = void 0;
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var DetailListGridControl_1 = require("./DetailListGridControl");
var DetailListGridTemplate = /** @class */ (function () {
    function DetailListGridTemplate() {
    }
    Object.defineProperty(DetailListGridTemplate.prototype, "_isModelApp", {
        get: function () {
            return window.hasOwnProperty('getGlobalContextObject');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    DetailListGridTemplate.prototype.init = function (context, notifyOutputChanged, state, container) {
        // Need to track container resize so that control could get the available width. 
        // The available height won't be provided even when this is true
        context.mode.trackContainerResize(true);
        this._container = container;
        this._context = context;
        this._dataSetVersion = 0;
        this._props = {
            pcfContext: this._context,
            isModelApp: this._isModelApp,
            dataSetVersion: this._dataSetVersion
        };
        // set the container to display to relative so that our Scrollable Panel does not cover up the
        // Dynamics ribbon or quick search.
        this._container.style.position = 'relative';
        this._detailList = document.createElement("div");
        this._detailList.setAttribute("id", "detailList");
        // if data-is-scrollable is not set then grid will not show all results.
        this._detailList.setAttribute("data-is-scrollable", "true");
        //we need to set the grid height.  If the allocated height is not -1 then we are in a canvas app 
        //and we need to set the heigh based upon the allocated height of the container.
        if (this._context.mode.allocatedHeight !== -1) {
            this._detailList.style.height = this._context.mode.allocatedHeight + "px";
        }
        else {
            // sets the height based upon the rowSpan which is there but not included in the Mode interace when
            // the control is a subgrid.
            // Then multiple by 1.5 em which is what MS uses per row.	
            var rowspan = this._context.mode.rowSpan;
            console.log('rowSpan', rowspan);
            if (rowspan)
                this._detailList.style.height = (rowspan * 1.5) + "em";
        }
        this._container.appendChild(this._detailList);
        //set the paging size to 5000
        context.parameters.sampleDataSet.paging.setPageSize(5000);
    };
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    DetailListGridTemplate.prototype.updateView = function (context) {
        // console.log( context )
        // for( let p in context ) {		
        // 	console.log( p )
        // 	console.log( (<any>context)[p] )
        // }
        var dataSet = context.parameters.sampleDataSet;
        if (dataSet.loading)
            return;
        //Are we in a canvas app?
        if (!this._isModelApp) {
            //since we are in a canvas app let's make sure we set the height of the control
            this._detailList.style.height = (this._context.mode.allocatedHeight).toString() + "px";
            //Setting the page size in a Canvas app works on the first load of the component.  If you navigate
            // away from the page on which the component is located though the paging get reset to 25 when you
            // navigate back.  In order to fix this we need to reset the paging to the count of the records that
            // will come back and do a reset on the paging.  I beleive this is all due to a MS bug.	
            //@ts-ignore
            //console.log(`TS: updateView, dataSet.paging.pageSize ${dataSet.paging.pageSize}`);	
            //console.log(`TS: updateView, dataSet.paging.totalResultCount ${dataSet.paging.totalResultCount}`)
            dataSet.paging.setPageSize(dataSet.paging.totalResultCount);
            dataSet.paging.reset();
        }
        //if data set has additional pages retrieve them before running anything else
        if (this._isModelApp && dataSet.paging.hasNextPage) {
            dataSet.paging.loadNextPage();
            return;
        }
        //useEffect on the dataSet itself was not picking up on all the updates so pass in a dataset version
        // and update it in the props so the react control knows it was updated.
        this._props.dataSetVersion = this._dataSetVersion++;
        // render the DetailsList control
        ReactDOM.render(React.createElement(DetailListGridControl_1.DetailListGridControl, this._props), this._detailList);
    };
    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    DetailListGridTemplate.prototype.getOutputs = function () {
        return {};
    };
    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    DetailListGridTemplate.prototype.destroy = function () {
        // Add code to cleanup control if necessary
    };
    return DetailListGridTemplate;
}());
exports.DetailListGridTemplate = DetailListGridTemplate;
