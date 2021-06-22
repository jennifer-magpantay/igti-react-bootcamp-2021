type ResultProps ={
    result: string;
}

export function ResultBox(props: ResultProps){
return (
    <div className="result__container">
        <p><strong>Total expenses on period:</strong></p>       
        <span>{props.result}</span>      
    </div>
);
}