// Getting all the HTML elements
const userInput = document.getElementById("username");
const getdetails = document.getElementById("Searchdetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

// Getting username from input and fetching the details from github by async function
getdetails.addEventListener("click", async ()=>{
 const userName = userInput.value;
// Clear previous content and hide divs in case of new search
profile.innerHTML = '';
repo.innerHTML = '';
//  console.log(userName);
// fetching profile details from github api 
const res = await fetch(`https://api.github.com/users/${userName}`);
const data = await res.json();
// console.log(data); 
getProfile(data);
getRepo(userName);
})

// Displaying the profiledetails 
function getProfile(data){
console.log(data);

// Basic error handling for missing data
const name = data.name || "Name not available";
const login = data.login || "Login not available";
const bio = data.bio || "Bio not available";
const followers = data.followers || 0;
const following = data.following || 0;
const location = data.location || "Location not available";

// Displaying the profile details in the card
profile.innerHTML=`
<div class="card">
<div class="card-image">
<img src="${data.avatar_url}" alt="${name}">
</div>
<div class="card-body">
<div class="card-tittle">${name}</div>
<div class="card-subHeading">${login}</div>
<div class="card-text">
<p>${bio}</p>
<p><i class="fa-solid fa-user-group"></i> ${followers} followers . ${following} following</p>
<p><i class="fa-solid fa-location-dot"></i> ${location}</p>
<button>
<a href=${data.html_url} target="_blank">Visit Profile</a>
</button>
</div>
</div>
</div>
`
}

// Getting the username and passing to the another api to get repositary details
async function getRepo(userName) {
    //console.log(userName);
    const result = await fetch(`https://api.github.com/users/${userName}/repos`)
    //console.log(result);
    const repositary = await result.json();
    //console.log(repositary);
    for(let i=0;i<repositary.length;i++){
        repo.innerHTML +=`
    <div class="card">
    <div class="card-body">
    <div class="card-tittle">${repositary[i].name}</div>
    <div class="card-subHeading"><i class="fa-solid fa-circle fa-2xs" style="color: #FFD43B;"></i>&nbsp${repositary[i].language}</div>
    <div class="card-text">
    <button>
    <a href=${repositary[i].html_url} target="_blank">Visit Repositories</a>
    </button>
    <br>
    <br>
    <hr>
    </div>
    </div>
    </div>
    `
}
}