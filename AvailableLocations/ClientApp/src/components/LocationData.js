import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function LocationData({ results}) {
    const [search, setSearch] = useState('');
    /*const [results, setResults] = useState([]);*/
   
    return (
        <Container>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder="Search Location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="p-4">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Opening Time</th>
                            <th>Closing Time</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results ? results
                            .filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.locationName.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{item.locationName}</td>
                                </tr>
                            )) : "No Records Found"}
                    </tbody>
                </Table>
            </div>
        </Container>
        
    )
}

export default LocationData;