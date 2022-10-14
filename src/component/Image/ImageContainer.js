import styled from 'styled-components';
import ImageCard from './ImageCard';
import React, { useState, Suspense } from 'react';
// import ImageModal from './ImageModal';
// import Pagination from './Pagination';

const ImageModal = React.lazy(() => import('./ImageModal'));

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ data, page, setPage, numOfPages }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    console.log(currentImageDetail);
    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            <Suspense fallback={<h1>로딩중...</h1>}>
                {currentImageDetail && (
                    <ImageModal
                        currentImageDetail={currentImageDetail}
                        setCurrentImageDetail={setCurrentImageDetail}
                    />
                )}
            </Suspense>
            {/* {data.hits?.length > 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
            )} */}
            <ResultsWrapper>
                {data.hits?.length > 0 &&
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
                        />
                    ))}
                {/* 검색 결과가 없을 시 페이지네이션과 ImgCard 목록 대신 EmptyResult가 렌더되어야 합니다. */}
                {/*  */}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
