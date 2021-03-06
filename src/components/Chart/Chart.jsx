import React, {useEffect,useState} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';
import { colors } from '@material-ui/core';
import { green, blue } from '@material-ui/core/colors';
const Chart = ({data: {confirmed, recovered, deaths},country}) => {
    // representation of a class based components
    // state={
    //     dailyData: {},
    // }

    const [dailyData, setDailyData] = useState({});

    useEffect(() =>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        //console.log(dailyData);
        fetchAPI()
    }, []);
    
    const LineChart = (

        dailyData.length // initially data is not loaded when things load at the beginning
        ? (<Line  // and if the first day of the data is available then we will return the line/bar chart
            data = {{
                labels: dailyData.map( ( { date } ) => date ),
                datasets: [{
                    data:dailyData.map(( {confirmed}) => confirmed),
                    label: 'Number of people Infected',
                    borderColor: 'rgb(126, 140, 255)',
                    fill: true
                } ,{
                    data: dailyData.map(({deaths}) => deaths),
                    label: "Number of Deaths",
                    borderColor: 'red',
                    fill: true
                }],
            }}
        />) : null // if we don't have the first day of the data that means that we don;t have any data available

    );

    const BarChart =(
        confirmed ? (
            <Bar
            data = {{
                labels: ['Infected',  'Deaths', 'Recovered'],
                datasets: [{
                    label : 'People',
                    backgroundColor: ['rgba(0, 0, 255, 0.5)', 'red', 'green'],
                    data : [confirmed.value, deaths.value , recovered.value, ],
                }], 
            }}
            options ={{
                legend : {display:false},
                tittle: {display: true, text: `Current State in ${country}`},
            }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? BarChart: LineChart } 

        </div>
    )
}

export default Chart;