import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { helperShuffleArray } from '../../helpers/arrayHelpers';
import { apiGetData } from '../../services/apiService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from '../../component/header/Header';
import Spinner from '../../component/spinner/Spinner';
import ErrorMessage from '../../component/errorMessage/ErrorMessage';
import Main from '../../component/main/Main';
import Button from '../../component/button/Button';
import RadioButton from '../../component/radioButton/RadioButton';
import Flashcards from '../../component/flashcards/Flashcards';
import Card from '../../component/card/Card';


/*
  App, as a parent component, will import all the other components of the application
  It will also hold useStates to control the data rendering, states of cards, loading page and error message, handle functions for events (shuffle cards and show title/description cards) and a map to read the data
*/

function App() {
  const [cards, setCards] = useState([]);
  const [showTitle, setShowTitle] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // implement useEffect to render tha date from the api
  useEffect(() => {
    /*
    // pass get axios function with the returned variable
    apiGetData().then(cardsData => {
      // then, set the cards state with the variable
      setCards(cardsData)
    })
    */

    // pass the axios function to get the date inside of an async function
    async function getCards() {
      try {
        const data = await apiGetData();
        setCards(data);

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    // then, call the function
    getCards();
  }, [])

  // shuffle cards event
  function handleButtonOnClick() {
    const shuffledCards = helperShuffleArray(cards)
    setCards(shuffledCards)
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

  // setting the spinner
  let main = < Spinner />;

  if (error) {
    main = <ErrorMessage>{error}</ErrorMessage>;
  }

  // while is loading is true, show the only the header and spinner on screen
  if (!isLoading) {
    // otherwise, display all the main content
    main = <>
      <Button onButtonClick={handleButtonOnClick}>SHUFFLE CARDS</Button>

      <div className={styles.container}>
        <RadioButton id="title" name="info" label="Display Title" isChecked={showTitle} onButtonChange={handleButtonOnChange} />

        <RadioButton id="description" name="info" label="Display Description" isChecked={!showTitle} onButtonChange={handleButtonOnChange} />
      </div>

      <Flashcards>
        {/* render cards */}
        {
          cards.map(({ id, title, description }) => {
            return <Card key={id} title={title} description={description} isTitleShown={showTitle} />
          })
        }
      </Flashcards>
    </>
  }

  return (
    <>
      <Header>FlashCards Application</Header>

      <Main>{main}</Main>
    </>
  );
}

export default App;
