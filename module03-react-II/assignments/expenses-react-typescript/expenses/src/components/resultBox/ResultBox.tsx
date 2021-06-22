type ResultProps ={
    result: string;
}

export function ResultBox(props: ResultProps){
return (
    <div className="result__container">
        <p className="caption">Total expenses on period:</p>       
        <span>{props.result}</span>      
    </div>
);
}