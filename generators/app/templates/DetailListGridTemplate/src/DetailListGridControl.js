"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DetailListGridControl = void 0;
var React = __importStar(require("react"));
var Link_1 = require("@fluentui/react/lib/Link");
var Label_1 = require("@fluentui/react/lib/Label");
var ScrollablePane_1 = require("@fluentui/react/lib/ScrollablePane");
var Sticky_1 = require("@fluentui/react/lib/Sticky");
var Utilities_1 = require("@fluentui/react/lib/Utilities");
var DetailsList_1 = require("@fluentui/react/lib/DetailsList");
var Tooltip_1 = require("@fluentui/react/lib/Tooltip");
var icons_1 = require("@fluentui/react/lib/icons");
var lcid = __importStar(require("lcid"));
//Initialize the icons otherwise they will not display in a Canvas app.
//They will display in Model app because Microsoft initializes them in their controls.
icons_1.initializeIcons();
var DetailListGridControl = function (props) {
    // using react hooks to create functional which will allow us to set these values in our code
    // eg. when we calculate the columns we can then udpate the state of them using setColums([our new columns]);
    // we have passed in an empty array as the default.
    // const [columns, setColumns] = React.useState(_getColumns);
    // const [items, setItems] = React.useState(_getItems);
    var _a = React.useState(getColumns(props.pcfContext)), columns = _a[0], setColumns = _a[1];
    var _b = React.useState(getItems(columns, props.pcfContext)), items = _b[0], setItems = _b[1];
    var _c = React.useState(props.isModelApp), isDataLoaded = _c[0], setIsDataLoaded = _c[1];
    // react hook to store the number of selected items in the grid which will be displayed in the grid footer.
    var _d = React.useState(0), selectedItemCount = _d[0], setSelectedItemCount = _d[1];
    // Set the isDataLoaded state based upon the paging totalRecordCount
    React.useEffect(function () {
        var dataSet = props.pcfContext.parameters.sampleDataSet;
        if (dataSet.loading || props.isModelApp)
            return;
        setIsDataLoaded(dataSet.paging.totalResultCount !== -1);
    }, [items]);
    // When the component is updated this will determine if the sampleDataSet has changed.  
    // If it has we will go get the udpated items.
    React.useEffect(function () {
        //console.log('TSX: props.dataSetVersion was updated');        
        setItems(getItems(columns, props.pcfContext));
    }, [props.dataSetVersion]);
    // When the component is updated this will determine if the width of the control has changed.
    // If so the column widths will be adjusted.
    React.useEffect(function () {
        //console.log('width was updated');
        setColumns(updateColumnWidths(columns, props.pcfContext));
    }, [props.pcfContext.mode.allocatedWidth]);
    // the selector used by the DetailList
    var _selection = new DetailsList_1.Selection({
        onSelectionChanged: function () { return _setSelectedItemsOnDataSet(); }
    });
    // sets the selected record id's on the Dynamics dataset.
    // this will allow us to utilize the ribbon buttons since they need
    // that data set in order to do things such as delete/deactivate/activate/ect..
    var _setSelectedItemsOnDataSet = function () {
        var selectedKeys = [];
        var selections = _selection.getSelection();
        for (var _i = 0, selections_1 = selections; _i < selections_1.length; _i++) {
            var selection = selections_1[_i];
            selectedKeys.push(selection.key);
        }
        setSelectedItemCount(selectedKeys.length);
        props.pcfContext.parameters.sampleDataSet.setSelectedRecordIds(selectedKeys);
    };
    // when a column header is clicked sort the items
    var _onColumnClick = function (ev, column) {
        var isSortedDescending = column === null || column === void 0 ? void 0 : column.isSortedDescending;
        // If we've sorted this column, flip it.
        if (column === null || column === void 0 ? void 0 : column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        // Reset the items and columns to match the state.
        setItems(copyAndSort(items, column === null || column === void 0 ? void 0 : column.fieldName, props.pcfContext, isSortedDescending));
        setColumns(columns.map(function (col) {
            col.isSorted = col.key === (column === null || column === void 0 ? void 0 : column.key);
            col.isSortedDescending = isSortedDescending;
            return col;
        }));
    };
    var _onRenderDetailsHeader = function (props, defaultRender) {
        return (<Sticky_1.Sticky stickyPosition={Sticky_1.StickyPositionType.Header} isScrollSynced={true}>
                {defaultRender(__assign(__assign({}, props), { onRenderColumnHeaderTooltip: function (tooltipHostProps) { return <Tooltip_1.TooltipHost {...tooltipHostProps}/>; } }))}
            </Sticky_1.Sticky>);
    };
    var _onRenderDetailsFooter = function (props, defaultRender) {
        return (<Sticky_1.Sticky stickyPosition={Sticky_1.StickyPositionType.Footer} isScrollSynced={true} stickyBackgroundColor={'white'}>
                <Label_1.Label className="footer-item">Records: {items.length.toString()} ({selectedItemCount} selected)</Label_1.Label>               
            </Sticky_1.Sticky>);
    };
    return (<ScrollablePane_1.ScrollablePane scrollbarVisibility={ScrollablePane_1.ScrollbarVisibility.auto}>
                  
                <DetailsList_1.DetailsList items={items} columns={columns} setKey="set" selection={_selection} // updates the dataset so that we can utilize the ribbon buttons in Dynamics                                        
     onColumnHeaderClick={_onColumnClick} // used to implement sorting for the columns.                    
     selectionPreservedOnEmptyClick={true} ariaLabelForSelectionColumn="Toggle selection" ariaLabelForSelectAllCheckbox="Toggle selection for all items" checkButtonAriaLabel="Row checkbox" selectionMode={Utilities_1.SelectionMode.multiple} onRenderDetailsHeader={_onRenderDetailsHeader} onRenderDetailsFooter={_onRenderDetailsFooter} layoutMode={DetailsList_1.DetailsListLayoutMode.justified} constrainMode={DetailsList_1.ConstrainMode.unconstrained}/>                   
        </ScrollablePane_1.ScrollablePane>);
};
exports.DetailListGridControl = DetailListGridControl;
// navigates to the record when user clicks the link in the grid.
var navigate = function (item, linkReference, pcfContext) {
    return pcfContext.parameters.sampleDataSet.openDatasetItem(item[linkReference + "_ref"]);
};
// get the items from the dataset
var getItems = function (columns, pcfContext) {
    var dataSet = pcfContext.parameters.sampleDataSet;
    var resultSet = dataSet.sortedRecordIds.map(function (key) {
        var record = dataSet.records[key];
        var newRecord = {
            key: record.getRecordId()
        };
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            newRecord[column.key] = record.getFormattedValue(column.key);
            if (isEntityReference(record.getValue(column.key))) {
                var ref = record.getValue(column.key);
                newRecord[column.key + "_ref"] = ref;
            }
            else if (column.data.isPrimary) {
                newRecord[column.key + "_ref"] = record.getNamedReference();
            }
        }
        return newRecord;
    });
    return resultSet;
};
// get the columns from the dataset
var getColumns = function (pcfContext) {
    var _a, _b, _c, _d;
    var dataSet = pcfContext.parameters.sampleDataSet;
    var iColumns = [];
    var columnWidthDistribution = getColumnWidthDistribution(pcfContext);
    var _loop_1 = function (column) {
        var iColumn = {
            className: 'detailList-cell',
            headerClassName: 'detailList-gridLabels',
            key: column.name,
            name: column.displayName,
            fieldName: column.alias,
            currentWidth: column.visualSizeFactor,
            minWidth: 5,
            maxWidth: ((_a = columnWidthDistribution.find(function (x) { return x.name === column.alias; })) === null || _a === void 0 ? void 0 : _a.width) || column.visualSizeFactor,
            isResizable: true,
            data: { isPrimary: column.isPrimary },
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
        };
        //create links for primary field and entity reference.            
        if (column.dataType.startsWith('Lookup.') || column.isPrimary) {
            iColumn.onRender = function (item, index, column) { return (<Link_1.Link key={item.key} onClick={function () { return navigate(item, column.fieldName, pcfContext); }}>{item[column.fieldName]}</Link_1.Link>); };
        }
        else if (column.dataType === 'SingleLine.Email') {
            iColumn.onRender = function (item, index, column) { return (<Link_1.Link href={"mailto:" + item[column.fieldName]}>{item[column.fieldName]}</Link_1.Link>); };
        }
        else if (column.dataType === 'SingleLine.Phone') {
            iColumn.onRender = function (item, index, column) { return (<Link_1.Link href={"skype:" + item[column.fieldName] + "?call"}>{item[column.fieldName]}</Link_1.Link>); };
        }
        //set sorting information
        var isSorted = ((_b = dataSet === null || dataSet === void 0 ? void 0 : dataSet.sorting) === null || _b === void 0 ? void 0 : _b.findIndex(function (s) { return s.name === column.name; })) !== -1 || false;
        iColumn.isSorted = isSorted;
        if (isSorted) {
            iColumn.isSortedDescending = ((_d = (_c = dataSet === null || dataSet === void 0 ? void 0 : dataSet.sorting) === null || _c === void 0 ? void 0 : _c.find(function (s) { return s.name === column.name; })) === null || _d === void 0 ? void 0 : _d.sortDirection) === 1 || false;
        }
        iColumns.push(iColumn);
    };
    for (var _i = 0, _e = dataSet.columns; _i < _e.length; _i++) {
        var column = _e[_i];
        _loop_1(column);
    }
    return iColumns;
};
var getColumnWidthDistribution = function (pcfContext) {
    var widthDistribution = [];
    var columnsOnView = pcfContext.parameters.sampleDataSet.columns;
    // Considering need to remove border & padding length
    var totalWidth = pcfContext.mode.allocatedWidth - 250;
    //console.log(`new total width: ${totalWidth}`);
    var widthSum = 0;
    columnsOnView.forEach(function (columnItem) {
        widthSum += columnItem.visualSizeFactor;
    });
    var remainWidth = totalWidth;
    columnsOnView.forEach(function (item, index) {
        var widthPerCell = 0;
        if (index !== columnsOnView.length - 1) {
            var cellWidth = Math.round((item.visualSizeFactor / widthSum) * totalWidth);
            remainWidth = remainWidth - cellWidth;
            widthPerCell = cellWidth;
        }
        else {
            widthPerCell = remainWidth;
        }
        widthDistribution.push({ name: item.alias, width: widthPerCell });
    });
    return widthDistribution;
};
// Updates the column widths based upon the current side of the control on the form.
var updateColumnWidths = function (columns, pcfContext) {
    var columnWidthDistribution = getColumnWidthDistribution(pcfContext);
    var currentColumns = columns;
    //make sure to use map here which returns a new array, otherwise the state/grid will not update.
    return currentColumns.map(function (col) {
        var newMaxWidth = columnWidthDistribution.find(function (x) { return x.name === col.fieldName; });
        if (newMaxWidth)
            col.maxWidth = newMaxWidth.width;
        return col;
    });
};
//sort the items in the grid.
var copyAndSort = function (items, columnKey, pcfContext, isSortedDescending) {
    var key = columnKey;
    var sortedItems = items.slice(0);
    sortedItems.sort(function (a, b) { return (a[key] || '').toString().localeCompare((b[key] || '').toString(), getUserLanguage(pcfContext), { numeric: true }); });
    if (isSortedDescending) {
        sortedItems.reverse();
    }
    return sortedItems;
};
var getUserLanguage = function (pcfContext) {
    var language = lcid.from(pcfContext.userSettings.languageId);
    return language.substring(0, language.indexOf('_'));
};
// determine if object is an entity reference.
var isEntityReference = function (obj) {
    return typeof (obj === null || obj === void 0 ? void 0 : obj.etn) === 'string';
};
