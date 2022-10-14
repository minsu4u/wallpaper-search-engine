import styled from 'styled-components';
import Search from './Search';
import Title from './Title';

const Container = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
`;

const Content = styled.div`
    background-color: var(--secondary);
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;

const Hero = ({ setQuery, setOrder, setOrientation, setPerPage }) => {
    return (
        <Container>
            <Content>
                <Search
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
            </Content>
        </Container>
    );
};

export default Hero;
