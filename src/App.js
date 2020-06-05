import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api/';

// App will be Class based component
// Rest all component will be functional component with hooks
class App extends React.Component{

    async componentDidMount(){
        const data = await fetchData();

        console.log(data);
    }
    render(){
        return(
            <div className={styles.container}>
                <Cards></Cards>
                <CountryPicker></CountryPicker>
                <Chart></Chart>

            </div>
        )
    }
}

export default App;