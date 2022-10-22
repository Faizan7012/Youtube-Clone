let obj = JSON.parse(localStorage.getItem("movies"))||[];
let parent2 = document.querySelector("#movies");
let parent = document.querySelector("#searchdata")
let key = 'AIzaSyDdm9Rm6Q6734LmWaVtLxplKTSGt5bBBmM';

let append = (obj)=>{
  parent2.innerHTML = null;
  let div = document.createElement("div");
  let iframe =document.createElement("iframe"); 
  iframe.src = `https://www.youtube.com/embed/${obj.ID}`;
  iframe.width = "100%";
  iframe.height = "60%";
  iframe.allow = "fullscreen"
  let h5 = document.createElement("h5");
  h5.innerText = obj.Title;
  div.append(iframe,h5);
  parent2.append(div)

}
append(obj)


let getdata = async (title)=> {

  try{
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?search=${title}&key=${key}&part=snippet&maxResults=50`)
    let data = await res.json();
    console.log(data)
    let arr = data.items;
    appenddata(arr);
  }
  catch(err){
  console.log("err")
  }
 }


 let appenddata = (arr)=>{
    parent.innerHTML = null;
    arr.forEach((ele)=>{
     let div = document.createElement("div");
     div.addEventListener("click",function(event){
        event.preventDefault();
        let movies = {
            ID:ele.id.videoId,
            Title:ele.snippet.title,
        }
        localStorage.setItem("movies",JSON.stringify(movies));
        window.location.href = "play.html"
     })
     let img = document.createElement("img");
     img.src = ele.snippet.thumbnails.medium.url;
     let h5 = document.createElement("h5");
     h5.innerText = ele.snippet.title;
     div.append(img,h5)
     parent.append(div);
 });
}


getdata(obj.Title)



