import "./HomePage.css";
import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import InputField from "../../components/inputField/inputField.js";
import MultiInputField from "../../components/multipleInput/multiInputField.js";

import tableContent from "./tableData.json";

const columns = [
    { label: "Book Name", accessor: "name", width: "40vw" },
    { label: "Author", accessor: "author", width: "25vw" },
    {
        label: "Status", accessor: "status", width: "10vw",
        visibleValueMapping: {
            STATUS_AVAILABLE: "Available",
            STATUS_UNAVAILABLE: "Unavailable"
        },
        opacityLevel: {
            Available: 1,
            Unavailable: 0.6
        }
    }
];

const HomePage = () => {
    // const { state } = useLocation();
    // const { _jwt } = state;
    // console.log(JSON.stringify(jwt));

    let [leftTabStateParams, updateLeftTabState] = useState({
        LeftTabArrow: "fa fa-chevron-circle-right",
        isHoverActive: false
    });

    function updateLeftTabHoverState() {
        updateLeftTabState({ ...leftTabStateParams, LeftTabArrow: leftTabStateParams.isHoverActive ? "fa fa-chevron-circle-right" : "fa fa-chevron-circle-left", isHoverActive: !leftTabStateParams.isHoverActive });
    }

    let [searchValue, updateSearchValue] = useState("");

    function onChange() { }

    let [isSettingsHover, updateSettingsHover] = useState(false);

    function updateMainTabSettingsHoverState() {
        if (!isFilterOpen)
            updateSettingsHover(!isSettingsHover);
    }

    function refreshPage() {
        window.location.reload();
    }

    let [isFilterOpen, updateFilterHoverState] = useState(false);

    function updateMainTabFilterState() {
        updateSettingsHover(false);
        updateFilterHoverState(!isFilterOpen);
    }

    let [filterTabStateParams, updateFilterTabState] = useState(initializeFilterTabValues());

    function updateTableFilter() {
        let updatedTableData = [...tableContent];
        for (let eachColumn of columns) {
            if (filterTabStateParams[eachColumn.label]) {
                let filterValue = filterTabStateParams[eachColumn.label];
                // if (eachColumn.visibleValueMapping) {
                //     for (let eachValue in eachColumn.visibleValueMapping) {
                //         filterValue = (eachColumn.visibleValueMapping[eachValue] === filterValue) ? eachValue : filterValue;
                //     }
                // }
                updatedTableData = updatedTableData.filter(eachRow => eachRow[eachColumn.accessor] === filterValue);
            }
        }
        setTableData(updatedTableData);
        updateMainTabFilterState();
    }

    const [tableData, setTableData] = useState(tableContent);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        const sorted = [...tableData].sort((a, b) => {
            if (a[accessor] === null) return 1;
            if (b[accessor] === null) return -1;
            if (a[accessor] === null && b[accessor] === null) return 0;
            return (
                a[accessor].toString().localeCompare(b[accessor].toString(), "en", {
                    numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1)
            );
        });
        setTableData(sorted);
    };

    return (
        <div className="HomePage">
            <style>
                @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
                @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
            </style>

            <div className="HomeLeftTab" onMouseEnter={updateLeftTabHoverState} onMouseLeave={updateLeftTabHoverState} style={{ width: leftTabStateParams.isHoverActive ? "15vw" : "1.5vw", transition: "0.3s" }}>
                <i className={`${leftTabStateParams.LeftTabArrow} HomeLeftTabArrow`} style={{
                    left: leftTabStateParams.isHoverActive ? "14vw" : "0.5vw",
                    top: leftTabStateParams.isHoverActive ? "5vh" : "45vh", fontSize: "48px", color: "#FFFFFF", textShadow: "0 0 15px #1B1340", transition: "0.3s"
                }} />
                <div className="HomeLeftTabContent" style={{ fontSize: leftTabStateParams.isHoverActive ? "50px" : "0", transition: "0.3s" }}>
                    Home Page
                </div>
            </div>

            <div className="HomeMain">
                <div style={{ marginTop: "2vh", marginBottom: "2vh", display: "flex", flexDirection: "row", filter: isFilterOpen || leftTabStateParams.isHoverActive ? "blur(12px)" : null, opacity: isFilterOpen || leftTabStateParams.isHoverActive ? "0.4" : "1", transition: "1s" }}>
                    <InputField label="Book Name"
                        maxLength="60"
                        locked={isFilterOpen}
                        width={50}
                        fieldType="search"
                        placeholder="Enter the book name"
                        spellCheck={true}
                        showCancel={true}
                        value={searchValue}
                        stateParamDetails={{ stateFunction: updateSearchValue }}
                        onChangeFunction={(event) => { onChange() }}
                        onSearchFunction={onChange} />
                    <i className="bi bi-gear-fill" style={{ fontSize: "5vh", marginLeft: "1vw", color: "#1B1340", cursor: isFilterOpen ? null : "pointer" }} onMouseEnter={updateMainTabSettingsHoverState} onMouseLeave={updateMainTabSettingsHoverState}>
                        <div className="settingsDropdown" style={{ display: isSettingsHover ? "flex" : "none", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row" }} onClick={refreshPage}><i className="fa fa-refresh" /><div style={{ marginLeft: "0.5vw" }}>Refresh</div></div>
                            <div style={{ display: "flex", flexDirection: "row" }} onClick={updateMainTabFilterState}><i className="bi bi-funnel" /><div style={{ marginLeft: "0.5vw" }}>Filter</div></div>
                        </div>
                    </i>
                </div>

                <div className="homeBookListTable" style={{ filter: isFilterOpen || leftTabStateParams.isHoverActive ? "blur(12px)" : null, opacity: isFilterOpen || leftTabStateParams.isHoverActive ? "0.4" : "1", transition: "1s" }}>
                    <div className="homeBookListTableEachRow header">
                        {columns.map((eachHeader) => {
                            return (
                                <div key={eachHeader.accessor} className="homeBookListTableEachCell header" style={{ width: eachHeader.width }} onClick={(eachHeader.sortable === false) || isFilterOpen ? null : () => handleSortingChange(eachHeader.accessor)}>
                                    <div >{eachHeader.label}</div>
                                    <i className={order === "asc" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}
                                        style={{ display: (eachHeader.accessor === sortField) ? "block" : "none", marginLeft: "5px" }} />
                                </div>
                            )
                        })}
                    </div>
                    {tableData.map((data, index) => {
                        let colorCodingColumn = columns.find(eachColumn => eachColumn.colorCoding);
                        let backgroundColor = colorCodingColumn?.colorCoding[data[colorCodingColumn.accessor]] ? colorCodingColumn.colorCoding[data[colorCodingColumn.accessor]] : undefined;

                        let opacityLevelColumn = columns.find(eachColumn => eachColumn.opacityLevel);
                        let opacityLevel = opacityLevelColumn?.opacityLevel[data[opacityLevelColumn.accessor]] ? opacityLevelColumn.opacityLevel[data[opacityLevelColumn.accessor]] : undefined;
                        return (
                            <div key={index} className="homeBookListTableEachRow body" style={{ backgroundColor, opacity: opacityLevel }}>
                                {columns.map(({ accessor, visibleValueMapping }, columnIndex) => {
                                    if (visibleValueMapping && visibleValueMapping[data[accessor]]) {
                                        data[accessor] = visibleValueMapping[data[accessor]];
                                    }
                                    let tData = data[accessor] ? data[accessor] : "——";
                                    return (
                                        <div key={accessor} className="homeBookListTableEachCell body" style={{ width: columns[columnIndex].width, backgroundColor, opacity: opacityLevel }}>{tData}</div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <div className="homeMainFilterTab" style={{ display: isFilterOpen ? "flex" : "none" }}>
                    <div style={{ margin: "2vh" }}>FILTER</div>
                    <i className="bi bi-x-lg homePageFilterTabCancelIcon"
                        onClick={updateMainTabFilterState} />
                    {columns.map(eachHeader => {
                        return (
                            <InputField label={eachHeader.label}
                                key={eachHeader.label}
                                stateParamDetails={{
                                    stateValues: filterTabStateParams, stateFunction: updateFilterTabState, keyName: eachHeader.label
                                }}
                                fieldType="multipleSelect"
                                value={filterTabStateParams[eachHeader.label]}
                                predictedValues={tableContent.map(eachResponse => eachResponse[eachHeader.accessor])} />
                        )
                    })}
                    <div className="homePageFilterTabButtonsTab">
                        <button onClick={updateTableFilter} className="homePageFilterTabButtons">Submit</button>
                        <button onClick={() => {
                            updateFilterTabState(initializeFilterTabValues());
                        }} className="homePageFilterTabButtons">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function initializeFilterTabValues() {
    let filterTabFields = {};
    for (let eachColumn of columns) {
        filterTabFields[eachColumn.label] = "";
    }
    return filterTabFields;
}

export default HomePage;
