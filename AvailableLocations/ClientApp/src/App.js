import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import LocationData from './components/LocationData';
import NewLocation from './components/NewLocation';

function App() {
    const [show, setShow] = useState(false);
    const [results, setResults] = useState([]);
    useEffect(() => {
        const url = "http://localhost:5264/api/location?startTime=10:00:00.0000000&endTime=13:00:00.0000000";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setResults(json.response.result);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [results]);
    function handleLocation(showValue) {
        if (showValue === false) {
            setShow(showValue);
        }
        else
            setShow(true);
    }
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
            </Routes>
            <LocationData results={results} />
            <button className="px-6 py-2 rounded-md btn btn-primary text-stone-50"
                onClick={handleLocation}>Add Location</button>
            <div className="p-4">
                {show && (<NewLocation showLocation={handleLocation} />)
                
                }
            </div>
         {/*   <NewLocation/>*/}
        </Layout>      
    );
}

export default App;
