import { useTable, useFilters, useSortBy } from 'react-table'
import React, { useState } from 'react'

import './Table.scss'

export const Table = ({ columns, data, deleteFunction }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
    } = useTable({
        columns,
        data,
    },
        useFilters,
        useSortBy
    );

    const handleFilterChange = (e, column) => {
        const value = e.target.value || undefined;
        setFilter(column.id, value);
    };

    return (
        <div className='table_container'>

            <table {...getTableProps()} className='table'>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>

                                    <div {...column.getHeaderProps(column.getSortByToggleProps())} title=''
                                        className={
                                            `${column.isSorted
                                                ? column.isSortedDesc
                                                    ? "sort-desc"
                                                    : "sort-asc"
                                                : ""} header_name`

                                        }>
                                        {column.render('Header')}
                                    </div>
                                    <div className='filter_box extended'>
                                        <input
                                            onChange={(e) => handleFilterChange(e, column)}
                                            placeholder={"Поиск..."} />
                                    </div>

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}