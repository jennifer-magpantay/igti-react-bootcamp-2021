import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatMonth } from '../../helpers/format';
import styles from './Graph.modules.css';

export default function Graph({ children: investment }) {
    const { description, reports } = investment;

    const months = reports.map((report) => { return formatMonth(report.month) })
    const income = reports.map((report) => { return report.value })

    const data = {
        // horizontal labels, returned as an array for x results
        labels: months,
        datasets: [
            {
                label: [`${description} Performance`],
                // vertical data, returned as an array for x results
                data: income,
                backgroundColor: 'rgb(72, 126, 176)',
                borderColor: 'rgb(72, 126, 176)',
                tension: 0.1
            }
        ]
    }

    return (
        <main>           
                <Line data={data} />          
        </main>
    )
}
