const API_KEY = "9da7630c3f5a4f4781af2037ef0bdc8c";
let keyword = "";
let category = "";
let newsName = "";
let page = "1";
let newsList2 = [];
const loadMorePage = () => {
	page++;
	getNews(newsList2);
};

const searchCategory = () => {
	category = document.getElementById("categoryChoise").value;
	console.log(category);
	getNews();
};

const getNews = async () => {
	let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${API_KEY}&category=${category}&q=${keyword}&sources${newsName}`;
	let response = await fetch(url);
	let data = await response.json();
	newsList = data.articles;
	render(newsList);
	console.log("responce", data);
};

let render = (list) => {
	let newsHTML = list.map(
		(item) => `<div class="news">
    <img
        src="${item.urlToImage}"
        width="200"
    />
    <div>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <div>${moment(item.publishedAt).fromNow()}</div>
        <div>${item.source.name}</div>
    </div>
</div>`
	);
	let newsChannel = list.map((item) => item.source.name);
	//console.log("bossbro", newsChannel);
	let uniqSrc = [];

	for (let i = 0; i < newsChannel.length; i++) {
		let item = newsChannel[i];
		uniqSrc[item] = uniqSrc[item] ? uniqSrc[item] + 1 : 1;
	}

	console.log(uniqSrc);
	console.log("item", Object.entries(uniqSrc)[18]);
	let allNC = Object.entries(uniqSrc);
	allNC.map((item) => `<a>${item}</a>`);

	document.getElementById("vertical-menu").innerHTML = allNC;

	document.getElementById("newsBoard").innerHTML = newsHTML;
};

// function count(newsChannel) {
// 	console.log("broooooo", newsChannel);
// 	newsChannel.sort();

// 	let current = null;
// 	let cnt = 0;
// 	for (let i = 0; i < newsChannel.length; i++) {
// 		if (newsChannel[i] != current) {
// 			if (cnt > 0) {
// 				document.write(current + " comes --> " + cnt + " times<br>");
// 			}
// 			current = newsChannel[i];
// 			cnt = 1;
// 		} else {
// 			cnt++;
// 		}
// 	}
// 	if (cnt > 0) {
// 		document.write(current + " comes --> " + cnt + " times");
// 	}
// }

// count();

getNews();

//show news info use moment js
//search by keywords (call api)
//search by catagory (call api)
//search by source (dont call api, but try usinf filetrs)
//load more
