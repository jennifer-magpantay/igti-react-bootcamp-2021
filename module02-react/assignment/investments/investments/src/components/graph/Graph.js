import React from 'react';
import { Line } from 'react-chartjs-2';
import './Graph.modules.css';

export default function Graph({ description, months, calc }) {

    const data = {
        labels: [months],
        datasets:[
            {
                label: [`${description} Performance`],
                data: {calc},
                backgroundColor: 'rgba(41, 128, 185, 1)',
                borderColor: 'rgba(41, 128, 185, 1)',
                tension: 0.1
            }
        ]
    }
   
    return (
        <>
            <main>
                <Line data={data} />
            </main>
        </>
    )
}
