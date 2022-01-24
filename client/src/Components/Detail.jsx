import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { detailedSearch } from '../Actions'
import { Link, useParams } from 'react-router-dom'
import score from './score.png'
import hScore from './healthScore.png'
import timer from './timer2.png'
import detailedBG from './detailbackg.jpg'
import tuna from './tuna.jpg'


export default function Detail(){
    
    const dispatch=useDispatch()

    let {id} = useParams()
    if(!isNaN(id)) id=Number(id)

    const thisDetail = useSelector(state=>state.currentRecipeDetail.find(r=>r?.id===id))
    console.log(thisDetail)
    
    if(!thisDetail) dispatch(detailedSearch(id))
   

    let steps=document.getElementsByClassName('step')
    
    useEffect(()=>{
        let res = document.getElementById('resume')
        if(res)res.innerHTML=thisDetail.resume

        Array.from(steps).forEach(step=>{
            step.addEventListener('mouseover',()=>{
                if(step.style.backgroundColor==='green') return
                step.style.backgroundColor='#3c7c3cd2'
            })
            step.addEventListener('mouseleave',()=>{
                if(step.style.backgroundColor==='green') return
                step.style.backgroundColor='#808080b1'
            })
            step.addEventListener('click',()=>{
                if(step.style.backgroundColor!=='green') step.style.backgroundColor='green'
                else step.style.backgroundColor='#3c7c3cd2'
            })
        })
    })

    
    if(thisDetail){
        return(
            <Background>
            <DetailWrapper>
                <h2>{thisDetail.name}</h2>

                <DetailText>
                    <Poster>
                        <img src={tuna} alt='food'/>
                    </Poster>
                    

                    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <p style={{textAlign:'left', margin:0}}>Diets: </p>
                        <DietTypes>
                            {thisDetail.dietTypes.map(e=>
                            <Diet key={e+id}>
                                {e}
                            </Diet>)}
                        </DietTypes>
                        <p style={{textAlign:'left', margin:0}}> Best served as: </p>
                        <DietTypes>
                            {thisDetail.dishTypes.map(e=>
                            <Diet key={e+id}>
                                {e}
                            </Diet>)}
                        </DietTypes>

                        <Scores>
                            <div>
                                <img src={score} alt='score'/>
                                General score: {thisDetail.score}%
                            </div>
                            <div>
                                <img src={hScore} alt='hScore'/>
                                Health score: {thisDetail.healthScore}%
                            </div>
                            <div>
                            <img src={timer} alt='timer'/>
                                <span>Ready in <span style={{fontWeight:'bold'}}>{thisDetail.time}</span> minutes</span>
                            </div>
                        </Scores>
                    </div>
                    
                </DetailText>

                

                <DetailWays>
                    <Resume id='resume'>
                        {/* {isNaN(id)?thisDetail.resume:null} */}
                    </Resume>
                    <HR/>
                    <Steps>
                        {thisDetail.steps.map((step,i)=>
                        <Step className='step' key={step+i}>
                            <span>Step {i+1}</span>
                            <hr/>
                            <p>{step}</p>
                        </Step>)}
                    </Steps>
                </DetailWays>
                <ID>id: {id}</ID>
                <Back><Link to='/home'>{'←'} Back</Link></Back>
            </DetailWrapper>
            </Background>
        )
    } else return (
        <Background>
            <DetailWrapper>
                <NoBack>
                    <h1>Sorry, we couldn't find what you're searching for!</h1>
                    <Link to='/home'>Return home</Link>
                </NoBack>
            </DetailWrapper>
        </Background>
    )
}

const NoBack = styled.div`
    box-sizing: border-box;
    margin:auto;
    transition: .3s;
    
    border-radius: 50%;
    a{
        color:#5667ffb5;
        transition: .3s;
        border-radius: 50%;
        text-decoration: none;
    }
    a:hover{
        padding:5px;
        border-radius: 10px;
        background-color: #2b369bb1;
        color:white;
    }
`

