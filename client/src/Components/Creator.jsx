import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createRecipe } from '../Actions'
import { Link } from 'react-router-dom'
import CreateRec from './CreateRec.jpg'

export default function Creator(){

    const dispatch = useDispatch()

    const [diets,setDiets] = useState([])

    const [recData, setRecData] = useState({
    name: '',
    resume: '',
    score: undefined,
    healthScore: undefined,
    time: undefined,
    dietTypes: [],
    dishTypes: [],
    steps: [],
    })

    const [errors, setErrors] = useState('')

    function validate(input, target){
        if(input.trim()==='') {
            setErrors('Input cannot be empty')
            return false
        }
        
        if(target.includes(input.trim())){
            setErrors('You have already added this')
            return false
        }
        setErrors('')
        return true
    }

    function scoreValidate(input){
        if(input>100||input<0){
            setErrors('Scores must range between 0 and 100')
            return false
        }
        return true
    }

    function timeValidate(input){
        if(input<0){
            setErrors('Please assign a valid preparation time')
            return false
        }
        return true
    }

    function formValidate(){
        if(recData.name.trim()===''){
            setErrors('Please name your recipe')
            document.getElementById('title').style.transition='.2s'
            document.getElementById('title').style.backgroundColor='red'
            document.getElementById('error').style.width='200px'
            document.getElementById('error').style.borderLeft='10px solid red'
            setTimeout(()=>{
                document.getElementById('title').style.transition='1s'
                document.getElementById('title').style.backgroundColor='white'
            },500)
            setTimeout(()=>{
                document.getElementById('error').style.border='0px solid red'
                document.getElementById('error').style.width='0px'
            },2000)
            return false 
        }
        if(recData.resume.trim()===''){
            setErrors('Please summarize your recipe')
            document.getElementById('resumeText').style.transition='.2s'
            document.getElementById('resumeText').style.backgroundColor='red'
            document.getElementById('error').style.width='250px'
            document.getElementById('error').style.borderLeft='10px solid red'
            setTimeout(()=>{
                document.getElementById('resumeText').style.transition='1s'
                document.getElementById('resumeText').style.backgroundColor='white'
            },500)
            setTimeout(()=>{
                document.getElementById('error').style.border='0px solid red'
                document.getElementById('error').style.width='0px'
            },2000)
            return false
        }
        if(!recData.steps.length){
            setErrors('Please explain how to make your recipe')
            document.getElementById('steps').style.transition='.2s'
            document.getElementById('steps').style.backgroundColor='lightred'
            document.getElementById('error').style.width='300px'
            document.getElementById('error').style.borderLeft='10px solid red'
            setTimeout(()=>{
                document.getElementById('steps').style.transition='1s'
                document.getElementById('steps').style.backgroundColor='white'
            },500)
            setTimeout(()=>{
                document.getElementById('error').style.border='0px solid red'
                document.getElementById('error').style.width='0px'
            },2000)
            return false
        }
        setErrors('Recipe created')
        document.getElementById('error').style.width='150px'
        document.getElementById('error').style.borderLeft='10px solid green'
        setTimeout(()=>{
            document.getElementById('error').style.border='0px solid green'
            document.getElementById('error').style.width='0px'
        },2000)
        return true
    }

    const handleInputChange = function(e) {
        if(typeof recData[e.target.name]==='undefined') {
            setRecData({
                ...recData,
                [e.target.name]: e.target.value
            });
        }
        if(Array.isArray(recData[e.target.name])){
            setRecData({
                ...recData,
                [e.target.name]: [...recData[e.target.name],e.target.value.replaceAll('\n', '')]
            });
        }
        else {
            setRecData({
                ...recData,
                [e.target.name]: e.target.value
            });
        }
            
    }

    useEffect(()=>{
        console.log(recData)
        console.log(errors)
    },[errors])
    
    return( 
        <CreatorWrapper>
            <Backg></Backg>
            <GoBack><Link to='/home'>Home</Link></GoBack>
            <Error id='error'>{errors}</Error>
            <Holder>
                <form onSubmit={(event)=>{
                    event.preventDefault()
                    if(formValidate()) dispatch(createRecipe(recData))

                }}>
                    
                    <InputHolder>
                    <label>Title</label>
                    <input type="text" name='name' id='title' value={recData.name} onChange={handleInputChange}/>
                    </InputHolder>
                    
                    <AreaHolder>
                    <label>Resume</label>
                    <textarea type="text" name='resume' id='resumeText' style={{resize:'none'}} value={recData.resume} onChange={handleInputChange} />
                    </AreaHolder>

                    <InputHolder onKeyPress={event=>{
                        if(event.key === 'Enter'){
                            if(validate(event.target.value, recData.dietTypes)){
                                handleInputChange(event)
                                let span = document.createElement('span')
                                span.innerText=event.target.value
                                document.getElementById('tags').prepend(span)
                                event.target.value=''
                            }
                            else {
                                document.getElementById('dietTypes').style.transition='.2s'
                                document.getElementById('dietTypes').style.backgroundColor='red'
                                setTimeout(()=>{
                                    document.getElementById('dietTypes').style.transition='1s'
                                    document.getElementById('dietTypes').style.backgroundColor='white'
                                },500)
                                event.target.value=''
                            }
                        }
                        }}>
                        <label>Diet types</label>
                    
                        <Input id='dietTypes'>
                            <input type="text" name='dietTypes'/>
                            <div id='tags'></div>
                        </Input>
                    </InputHolder>

                    <InputHolder onKeyPress={event=>{
                        if(event.key === 'Enter'){
                            if(validate(event.target.value, recData.dishTypes)){
                                handleInputChange(event)
                                let span = document.createElement('span')
                                span.innerText=event.target.value
                                document.getElementById('dishTags').prepend(span)
                                event.target.value=''
                            }
                            else {
                                document.getElementById('dishTypes').style.transition='.2s'
                                document.getElementById('dishTypes').style.backgroundColor='red'
                                setTimeout(()=>{
                                    document.getElementById('dishTypes').style.transition='1s'
                                    document.getElementById('dishTypes').style.backgroundColor='white'
                                },500)
                                event.target.value=''
                            }
                        }
                        }}>
                        <label>Diet types</label>
                    
                        <Input id='dishTypes'>
                            <input type="text" name='dishTypes'/>
                            <div id='dishTags'></div>
                        </Input>
                    </InputHolder>

                    <Misc>
                        <InputHolder>
                        <label>Score</label>
                        <input type="number" name='score' value={recData.score} onChange={(event)=>{
                            if(scoreValidate(event.target.value))
                            handleInputChange(event)
                            else{
                                if(event.target.value<0)
                                setRecData({
                                    ...recData,
                                    score: 0
                                })
                                else{
                                    setRecData({
                                        ...recData,
                                        score: 100
                                    })
                                }
                            }
                            }}/>
                            
                        </InputHolder>

                        <InputHolder>
                        <label>Health score</label>
                        <input type="number" name='healthScore' value={recData.healthScore} onChange={(event)=>{
                            if(scoreValidate(event.target.value))
                            handleInputChange(event)
                            else{
                                if(event.target.value<0)
                                setRecData({
                                    ...recData,
                                    healthScore: 0
                                })
                                else{
                                    setRecData({
                                        ...recData,
                                        healthScore: 100
                                    })
                                }
                            }
                            }}/>
                        </InputHolder>

                        <InputHolder>
                        <label>Preparation time</label>
                        <input type="number" name='time' value={recData.time} onChange={(event)=>{
                            if(timeValidate(event.target.value))
                            handleInputChange(event)
                            else{
                                setRecData({
                                    ...recData,
                                    time: 0
                                })
                            }
                            }}/>
                        </InputHolder> 
                    </Misc>

                    <AreaHolder onKeyPress={event=>{
                        if(event.key === 'Enter'){
                            
                            if(validate(event.target.value, recData.steps)){
                                
                                handleInputChange(event)
                                let span = document.createElement('span')
                                span.innerText= 'Step '+(recData.steps.length+1)+': '+event.target.value.replaceAll('\n', '')
                                document.getElementById('steptags').prepend(span)
                                event.target.value=''
                            }
                            else {
                                document.getElementById('steps').style.transition='.2s'
                                document.getElementById('steps').style.backgroundColor='red'
                                setTimeout(()=>{
                                    document.getElementById('steps').style.transition='1s'
                                    document.getElementById('steps').style.backgroundColor='transparent'
                                },500)
                                event.target.value=''
                            }
                        }
                        }}>

                        <label>Steps</label>
                        <AreaTags id='steps'>
                            <div id='steptags'></div>
                            <textarea type="text" name='steps' id='stepText' style={{resize:'none'}}/>
                        </AreaTags>
                    </AreaHolder>

                    <InputHolder id='create'>
                        <input type="submit" value="Create"/>
                    </InputHolder>
                    
                </form>
            </Holder>
        </CreatorWrapper>
    )
    
}

