import './Error.scss'

export const Error = ( { error, errorInfo } ) => {
    return (
        <div className="error_container">
            <div className="error_number">{error}</div>
            <div className="error_info">{errorInfo}</div>
        </div>
    )
}


