import styles from './App.module.css'
import { useState, useEffect } from 'react';
import { apiGetCities, apiGetCandidates, apiGetElection } from '../services/apiService';
import { formatNumber, formatPercentage } from '../helpers/format';
import Header from "../components/header/Header";
import Aside from '../components/aside/Aside';
import Main from '../components/main/Main';
import Select from '../components/select/Select';
import Card from '../components/card/Card';

function App() {
  const [cities, setCities] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [election, setElection] = useState([]);

  const [cityTotalResults, setCityTotalResults] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    // getting data from server and saving into the states
    async function getDataFromServer() {
      const dataCities = await apiGetCities();
      setCities(dataCities);

      const dataCandidates = await apiGetCandidates();
      setCandidates(dataCandidates);

      const dataElection = await apiGetElection();
      setElection(dataElection);
    }
    getDataFromServer();
  }, [])

  // at every change event on select, triggers the function:
  function handleSelectOnChange(event) {
    // with the event.target.value from the option choice:
    const selectedOption = event.target.value;

    // 1) find on cities list the city that match the event target;
    findAndDisplayResultsCities(selectedOption);
  }

  function findAndDisplayResultsCities(selectedOption) {
    // find returns the first result
    const filterCity = cities.find((city) => selectedOption === city.name);
    // set totalResults to display the aside result box
    setCityTotalResults(filterCity);

    // 2) then, with the city data result, filter the election results x city ID
    filterElectionxCityId(filterCity);
  }

  function filterElectionxCityId(cityTotalResults) {
    // error try using filterCity.map()
    const { id } = cityTotalResults;

    const filterElection = election.filter((vote) => { return vote.cityId === id }).sort((a, b) => a.votes < b.votes ? 1 : -1);

    // 3) finally, match the election results of the city x candidate ID
    filterElectionResultsxCandidateId(filterElection, cityTotalResults);
  }

  function filterElectionResultsxCandidateId(filterElection, cityTotalResults) {
    const result = filterElection.map((item) => {
      const filterCandidate = candidates.filter((candidate) => candidate.id === item.candidateId);

      // getting candidadate name and username
      const candidateName = filterCandidate.map((candidate) => candidate.name)
      const candidateNameStr = candidateName.toString();

      const candidateUsername = filterCandidate.map((candidate) => candidate.username)
      const candidateUsernameStr = candidateUsername.toString();

      // calculating the percentage
      const { name, presence } = cityTotalResults;
      const percent = item.votes * 100 / presence;

      return {
        id: item.id,
        city: name,
        name: candidateNameStr,
        username: candidateUsernameStr,
        votes: item.votes,
        percentage: percent,
      }
    });
    // set results to render and display the cards
    setResults(result);
  }

  // if there is any results, then display it
  let aside = "";
  if (cityTotalResults) {
    const { name, votingPopulation, absence, presence } = cityTotalResults;
    aside = <>
      <div className={styles.resultContainer}>
        <h2>Election results in {name}</h2>
        <p>Voting population: {formatNumber(votingPopulation)}</p>
        <p>Absence number: {formatNumber(absence)}</p>
        <p>Population presence: {formatNumber(presence)}</p>
      </div>
    </>;
  }

  let main = "";
  if (results) {
    main = <>
      <div className={styles.cardsContainer}>
        {
          // Card({ name, percentage, total, hasWon = "false" })
          results.map(({ id, name, username, votes, percentage }) => {
            return <Card key={id} name={name} username={username} votes={formatNumber(votes)} percentage={formatPercentage(percentage)} />
          })
        }
      </div>
    </>
  }

  return (
    <>
      {/* header */}
      <Header>Elections</Header>

      <div className={styles.container}>
        <Aside>
          <Select selectOnChange={handleSelectOnChange}>
            {
              // maping cities to display as <option>
              cities.map((city) => {
                const { id, name } = city;
                return <option key={id} value={name}>{name}</option>
              })
            }
          </Select>
          {/* results */}
          {aside}
        </Aside>

        <Main>{main}</Main>
      </div>
    </>
  );
}

export default App;
