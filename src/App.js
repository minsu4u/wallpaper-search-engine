import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import getWallPapers from './api/getWallPapers';


const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallPapers({
                q: query,
                orientation: orientation,
                order: order
            });
            setData(data);
        };
        fetch();
    }, [query, orientation, order]);
    return (
        <>
            <Container>
                <Hero query={query} setQuery={setQuery} setOrder={setOrder} setOrientation={setOrientation} />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
