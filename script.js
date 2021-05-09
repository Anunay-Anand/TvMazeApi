//Select the form 

let isShowFetched = false;
const tvForm = document.querySelector('#tvForm');
const imgContainer = document.querySelector('#imgContainer');
tvForm.addEventListener('submit', async function(e) {
    //Prevent reloading of form on submission using event object
    e.preventDefault();
    if(isShowFetched === true) {
        imgContainer.innerHTML = '';
    }
    const queryValue = tvForm.elements.search.value;
    //Use axios to fetch
    if(!queryValue){
        console.log('please enter valid input');
    }
    else{
        const config = { params: {q: queryValue, isFunny: 'colt'} }
        const res = await axios.get('http://api.tvmaze.com/search/shows', config);
        showImages(res.data);
        tvForm.elements.search.value = '';
        isShowFetched = true;
    }
})

const showImages = (shows) => {
    for (let eachShow of shows) {
        if(eachShow.show.image) {
            const img = document.createElement('IMG');
            img.src = eachShow.show.image.medium;
            imgContainer.append(img);
        }
    }
}