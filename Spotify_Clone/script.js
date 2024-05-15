console.log(1)

let songIndex=0
let audioElement=new Audio('/songs/1.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let masterSong=document.getElementById('masterSong')
let songItems=Array.from(document.getElementsByClassName('songItem'))
let songItems1=Array.from(document.getElementsByClassName('songItemPlay'))

let songs=[
    {songName:"Salam-e-Ishq", filePath:"/songs/1.mp3",coverPath:"img/covers/1.jpg"},
    {songName:"Salam", filePath:"/songs/2.mp3",coverPath:"img/covers/2.jpg"},
    {songName:"Dior", filePath:"/songs/3.mp3",coverPath:"img/covers/3.jpg"},
    {songName:"No Safety", filePath:"/songs/4.mp3",coverPath:"img/covers/4.jpg"},
    {songName:"Ishq", filePath:"/songs/5.mp3",coverPath:"img/covers/5.jpg"},
    {songName:"Gminxr", filePath:"/songs/6.mp3",coverPath:"img/covers/6.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath
    element.getElementsByClassName('song_name')[0].innerText=songs[i].songName
});

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity=1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity=0
    }
})

// audioElement.play()
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause')
            element.classList.add('fa-play')
})
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-pause')
        audioElement.src=`songs/${songIndex+1}.mp3`
        masterSong.innerText=songs[songIndex].songName
        audioElement.currentTime=0
        audioElement.play()
        gif.style.opacity=1

        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex==6){
        songIndex=0
    }
    else{
        songIndex+=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.currentTime=0
    masterSong.innerText=songs[songIndex].songName
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==1){
        songIndex=0
    }
    else{
        songIndex-=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSong.innerText=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})