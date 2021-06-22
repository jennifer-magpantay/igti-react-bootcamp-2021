type ResultProps ={
    result: number;
}

export function ResultBox(props: ResultProps){
return (
    <div className="result__container">
        <p><strong>Total expenses on period:</strong> {props.result}</p>
    </div>
);
}