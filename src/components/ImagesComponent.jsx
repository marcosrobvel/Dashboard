export const ImagesComponent = (images) => {
    return (
    <>
        <div>
            {images.data.map((images, index) => {
                return <div key={index}>
                    <div>
                        <img src={images.urls.small} alt="images" />
                    </div>
                </div>
            })}
        </div>
    </>  
    )
};