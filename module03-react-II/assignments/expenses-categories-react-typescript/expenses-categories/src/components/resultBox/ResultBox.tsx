type ResultProps = {
  result: string;
  text: string;
};

export function ResultBox(props: ResultProps) {
  const { result, text } = props;
  return (
    <div className="result__container">
      <p className="caption">{text}</p>
      <span>{result}</span>
    </div>
  );
}
