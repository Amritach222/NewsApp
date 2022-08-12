import React, { useState , useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

//* document.title=`NewsMonkey-${capitalizeFirstLetter(props.category)}`;
const News=(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalresults] = useState(0);

   const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
   
    const  updateNews=async ()=>{
        props.setProgress(10)
        // this.setState({loading:true})
        setLoading(true);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data= await fetch(url);// it' s a promise the method is wating for the rsponse either failure or success 
        let parsedData= await data.json();
        props.setProgress(0);
        setArticles(parsedData.articles);
        setTotalresults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title=`NewsMonkey-${capitalizeFirstLetter(props.category)}`;
        updateNews();
        // eslint-disable-next-line
    
    }, []);
    // eslint-disable-next-line
    // const componentDidMount= async()=>{// it is lifecycle method/ it runs after render() method
    //    updateNews();

    // }
//     const handleNextClick= async ()=>{
//         // eslint-disable-next-line
//     setPage(page+1);
//     updateNews()
//     }
//    const handlePreviousClick= async ()=>{
//        // eslint-disable-next-line
//         setPage(page-1);
//          updateNews()
//     }
    const fetchMoreData= async()=>{
       
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data= await fetch(url);// it' s a promise the method is wating for the rsponse either failure or success 
        let parsedData= await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalresults(parsedData.totalResults)

    }
        
        return (
            <>
            <h1 className="text-center" style={{marginTop:'90px'}}>NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
           {loading && <Spinner/> } {/* This state that if the loading is true then show spinner  */}
           <InfiniteScroll
           dataLength={articles.length}
           next={fetchMoreData}
           hasMore={articles.length!==totalResults}
           loader={<Spinner/>}
           scrollableTarget="scrollableDiv"
       >
                <div className="container">
                <div className="row ">
                {articles.map((elements)=>{
                    return <div className="col-md-4" key={elements.url}>
                    <NewsItem title={elements.title?elements.title.slice(0,45):""} description={elements.description?elements.description.slice(0,88):""} 
                    imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source}/>
                </div>
        
                })}
                </div>
                </div>
                </InfiniteScroll>
                {/*<div className="container d-flex justify-content-between" >
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark " onClick={this.handlePreviousClick}> &laquo; Previous</button>
                <button type="button" disabled={this.state.page+1> Math.ceil(this.state.totalResults/ props.pageSize)} className="btn btn-dark " onClick={this.handleNextClick}>Next &raquo;</button>
            </div>*/}
            </>

            
        )
    }
    News.defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    News.propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    
}

export default News
