import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import React, { useState, useEffect, useContext, createContext } from 'react'

import { Row } from './Row'
import { AddBox } from './AddBox'


export const BigTable = ({ columns, data, fetchFunction, pageCount: controlledPageCount, url, addUrl }) => {
    const [edited, setEdited] = useState(false)
    const [filterInputData, setFilterInputData] = useState({});
    const [showFilters, setShowFilters] = useState(false);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        loading,
        prepareRow,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setHiddenColumns,
        state: { pageIndex, pageSize, sortBy },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        manualSortBy: true,
        autoResetPage: false,
        autoResetSortBy: false,
        pageCount: controlledPageCount,
    },
        useFilters,
        useSortBy,
        usePagination
    );

    useEffect(() => {
        let by = sortBy[0]?.id || "id"
        let direction = sortBy[0]?.desc ? "DESC" : "ASC"
        fetchFunction && fetchFunction({ pageIndex, pageSize, by, direction, filter: filterInputData })
        setEdited(false)
    }, [pageIndex, pageSize, sortBy, edited])

    const handleChange = (e) => {
        setFilterInputData({ ...filterInputData, [e.target.name]: e.target.value });
    };

    const applyFilter = () => {
        setEdited(true)
        gotoPage(0)
    }

    const resetFilter = () => {
        setFilterInputData({})
        setEdited(true)
        setShowFilters(false)
    }

    const toggleFilterButton = () => {
        if (showFilters) {
            setAnimateSearchControls(false)
            setTimeout(() => {
                resetFilter()
            }, 200)

        } else {
            setShowFilters(true)
            setTimeout(() => {
                setAnimateSearchControls(true)
            }, 10)
        }
    }

    const [animateSearchControls, setAnimateSearchControls] = useState(false);

    function handleFilterKeyDown(e) {
        if (e.keyCode === 13) {
            applyFilter();
        }
    }

    return (
        <div className='entity_container'>
            <div className="search_controls">
                <div
                    className={`filter_button ${showFilters ? "enabled" : ""}`}
                    onClick={() => toggleFilterButton()}>
                </div>
                {showFilters &&
                    <div className={`search_right ${animateSearchControls ? "extended" : ""}`}>
                        <button
                            className='filter_button--apply'
                            onClick={() => applyFilter()}>
                            Применить
                        </button>
                        <button
                            className='filter_button--reset'
                            onClick={() => toggleFilterButton()}>
                            Очистить
                        </button>
                    </div>
                }
            </div>
            <div className='table_container'>
                <table {...getTableProps()} className='table'>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => {
                                    if (column.id !== "password") {
                                        return (
                                            <th {...column.getHeaderProps()}>

                                                <div {...column.getHeaderProps(column.getSortByToggleProps())} title=''
                                                    className={
                                                        `${column.isSorted
                                                            ? column.isSortedDesc
                                                                ? "sort-asc"
                                                                : "sort-desc"
                                                            : ""} header_name`
                                                    }
                                                >
                                                    {column.render('Header')}
                                                </div>
                                                {showFilters && column.id !== "id" &&
                                                    <div className={`filter_box ${animateSearchControls ? "extended" : ""}`}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={column.id}
                                                            placeholder={"Фильтр..."}
                                                            onKeyDown={handleFilterKeyDown} />
                                                    </div>
                                                }
                                            </th>
                                        )
                                    }
                                }
                                )}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            return <Row key={i} columns={columns} prepareRow={prepareRow} row={row} url={url} setEdited={setEdited} />
                        })}
                    </tbody>
                </table>
            </div>

            <div className='pagination_container'>
                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                </div>
                <div className='goto_page'>
                    <span>
                        Страница
                    </span>
                    <strong>
                        {pageIndex + 1} из {pageOptions.length}
                    </strong>
                    <div>
                        | Перейти к странице:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            min={1}
                            max={pageCount}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </div>{' '}
                </div>
                <div>
                    {"Записей на странице: "}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <AddBox columns={columns} setEdited={setEdited} addUrl={addUrl} />
        </ div>
    )
}