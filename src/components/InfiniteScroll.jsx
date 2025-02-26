import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './infiniteScroll.scss'

export const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        setTimeout(() => {
            const newItems = Array.from({ length: 20 }, (_, index) => `Elemento ${items.length + index + 1}`);
            setItems([...items, ...newItems]);

            if (items.length + newItems.length >= 100) {  
                setHasMore(false);
            }
        }, 1500); 
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

    return (
        <div className="infiniteScrollContainer" id="infiniteScroll">
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}    
                hasMore={hasMore}        
                loader={<h4>Loading...</h4>}
                endMessage={<p>No hay más datos</p>}
            >
            </InfiniteScroll>
        </div>
    );
}