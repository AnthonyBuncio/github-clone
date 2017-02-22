console.log('do we have jquery?')
console.log($)

//**** PROMISES && CONTAINER NODES ****
var profilePromise = $.getJSON('https://api.github.com/users/AnthonyBuncio')
var projectPromise = $.getJSON('https://api.github.com/users/AnthonyBuncio/repos')
var leftNode = document.querySelector('#left') 
var rightNode = document.querySelector('#right')

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
	getString += '' //line seperator
	getString += '<p>' + userObj.location + '</p>' //get location
	getString += '<p>' + userObj.email + '<p>' //get email
	getString += '<p>' + userObj.blog + '</p>' //get website
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
	eachObjHTML += '<p>' + singleObj.language + '</p>' + '</li><hr>'
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



profilePromise.then(getUser)
projectPromise.then(getRepo)