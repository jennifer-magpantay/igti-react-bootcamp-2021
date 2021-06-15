import './Select.module.css'

export default function Select({ children: options, value, selectOnChange }) {

    function handleSelectOnChange(event) {
        if(selectOnChange){
            selectOnChange(event);
        }
    }

    return (
        <>
            <label htmlFor={value}>Select city:</label>
            <select id={value} name={value} onChange={handleSelectOnChange}>
                {/*  <option value="volvo">Volvo</option> */}
                {options}
            </select>
        </>
    )
}
