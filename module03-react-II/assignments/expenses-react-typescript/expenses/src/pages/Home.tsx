import '../styles/main.css';
// components
import { Header } from '../components/header/Header';
import { TopBar } from '../components/topBar/TopBar';
import { Select } from '../components/select/Select';
import { ResultBox } from '../components/resultBox/ResultBox';
import { Table } from '../components/table/Table';

export function Home() {
    // This function is called when the input changes
    const handleSelectOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        console.log(value)
    };

    return (
        <>
            <Header>Expenses Control</Header>
            <TopBar>
                {/* select year */}
                <Select labelFor="year" labelText="Year" selectId="year" selectName="year" selectOnChange={handleSelectOnChange}>
                    {/* options to be rendered by mapping the data list */}
                    <option value="volvo">Volvo</option>
                    <option value="fusca">Fusca</option>
                </Select>

                {/* select month */}
                <Select labelFor="month" labelText="Month" selectId="month" selectName="month" selectOnChange={handleSelectOnChange}>
                    {/* options to be rendered by mapping the data list */}
                    <option value="volvo">Volvo</option>
                    <option value="fusca">Fusca</option>
                </Select>

                {/* results */}
                <ResultBox result={1599.00} />
            </TopBar>
            {/* <Table/> */}
            <Table>
                {/* tr td content to be rendered by mapping the data list */}
                <tr>
                    <td>Drinkns</td>
                    <td>Happy Hour</td>
                    <td>13</td>
                    <td>25.99</td>
                </tr>
            </Table>
        </>
    );
}
