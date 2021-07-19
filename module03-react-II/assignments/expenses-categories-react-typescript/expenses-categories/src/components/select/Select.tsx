type SelectProps = {
    labelFor: string;
    labelText: string;
    children: any;
    selectId: string;
    selectName: string;
    selectOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/*
Handling events on React Typescript as props:
propName:(event: React.ChangeEvent<T>) => void ** where T is the HTML Element type **
selectOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
url source: https://blaipratdesaba.com/react-typescript-cheatsheet-form-elements-and-onchange-event-types-8c2baf03230c
*/

export function Select(props: SelectProps): any {
    const {labelFor, labelText, children, selectId, selectName, selectOnChange} = props;

    function handleSelectOnChange(event: any) {
        if (selectOnChange) {
            selectOnChange(event);
        }
    }

    return (
        <div className="select__container">
            <label className="caption" htmlFor={labelFor}>{labelText}</label>
            <select id={selectId} name={selectName} onChange={handleSelectOnChange}>
                {/*  options to be rendered */}
                {children}
            </select>
        </div>
    )
}