const GoBack = styled.div`
position: absolute;
top:0;
left:0;
border-radius: 0 0 5px 0;
background-color: #4949498d;

padding:5px;
a{
    text-decoration: none;
    color:white;
}
`

const CreatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    *{
        overflow: hidden;
    }
`

const Error = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
right:0;
top:10px;
width: 0;
height: 10%;
background-color:white;
z-index: 2;
transition: 1s;
white-space: nowrap;
border-radius: 5px 0 0 5px;
`

const AreaTags = styled.div`
display: flex;
flex-direction: column;
div#steptags{
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 5px;
    span{
    display: flex;
    border:1px solid black;
    background-color:white;
    padding:0 3px 3px 3px;
    margin-right:5px;
    margin-top:5px;
    border-radius: 5px;
    transition: .4s;
    :hover{
        background-color:red;
    }
}
}
`

const AreaHolder = styled.div`
display: flex;
flex-direction: column;
width:100%;
height: fit-content;
label{
    word-break: keep-all;
}
textarea#stepText{
    width:100%;
    height: 100px;
    box-sizing: border-box;
}
textarea#resumeText{
    height: 200px;
    box-sizing: border-box;
    
}
`

const Misc = styled.div`
display: flex;
flex-direction: row;
//width: 100%;
>div{
    width:33.33%
}
@media (max-width:400px) {
    flex-direction: column;
    div{
        width:100%;
    }
}
`

const Input = styled.div`
display: flex;
flex-direction: column;
padding:5px;
background-color: white;
box-sizing: content-box;

input{
    box-sizing: content-box;
    padding:3px;
    border:0px;
    outline: none;
    border-radius: 5px;
    width: 100%;
}

div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    span{
    display: flex;
    max-height:50px;
    overflow: auto;
    border:1px solid black;
    background-color:white;
    padding:0 3px 3px 3px;
    margin-right:5px;
    margin-top:5px;
    border-radius: 5px;
    transition: .4s;
        :hover{
            background-color:red;
        }
    }
}
`

const InputHolder = styled.div`
display: flex;
flex-direction: column;
width:100%;
`

const Holder = styled.div`
    position: relative;
    height: 90%;
    width: 90%;
    background-color: #acacacb7;
    border-radius: 15px;
    display: flex;
    overflow-x: hidden;
    form{
        width:100%
    }
    *{
        outline: none;
    }
    ${InputHolder}#create{
        position:fixed;
        bottom:10px;
        width: 90%;
    }
`

const Backg = styled.div`
    position: absolute;
    background-image: url(${CreateRec});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    filter: blur(2px);
    width: 100%;
    height: 100%;
    z-index: -1;
`