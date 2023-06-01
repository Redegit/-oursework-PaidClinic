import { useState, useEffect, useRef } from 'react';
import './Dropdown.scss'

export const Dropdown = ({ placeHolder, options, handleChoice, active = true }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [value, setValue] = useState('')
    const dropdownRef = useRef(null)

    const getDisplay = () => {
        return placeHolder;
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current) {
                if (!dropdownRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
                    setShowDropdown(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [dropdownRef]);

    return (
        <div ref={dropdownRef} className={`dropdown-container ${active ? 'dropdown-active' : ''}`}>
            <div className="dropdown-input" onClick={() => { if (active) { setShowDropdown(!showDropdown) } }}>
                <div className="dropdown-selected-value">{value || getDisplay()}</div>

                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon />
                    </div>
                </div>
            </div>
            {showDropdown && <div className='dropdown-menu'>
                {options.map((option) => (
                    <div key={option} className='dropdown-item' onClick={() => {
                        setValue(option)
                        setShowDropdown(false)
                        handleChoice(option)
                    }}>
                        {option}
                    </div>
                ))}
            </div>
            }
        </div>
    );
};

const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};