import { useEffect, useState } from 'react';
// styles
import styles from './App.module.css';
import 'react-tabs/style/react-tabs.css';
// components
import Header from '../../component/header/Header';
import Spinner from '../../component/spinner/Spinner';
import ErrorMessage from '../../component/errorMessage/ErrorMessage';
import Main from '../../component/main/Main';
import Button from '../../component/button/Button';
import RadioButton from '../../component/radioButton/RadioButton';
import Flashcards from '../../component/flashcards/Flashcards';
import Card from '../../component/card/Card';
import SearchBox from '../../component/searchBox/SearchBox';
import ContainerContent from '../../component/containerContent/ContainerContent';
import Modal from '../../component/modal/Modal';
import Form from '../../component/form/Form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// helpers
import { helperShuffleArray } from '../../helpers/arrayHelpers';
// services
import { apiGetData } from '../../services/apiService';

/*
  App, as a parent component, will import all the other components of the application
  It will also hold useStates to control the data rendering, states of cards, loading page and error message, handle functions for events (shuffle cards and show title/description cards) and a map to read the data
*/

function App() {
  const [cards, setCards] = useState([]);
  const [showTitle, setShowTitle] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})

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
  function handleShuffleButtonOnClick() {
    const shuffledCards = helperShuffleArray(cards)
    setCards(shuffledCards)
  }

  // flipping cards event
  function handleRadioButtonOnChange({ currentTarget }) {
    if (currentTarget.id === "description") {
      setShowTitle(false);
    }
    else {
      setShowTitle(true);
    }
  }

  function handleSearchButtonOnClick() {

  }

  function handleClearButtonOnClick() {

  }

  function handleButtonAddNewCard() {
    setShowModal(true);
  }

  function handleIconOnClickEdit(flashCard) {
    setShowModal(true);
    setSelectedCard(flashCard);
  }


  function handleIconOnClickDelete(id) {
    // delete temporary the card selected 
    // 1) filter cards by saving into a variable all != ids from thye list
    const deletedFilter = cards.filter(card => card.id !== id);
    // then, set the cards with the 'new value'
    setCards(deletedFilter);
    alert("Card deleted with success")
  }

  function handleOnClickCloseModal() {
    setShowModal(currentState => !currentState)
  }

  function handleFormSubmit(title, description) {
    console.log(title, description);
  }

  let modal = "";
  if (showModal) {
    modal = <>
      <Modal onCloseButton={handleOnClickCloseModal}>
        <Form onFormSubmit={handleFormSubmit} />
      </Modal>
    </>
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
      {/* set tabs here */}
      <div className={styles.mainContainer}>
        <Tabs>
          <TabList>
            <Tab>Flash Cards</Tab>
            <Tab>Manage Cards Content</Tab>
          </TabList>

          <TabPanel>
            <div className={styles.panelContainer}>
              <Button type="button" value="Suffle Cards" className={styles.buttonShuffleCards} onButtonClick={handleShuffleButtonOnClick}>SHUFFLE CARDS</Button>

              <div className={styles.container}>
                <RadioButton id="title" name="info" label="Display Title" isChecked={showTitle} onButtonChange={handleRadioButtonOnChange} />

                <RadioButton id="description" name="info" label="Display Description" isChecked={!showTitle} onButtonChange={handleRadioButtonOnChange} />
              </div>

              <Flashcards>
                {/* render cards */}
                {
                  cards.map(({ id, title, description }) => {
                    return <Card key={id} title={title} description={description} isTitleShown={showTitle} />
                  })
                }
              </Flashcards>
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.tabContentContainer}>
              <Button type="button" value="add new card" onButtonClick={handleButtonAddNewCard}>ADD NEW CARD</Button>
              
              {/* <div className={styles.containerFlex}>

                <SearchBox label="Find a card" name="search" />
                <div className={styles.containerFlex}>
                  <Button type="button" value="Search" onButtonClick={handleSearchButtonOnClick}>SEARCH</Button>
                  <Button type="button" value="Clear" onButtonClick={handleClearButtonOnClick}>CLEAR</Button>
                </div>
              </div> */}

              {/* list results */}
              {
                cards.map((flashCard) => {
                  return (
                    <ContainerContent key={flashCard.id}
                      iconOnClickEdit={handleIconOnClickEdit}
                      iconOnClickDelete={handleIconOnClickDelete}>
                      {flashCard}
                    </ContainerContent>
                  )
                })
              }

              {/* modal */}
              {modal}
            </div>
          </TabPanel>
        </Tabs>

      </div>
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
