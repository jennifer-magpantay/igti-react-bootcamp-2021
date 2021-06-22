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

    function handleSelectOnChange(event: any) {
        if (props.selectOnChange) {
            props.selectOnChange(event);
        }
    }

    return (
        <div className="select__container">
            <label className="caption" htmlFor={props.labelFor}>{props.labelText}</label>
            <select id={props.selectId} name={props.selectName} onChange={handleSelectOnChange}>
                {/*  options to be rendered */}
                {props.children}
            </select>
        </div>
    )
}
