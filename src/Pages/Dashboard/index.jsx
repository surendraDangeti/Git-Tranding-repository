import {useEffect, useState, useLayoutEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchTrendingReposHandler } from '../../Redux/action'
import { verifyData } from '../Components/verifyData'
import {Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {BsJournalBookmarkFill} from 'react-icons/Bs'
import {RxDot} from 'react-icons/Rx'
import './Dashboard.css'
import { Languages, ProgrammingLanguages } from '../Components/GlobalVariables';
import moment from 'moment'
import {connect} from 'react-redux'
import { SpokenLanguageOptions } from '../Components/GlobalVariables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Dashboard(props) {
    const [repoListData, setRepoListData] = useState("")
    const [showRepos, setShowRepos] = useState(true)
    // const {trendingReposeData, loading} = useSelector((state) => ({...state.data}))
    // let dispatch = useDispatch()

    // const navigate = useNavigate();

    const [tempLanguage, setTempLanguage] = useState("")
    const [tempProgrammingLanguage, setTempProgrammingLanguage] = useState("")
    const [dateRange, setDateRange] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const [updateStatus, setUpdateStatus] = useState("")

    const today = moment().format('YYYY-MM-DD')
    const lastWeek = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
    const lastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');


    useLayoutEffect(()=>{
        return(()=>{

       
        let SearchUrl = window.location.search  
        if(verifyData(SearchUrl) && SearchUrl.length > 0){
            SearchUrl = SearchUrl.replace("?","") 
            let urlfilterData = SearchUrl.split("&")
            let jsonObj = {}
            for(let x in urlfilterData){
                let currentvalue = urlfilterData[x]?.split("=")
                if(verifyData(currentvalue)& currentvalue?.length >1)

                if(currentvalue[0] == "SpokenLanguage"){
                    setTempLanguage(currentvalue[1])
                    const selectedItems = SpokenLanguageOptions.filter(item => item.name === currentvalue[1])
                    jsonObj[currentvalue[0]] =selectedItems.urlParam
                }
                else if(currentvalue[0] == "Language"){
                    setTempProgrammingLanguage(currentvalue[1])
                    jsonObj[currentvalue[0]] = currentvalue[1]
                }

                else if(currentvalue[0] == "DateRange"){
                    
                    let selectedDate = ""
                    if(verifyData(currentvalue[1]) && currentvalue[1] == "This%20Week" ||  currentvalue[1]== "This Week"){
                        selectedDate = lastWeek
                        setDateRange("This Week")
                    }
                    if(verifyData(currentvalue[1]) && currentvalue[1] == "This%20Month" ||  currentvalue[1]== "This%20Month"){
                        selectedDate = lastMonth
                        setDateRange("This Month")
                    }
                    if(verifyData(currentvalue[1]) && currentvalue[1] == "Today" ||  currentvalue[1]== "Today"){
                        selectedDate = lastMonth
                        setDateRange("Today")
                    }
                    jsonObj[currentvalue[0]] = selectedDate
                }
                else if(currentvalue[0] == "SortOrder"){
                    setSortOrder(currentvalue[1])
                    jsonObj[currentvalue[0]] = currentvalue[1]?.toLowerCase()
                }

            }
            props.fetchTrendingReposHandler(jsonObj)
            
        }
        else{
            let jsonObj = {"DateRange": today}
            props.fetchTrendingReposHandler(jsonObj)
        }

     })
   

    },[])

    useEffect(()=>{
        if(verifyData(props.trendingReposeData)){
            let data = props.trendingReposeData
            setRepoListData(data)

        }

    },[props.trendingReposeData])



    
//  the below useEffect is for storing the filter options in window location url path   
useEffect(()=>{
    if(verifyData(tempLanguage) || verifyData(tempProgrammingLanguage) || verifyData(dateRange) || verifyData(sortOrder)){

    let currentUrl = window.location.hostname
    let currentParam =  window.location.search
  
    let tempArray = []
    if(verifyData(tempLanguage) && tempLanguage.length>0){
        tempArray.push(`SpokenLanguage=${tempLanguage}`)
    }
    if(verifyData(tempProgrammingLanguage) && tempProgrammingLanguage.length > 0){
        tempArray.push(`Language=${tempProgrammingLanguage}`)
    }

    if(verifyData(sortOrder) && sortOrder.length > 0){
        tempArray.push(`SortOrder=${sortOrder}`)
    }
    if(verifyData(dateRange) && dateRange.length > 0){
        tempArray.push(`DateRange=${dateRange}`)
    }

    let newParam = ""
    if(verifyData(tempArray) && tempArray.length){
       for(let x in tempArray){
        if(x == 0){
            newParam +=  `?${tempArray[x]}`
        }
        else{
        newParam +=  `&${tempArray[x]}`
        }
       }
    }
    window.location.replace(newParam)
    }
},
[updateStatus]
)

const onChangeHandlerFunction = (handler, value)=>{
    handler(value)
    setUpdateStatus(!updateStatus)
}
  

  return (
    <Container>
    <div className= "page-content pb-5">
        
        <Row>
            <Col lg={12}>
        <Card  className={ props.currentTheme ? "#292c35" : "#fff"}
        >
        <Card.Body>
        <Col lg={12}>    
        <div className="repose-section-navbar">
            <div>
        <button type="button" onClick={()=> setShowRepos(true)} className={showRepos ? "btn btn-primary": "btn btn-light"}>Repositories</button> 
        <button type="button" onClick={()=> setShowRepos(false)}  className={showRepos ? "btn btn-light": "btn btn-primary"}>Developers</button>   
        </div>
        <div>
        <label htmlFor="spokentLanguages" className="mt-2">SpokenLanguage:</label>
         <select value={tempLanguage} className="repo-select-dropdown"
         onChange={(e)=>onChangeHandlerFunction(setTempLanguage, e.target.value)}
         >
            {SpokenLanguageOptions ? SpokenLanguageOptions.map((item)=>{
                return(
                    <option  key={item.name}>{item.name}</option>
                )
            }): ""}
        </select>
       </div>
       <div>
       <label htmlFor="" className="mt-2">Language:</label>
        <select value={tempProgrammingLanguage} onChange={(e)=>onChangeHandlerFunction(setTempProgrammingLanguage, e.target.value)} className="repo-pl-select-dropdown">
        {ProgrammingLanguages ? ProgrammingLanguages.map((item)=>{
                return(
                    <option key={item.name}>{item.name}</option>
                )
            }): ""}
       </select>
       </div>
       <div>
       <label htmlFor="" className="mt-2">Date Range:</label>
        <select value={dateRange} onChange={(e)=> onChangeHandlerFunction(setDateRange,e.target.value)} class="repo-dr-select-dropdown">
       <option data-tokens="ketchup mustard">Today</option>
       <option data-tokens="mustard">This Week</option>
       <option data-tokens="mustard">This Month</option>
       </select>
       </div>
       <div>
       <label  htmlFor="" className="mt-2">SortOrder:</label>
        <select value={sortOrder} onChange={(e)=> onChangeHandlerFunction(setSortOrder,e.target.value)} class="repo-srotOrder-select-dropdown" data-live-search="true">
       <option data-tokens="ketchup mustard">Asc</option>
       <option data-tokens="mustard">Desc</option>
       </select>
       </div>

       </div>
       </Col>



        </Card.Body>
        {
           verifyData(repoListData) && showRepos ? repoListData.map((item, index)=>{
            return( 
               
               <Card.Body key={item?.name}>
            <a href={item?.html_url} target="_blank"><span className={"text-primary"}><i>{<BsJournalBookmarkFill/>}</i></span> {item.full_name}</a>
            <div >{item?.name}</div>
            <div> <i className="dot-icon"></i>{item?.language}</div>
            {index == repoListData.length-1 ? "": <hr/>}
            </Card.Body>
            )
           }) :  ""
         
        }

{
           verifyData(repoListData) && !showRepos ? repoListData.map((item, index)=>{
            return( 
               
               <Card.Body key={item.name}>
            <div className="developer-card-section">
                <div>
                <img src={item.owner.avatar_url} className="avatar" />
                </div>
                <a href={item.owner.html_url}>{item.owner.login}</a>
                <ul>
                    <li>POPULAR REPO</li>
                </ul>
                </div>
            {index == repoListData.length-1 ? "": <hr/>}
            </Card.Body>
            )
           }) :  ""
         
        }
        </Card> 
        </Col>
        </Row>
    </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
    const { trendingReposeData, loading , error,  
        // currentTheme
    } = state.data;
    return {
      trendingReposeData: trendingReposeData,
      loading: loading,
      error: error,
    //   currentTheme:currentTheme
    };
  };


export default connect(mapStateToProps,{fetchTrendingReposHandler})(Dashboard)