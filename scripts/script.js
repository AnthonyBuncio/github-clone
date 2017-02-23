//**** PROMISES && CONTAINER NODES ****
var myProfile = 'https://api.github.com/users/AnthonyBuncio',
	myProject = 'https://api.github.com/users/AnthonyBuncio/repos',
	userProfile = 'https://api.github.com/users/', //we can use this for user project and add '/repos' to the end
	leftNode = document.querySelector('.left'), 
	rightNode = document.querySelector('#right'),
	inputSearch = document.querySelector('.searchBar')

//takes in userObj which already has properties we can grab
//we can add HTML by selecting certain properties of that obj
//it will return a string passed into the leftNode and contain user info
var getUser = function(userObj) {
	console.log(userObj) //console logging the return of the fufilled promise
	var getString = ''
	getString += '<div class = "info">'
	getString += '<img src="' + userObj.avatar_url + '"/>' //get image
	getString += '<h1>' + userObj.name + '</h1>' //get name
	getString += '<h2>' + userObj.bio + '</h2>' //get bio
	getString += '<hr>' //line seperator
	getString += '<p>' + userObj.location + '</p>' //get location
	getString += '<a class="email" href="mailto:' + userObj.email + '">' + userObj.email + '</a><br><br>' //get email
	getString += '<a class="blog" href="' + userObj.blog + '">' + userObj.blog + '</a>' //get website
	getString += '</div>'
	leftNode.innerHTML = getString
}

//takes in projArray which is already an array
//we can loop through projArray
//add HTML to obj properties in smaller function
//it will return a string passed into the rightNode and contain repo info
var getProjectInfo = function(singleObj) {
	var eachObjHTML = ''
	eachObjHTML += '<li>' + '<a class="repo-link" href=' + singleObj.html_url + '>' + singleObj.name + '</a>'
	eachObjHTML += '<p class="language">' + singleObj.language + '</p>' + '</li><hr>'
	return eachObjHTML
	console.log(eachObjHTML)
}

var getRepo = function(projArray) {
	console.log(projArray) //console logging the return of the fufilled promise
	var fullHTMLString = '<ul>'
	for (var i = 0; i < projArray.length; i++) {
		fullHTMLString += getProjectInfo(projArray[i])
	} 
	rightNode.innerHTML = fullHTMLString + '</ul>'
	console.log(fullHTMLString + '</ul>')
}


// *** IGNORE *** i made a single function of this below
// var makeUserRequest = function(url) {
// 	var gitPromise = $.getJSON(url)
// 	gitPromise.then(getUser)
// }

// var makeRepoRequest = function(url) {
// 	var gitPromise = $.getJSON(url)
// 	gitPromise.then(getRepo)
// }

// makeUserRequest(myProfile)
// makeRepoRequest(myProject)


//create a single function to get both user and repo information
//this is a shorter version of the above function
var makeRequest = function(url1, url2) {
	var gitPromise1 = $.getJSON(url1)
	gitPromise1.then(getUser)
	var gitPromise2 = $.getJSON(url2)
	gitPromise2.then(getRepo)
}
//this function is invoked as the page shown on load each time
//until search bar contains value and enter key is pressed
makeRequest(myProfile, myProject)

//listens for 'enter' keydown and adds search bar value to url
//receives user info and repos to show in dom
inputSearch.addEventListener('keydown', function(eventObj) {
	if (eventObj.keyCode === 13) {
		var getUser1 = userProfile + eventObj.target.value
		var getUser2 = userProfile + eventObj.target.value + '/repos'
		makeRequest(getUser1, getUser2)
		eventObj.target.value = ''
	}
})