const Back = styled.div`
    position: absolute;
    display: inline-block;
    width: 10px;
    overflow:hidden;
    white-space: nowrap;
    left:7px;
    transition:.7s;
a{
    text-decoration: none;
    color:white;
}
:hover{
    background-color:#41558b90;
    width: 50px;
    padding: 0 7px 0 7px;
    border-radius: 6px;
}
`

const ID = styled.span`
    position:absolute;
    right:7px;
    opacity:.3;
    transition: .4s;
    :hover{
        opacity:.6;
    }
    @media (max-width:700px) {
        bottom:0;
        left:7px;
        right:unset;
    }
`

const Background = styled.div`
    display: flex;
    justify-content: center;
::before{
    content:'';
    background-image: url(${detailedBG});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    filter: brightness(50%);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
} 
`

const DetailWrapper = styled.div`
    position: relative;
    width: 80%;
    margin:10px;
    display: flex;
    flex-direction: column;
    background-color: #33333390;
    color:white;
    border-radius: 15px;
    transition: .3s;
    padding: 10px;
    box-sizing: content-box;
:hover{
    background-color: #2f344690;
}
`

const Poster = styled.div`
    width:50%;
    img{
        border-radius: 10px;
        width: 100%;
        height:100%;
        object-fit: cover;
    }
    padding:5px;
`

const DetailText = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 35vh;
    min-height: 250px;
@media (max-width:750px){
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items:center;
    height: fit-content;
    
    ${Poster}{
        width: 100%;
        height: 30vh;
        min-height: 200px;
    }
}
`

const Resume = styled.div`
    width: 50%;
    text-align:justify;
    word-wrap:break-word;
    hyphens: auto;
    a{
        text-decoration: none;
        color: #40b3ff;
    }
`

const Steps = styled.div`
    width: 50%;
`

const HR = styled.hr`
    margin:0 10px 0 10px ;
`

const DetailWays = styled.div`
    display: flex;
    margin: 5px;
@media (max-width:600px) {
    flex-direction: column;
    ${Resume}{
        width: 100%;
    }
    ${Steps}{
        width: 100%;
    }
    ${HR}{
        margin:10px
    }
}
`

const Step = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: flex-start;
    background-color: #808080b1;
    text-align:left;
    margin-top:5px;
    margin-bottom:5px;
    transition: .3s;
:hover{
    background-color: #3c7c3cd2;
}
>span{
    padding-left:4px;
}
>p{
    padding-left:10px;
    margin-top:0;
}
>hr{
    width: 95%;
    border-left:none;
    border-right:none;
}
`

const DietTypes = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Diet = styled.div`
    margin:3px;
    padding:3px;
    padding-top:0;
    background-color: grey;
    border-radius: 7px;
    transition: .3s;
    :hover{
        transform:scale(110%);
    }
`

const Scores = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    flex-wrap: wrap;

div{
    width: fit-content;
    max-width: 40%;
    display: flex;
    background-color: #3232ff;
    margin:5px;
    align-items: center;
    border-radius: 35px;
    padding-right: 10px;
    text-align:middle;
    position:relative;
    ::before{
        content: "";
        position: absolute;
        width: 100%;
        height:100%;
        border-radius: 35px;
        -webkit-box-shadow: 13px 11px 2px 0px rgb(0 0 0 / 30%), 1px 1px 1px 0.1px rgb(0 0 0 / 10%);
        -moz-box-shadow: 13px 11px 2px 0px rgb(0 0 0 / 30%), 1px 1px 1px 0.1px rgb(0 0 0 / 10%);
        box-shadow: 13px 11px 2px 0px rgb(0 0 0 / 30%), 1px 1px 1px 0.1px rgb(0 0 0 / 10%);
    }
}

img{
    margin-right:10px;
    width: 50px;
}

@media (max-width:750px) {
    div{
        max-width: 215px;
    }
}
`