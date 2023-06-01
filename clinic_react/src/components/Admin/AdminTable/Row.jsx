import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useErrorMessage } from '../../../hook/useErrorMessage'

export const Row = ({ prepareRow, row, columns, url, setEdited }) => {
    const [extend, setExtend] = useState(false)
    const [extendClass, setExtendClass] = useState(false)
    const [id, setId] = useState(null)
    const [inputData, setInputData] = useState({})
    const extendedRef = useRef(null)
    const rowRef = useRef(null)
    const { setErrorPopUp, setOkPopUp } = useErrorMessage();



    useEffect(() => {
        const handleClick = (e) => {
            if (extendedRef.current) {
                if (!extendedRef.current.contains(e.target)) {
                    unExtend()
                }
            }
        };
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [extendedRef]);

    const unExtend = () => {
        setTimeout(() => {
            setExtendClass(false)
        }, 100);
        setTimeout(() => {
            setExtend(false);
        }, 300)
    }

    useEffect(() => {
        setId(row.cells[0].value)

        let props = {}
        row.cells.forEach(element => {
            let name = element.column.id
            let value = element.value
            props = ({ ...props, [name]: value })
        });
        setInputData(props);
    }, [row])

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const updateFunction = () => {
        axios.put(url + "/update", inputData, {
            headers: {
                Authorization: `Bearer ${localStorage.admin}`,
            }
        })
            .then(res => {
                setEdited(true)
                showPopUp(setOkPopUp)
            })
            .catch(err => {
                showPopUp(setErrorPopUp)
            });
    }

    const deleteFunction = () => {
        axios.delete(url + "/delete/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.admin}`,
            }
        })
            .then(res => {
                setEdited(true)
                unExtend()
            })
            .catch(err => {
                showPopUp(setErrorPopUp)
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFunction(inputData);
    };

    const handleClick = () => {
        if (!extend) {
            setExtend(!extend);
            setTimeout(() => {
                setExtendClass(!extendClass);
            }, 1)
        }
    }

    const showPopUp = (setPopUp) => {
        setPopUp(true)
        setTimeout(() => {
            setPopUp(false)
        }, 5000)
    }

    prepareRow(row)
    return (
        <>
            <tr ref={rowRef} {...row.getRowProps()} onClick={handleClick} className='clickable'>
                {row.cells.map(cell => {
                    if (cell.column.id !== "password") {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    }
                })}
            </tr>
            {extend &&
                <tr ref={extendedRef} className='extended_row' >
                    <td colSpan={1000}>
                        <form className={`${extendClass ? "extended" : ""}`} onSubmit={handleSubmit}>
                            <div className='rows'>
                                {columns.slice(1).map((column, i) => {
                                    if (column.accessor !== "password") {
                                        let value = row.cells[i + 1].value
                                        return (
                                            <div key={i} className="row">
                                                <label>{column.Header}</label>
                                                <input name={column.accessor}
                                                    defaultValue={value}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className='button_container'>
                                <button className='button green' type='submit'>Сохранить</button>
                                <button className='button' type='button' onClick={() => deleteFunction(id)}>Удалить</button>
                            </div>
                        </form>
                    </td>
                </tr>
            }

        </>
    )
}