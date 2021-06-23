type ResultProps ={
    result: string
    text: string
}

export function ResultBox(props: ResultProps){
return (
    <div className="result__container">
        <p className="caption">{props.text}</p>       
        <span>{props.result}</span>      
    </div>
);
}