import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api/';
import image from './images/image.png'

// App will be Class based component
// Rest all component will be functional component with hooks
class App extends React.Component{

    state = {
        data:{},
        country:''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData});
    }
    handleCountryChange = async (country) => {
         // will pass this method as a prop to the country picker
        //fetch the data 
        // change the state
        const fetchedData = await fetchData(country);
        this.setState({data:fetchedData, country:country});
    }
    // handleCountryChange = async (country) => {
    //     const data = await fetchData(country);
    //     console.log(fetchData);
    //     // this.setState({ data, country: country });
    //   }
    
    render(){
        const  {data, country } = this.state;
        // console.log(data);
        return(
            <div className={styles.container}>
                <img  className={styles.image} src={image} alt="Covid-19"></img>
                <Cards data = {data} />
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Chart data = {data} country = {country}></Chart>
            </div>
        )
    }
}

export default App;