import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createRecipe } from '../Actions'
import { Link } from 'react-router-dom'
import CreateRec from './CreateRec.jpg'
import takeRecipe from './takeRecipe.mp3'

export default function Creator(){

    const dispatch = useDispatch()

    const [recData, setRecData] = useState({
    name: '',
    resume: '',
    score: undefined,
    healthScore: undefined,
    time: undefined,
    dietTypes: [],
    dishTypes: [],
    steps: [],
    image:''
    })

    useEffect(()=>{
        console.log(recData)
    })

    const [errors, setErrors] = useState('')

    function updateScroll(){
        var element = document.getElementById("formHolder");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(()=>{
        updateScroll()
    }, [recData.steps])

    function animateError(type){
        if(!type){
            document.getElementById('error').style.width='250px'
            document.getElementById('error').style.borderLeft='10px solid red'
            if(document.getElementById('error')){
                setTimeout(()=>{
                    document.getElementById('error').style.border='0px solid red'
                    document.getElementById('error').style.width='0px'
                },2000)
            }
            return
        }
        document.getElementById(type).style.transition='.2s'
        document.getElementById(type).style.backgroundColor='red'
        document.getElementById('error').style.width='300px'
        document.getElementById('error').style.borderLeft='10px solid red'
        
        setTimeout(()=>{
            document.getElementById(type).style.transition='1s'
            document.getElementById(type).style.backgroundColor='white'
        },500)
        setTimeout(()=>{
            if(document.getElementById('error')){
                document.getElementById('error').style.border='0px solid red'
                document.getElementById('error').style.width='0px'
            }
        },2000)
    }

    function validate(input, target){
        if(input.trim()==='') {
            setErrors('Input cannot be empty')
            animateError()
            return false
        }
        
        if(target.includes(input.trim())){
            setErrors('You have already added this tag')
            animateError()
            return false
        }
        setErrors('')
        return true
    }

    function scoreValidate(input){
        if(input>100||input<0){
            setErrors('Scores must range between 0 and 100')
            animateError()
            return false
        }
        return true
    }

    function timeValidate(input){
        if(input<0){
            setErrors('Please assign a valid preparation time')
            animateError()
            return false
        }
        return true
    }

    function formValidate(){
        if(recData.name.trim()===''){
            setErrors('Please name your recipe')
            animateError('title')
            return false 
        }
        if(recData.resume.trim()===''){
            setErrors('Please summarize your recipe')
            animateError('resumeText')
            return false
        }
        if(!recData.steps.length){
            setErrors('Please explain how to make your recipe')
            animateError('steps')
            return false
        }
        setErrors('Recipe created')
        document.getElementById('error').style.width='150px'
        document.getElementById('error').style.borderLeft='10px solid green'
        setTimeout(()=>{
            if(document.getElementById('error')){
                document.getElementById('error').style.border='0px solid green'
                document.getElementById('error').style.width='0px'
            }
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
    },[errors])
    
    return( 
        <CreatorWrapper>
            <Backg></Backg>
            <GoBack><Link to='/home'>Home</Link></GoBack>
            <Error id='error'>{errors}</Error>
            <Holder id='formHolder'>
                <form onKeyPress={event=>{event.key === 'Enter' && event.preventDefault()}}
                      onSubmit={event=>{event.preventDefault()
                                        if(formValidate()) {
                                            document.getElementById('created').volume=.5
                                            document.getElementById('created').play()
                                            dispatch(createRecipe(recData))
                                            }}}>
                    
                    <InputHolder>
                        <label>Title</label>
                        <input type="text" name='name' id='title' value={recData.name} onChange={handleInputChange}/>
                    </InputHolder>
                    
                    <AreaHolder>
                        <label>Resume</label>
                        <textarea type="text" name='resume' id='resumeText' style={{resize:'none'}} value={recData.resume} onChange={handleInputChange} />
                    </AreaHolder>

                    <Types>
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

                            <label>Dish types</label>
                            <Input id='dishTypes'>
                                <input type="text" name='dishTypes'/>
                                <div id='dishTags'></div>
                            </Input>
                        </InputHolder>
                    </Types>

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
                                if(scoreValidate(event.target.value)) handleInputChange(event)
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
                                if(timeValidate(event.target.value)) handleInputChange(event)
                                else{
                                    setRecData({
                                        ...recData,
                                        time: 0
                                    })
                                }
                            }}/>
                        </InputHolder> 
                    </Misc>

                    <UploadFile>
                        <label htmlFor='file' id='uploadLabel'>Upload a photo of your recipe</label>
                        <input style={{}} type='file' name='file' onChange={(event)=>{
                            console.log(event.target.files[0])
                            var fileReader = new FileReader();
                            fileReader.onload = function(fileLoadedEvent){
                                fileReader.onloadend = ()=>{
                                let img = document.getElementById('upload')
                                img.src=fileReader.result
                                document.getElementById('uploadLabel').innerText='Click to change the image'
                                }

                                setRecData({
                                    ...recData,
                                    image:fileLoadedEvent.target.result
                                })
                            }
                            fileReader.readAsDataURL(event.target.files[0])
                        }}/>
                        <img id='upload' src='' alt='' style={{width:'250px'}}/>
                    </UploadFile>

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
                                document.getElementById('steptags').style.transition='.2s'
                                document.getElementById('steptags').style.backgroundColor='red'
                                setTimeout(()=>{
                                    document.getElementById('steptags').style.transition='1s'
                                    document.getElementById('steptags').style.backgroundColor='white'
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

                    <Create type='submit'>
                        <audio id='created' src={takeRecipe}></audio>
                        Create
                    </Create>
                    
                </form>
            </Holder>
        </CreatorWrapper>
    ) 
}

const UploadFile = styled.div`
    display: flex;
    border:1px solid grey;
    position: relative;
    width: fit-content;
    flex-direction: column;
    align-items: center;
    padding:5px;
    margin: auto;
    margin-top:15px;
    display: flex;
    background-color: white;
    input{
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    label{
        width:100%;
    }
`

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
    overflow: hidden;
    *{
        ::-webkit-scrollbar{
        background-color: transparent;
        }
        ::-webkit-scrollbar-thumb{
            background-color: #5c5cdb;
            border-radius: 7px;
        }
    }
`

const Error = styled.div`
    position: fixed;
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
    overflow: hidden;
    font-weight: bold;
`

const AreaTags = styled.div`
    display: flex;
    flex-direction: column-reverse;
    div#steptags{
        display: flex;
        flex-direction: column-reverse;
        margin-bottom:40px;
        background-color: white;
        span{
        display: flex;
        border:1px solid black;
        background-color:white;
        padding:3px;
        margin:5px;
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
        width: 98%;
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

const Create = styled.button`
    position:fixed;
    bottom:4%;
    left:5%;
    width: 90%;
    padding: 10px ;
    box-sizing: border-box;
    border:0;
    border-top:1px solid grey;
    border-radius: 10px;
    background-color: lightblue;
    cursor:pointer;
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

const Types = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    ${Input}#dishTypes{
        border:1px solid grey;
    }
    ${Input}#dietTypes{
        border:1px solid grey;
    }
    @media (max-width:800px) {
        flex-direction: column;
    }
`

const Holder = styled.div`
    position: relative;
    height: 90%;
    width: 90%;
    background-color: #acacacb7;
    border-radius: 15px;
    display: flex;
    overflow:auto;
    padding:3px;
    box-sizing: border-box;
    form{
        width:100%
    }
    *{
        outline: none;
    }
`