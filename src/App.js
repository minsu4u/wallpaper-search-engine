import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import getWallPapers from './api/getWallPapers';
import EmptyResult from './component/EmptyResult';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({ total: 0, totalHits: 0, hits: [] });
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const target = useRef(null);
    const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallPapers({
                q: query,
                orientation: orientation,
                order: order,
                page: page,
                per_page: perPage,
            });
            if (page === 1) {
                setData(data);
            } else {
                setData((prevData) => ({
                    ...prevData,
                    hits: [...prevData.hits, ...data.hits],
                }));
            }
        };
        fetch();
    }, [query, orientation, order, page, perPage]);

    const callback = ([entries]) => {
        if (entries.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (!target.current) return;
        const observer = new IntersectionObserver(callback, {
            threshold: 1,
        });
        observer.observe(target.current);
    }, [query]);
    useEffect(() => {
        setPage(1);
    }, [query, orientation, order, perPage]);

    // 1. 검색 결과 없을때 - 로딩중을 보여주면 X, 검색결과가 없습니다.
    // 2. 모두다 검색했을때 - 로딩중 X, 검색 결과가 없습니다. X
    return (
        <>
            <Container>
                <Hero
                    query={query}
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
                <ResultContainer
                    data={data}
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
                {page !== numOfPages && (
                    <div ref={target}>
                        <EmptyResult isLoading={data.totalHits} />
                    </div>
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
