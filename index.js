  let parent = document.querySelector("#searchdata")
  let key = 'AIzaSyDdm9Rm6Q6734LmWaVtLxplKTSGt5bBBmM';
 let getdata = async ()=> {

  try{
    let query = document.querySelector("#query").value;
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${key}&part=snippet&maxResults=50`)
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





let trendingdata = async () =>{
  try{
    let ans = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=mostPopular&regionCode=IN&maxResults=32&key=${key}`)
    let { items } =  await ans.json();
     arr_of = items

    append2(arr_of)

  }
  catch(err){
    console.log("err")
  }
        
}

let append2 = (Arr)=>{
  Arr.forEach((ele)=>{
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
    let p = document.createElement("h6");
    let date = new Date(ele.snippet.publishTime);
    let months = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let day = date.getDay()
    let dayname = days[day%7]
    let month = months[date.getMonth()]
    let year = date.getFullYear();
    p.innerText ='Upload - '+ dayname+' '+month+' '+year
    div.append(img,h5,p)
    parent.append(div);
})
}

trendingdata()

