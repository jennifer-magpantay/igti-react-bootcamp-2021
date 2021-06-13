import styles from './App.module.css';
import { useState } from 'react';
import { data } from '../../data/flashcards';
import { helperShuffleArray } from '../../helpers/arrayHelpers';
import Button from '../../component/button/Button';
import RadioButton from '../../component/radioButton/RadioButton';
import Flashcards from '../../component/flashcards/Flashcards';
import Card from '../../component/card/Card';

/*
  App, as a parent component, will import all the other components of the application
  It will also hold useStates to control the data and 'fliping cards' state, handle functions for events (shuffle cards and show title/description cards) and a map to read the data
*/

function App() {
  const [cardsOnShuffle, setCardsOnShuffle] = useState(data);
  const [showTitle, setShowTitle] = useState(true);

  // shuffle cards event
  function handleButtonOnClick() {
    const shuffledCards = helperShuffleArray(cardsOnShuffle)
    setCardsOnShuffle(shuffledCards)
  }

  // flipping cards event
  function handleButtonOnChange({ currentTarget }) {
    if (currentTarget.id === "description") {
      setShowTitle(false);
    }
    else {
      setShowTitle(true);
    }
  }

  return (
    <>
      <h1 className={styles.header}>FlashCards Application</h1>

      <Button value={"SHUFFLE CARDS"} onButtonClick={handleButtonOnClick} />

      <div className={styles.container}>
        <RadioButton id="title" name="info" value="Display Title" isChecked={showTitle} onButtonChange={handleButtonOnChange} />

        <RadioButton id="description" name="info" value="Display Description" isChecked={!showTitle} onButtonChange={handleButtonOnChange} />
      </div>

      <Flashcards>
        {/* render cards */}
        {
          cardsOnShuffle.map(({ id, title, description }) => {
            return <Card key={id} title={title} description={description} isTitleShown={showTitle} />
          })
        }
      </Flashcards>
    </>
  );
}

export default App;
