import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './infiniteScroll.scss'

export const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        dispatch(homeThunk(page)).then(() => {
            setPage(prevPage => prevPage + 1);
        });
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

    return (
        <div className="infiniteScrollContainer" id="infiniteScroll">
           
                <ImagesComponent data={images} fetchMoreImages={fetchMoreData} hasMore={hasMore} />
          
        </div>
    );
}