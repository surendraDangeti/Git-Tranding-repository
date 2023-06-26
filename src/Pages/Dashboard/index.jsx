import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Row, Col} from 'react-bootstrap';
import { fetchTrendingReposHandler } from '../../Redux/action'
import { verifyData } from '../Components/verifyData'
import Card from 'react-bootstrap/Card';
import {BsJournalBookmarkFill} from 'react-icons/Bs'



function Dashboard() {
    const [repoListData, setRepoListData] = useState("")
    const {trendingReposeData, loading} = useSelector((state) => ({...state.data}))
    let dispatch = useDispatch()


    useEffect (()=> {
       dispatch(fetchTrendingReposHandler())
    }, [])


    

    useEffect(()=>{
        if(verifyData(trendingReposeData)){
            let data = trendingReposeData
            setRepoListData(data)
            console.log("inside")

        }

    },[trendingReposeData])
    

    console.log("trendingReposeData", repoListData)



  return (
    <Container>
    <div className= "page-content">
        <Row>
            <Col lg={12}>
        <Card>
        {
           verifyData(repoListData) ? repoListData.map((item)=>{
            return( 
               
               <Card.Body key={item.name}>
            <a href={item.owner.html_url}><span className={"text-primary"}><i>{<BsJournalBookmarkFill/>}</i></span> {item.full_name}</a>
            <div>{item.name}</div>
            <hr/>
            </Card.Body>
            )
           }) : "No Repositers Found"
         
        }
        </Card> 
        </Col>
        </Row>
    </div>
    </Container>
  )
}

export default Dashboard