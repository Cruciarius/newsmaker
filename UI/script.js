var articles = [
  {
    id: "1",
    title: "Минское «Динамо» обыграло ярославский «Локомотив»",
    summary: "Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2",
    createdAt: new Date("2017-02-27"),
    author: "Иванов Иван",
    content: "Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.",
    tags : "sports,",
  },
  {
     id: "2",
     title: "Trump to sign new immigration order",
     summary: "Donald Trump is to sign a new executive order on immigration later on Monday, his aide Kellyanne Conway has said.",
     createdAt: new Date("2017-03-05"),
     author: "BBC News",
     content: "A revised order has been expected from the White House since the earlier ban was blocked by a federal court.The previous order suspended the entire US refugee resettlement programme and blocked citizens of seven Muslim-majority nations from entering the US.It sparked confusion at airports, as people with valid visas were turned away, and mass protests.President Trump's administration argued that the ban was necessary to keep the US safe from terrorism.",
     tags : "politics,",
  },
  {
    id: "3",
    title: "France election: Juppe will not replace scandal-hit Fillon",
    summary: "Alain Juppe, the leading candidate to replace under-fire French presidential hopeful Francois Fillon, says he will not run, despite pressure to do so.",
    createdAt: new Date("2017-02-05"),
    author: "BBC News",
    content: "Mr Fillon has denied allegations that members of his family were paid taxpayers' money for fictitious jobs."+
             "He has lost support within the centre-right party and in opinion polls ahead of the first round of voting in April."+
             "Mr Juppe, seen as his most likely replacement, attacked his rival's but said he would not run."+
             "Opinion polls had shown that Mr Juppe would have progressed into the second round of the election. Mr Fillon is not projected to make it past the first round."+
             "What are the accusations against Fillon?"+
             "They have been rumbling on for more than a month now - and the longer they have gone on, the more Mr Fillon has dug in (seemingly at the expense of his own chances of the presidency)."+
             "He has fought allegations that his Welsh-born wife, Penelope, was paid for a number of years for work that she did not do as his parliamentary assistant."+
             "However Mrs Fillon, who insists she did work for her husband, told French magazine Journal du Dimanche on Saturday that everything was legal and declared.",
    tags : "politics,",
  },
  {
     id: "4",
     title: "The turtle who ate 1,000 coins",
     summary: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
     createdAt: new Date("2017-02-27"),
     author: "Ivanov ivan",
     content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
     tags : "ecology," + "turtles,",
  },
  {
     id: "5",
     title: "The turtle who ate 1,000 coins",
     summary: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
     createdAt: new Date("2017-02-28"),
     author: "Ivanov Ivan",
     content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
     tags : "ecology," + "animals,",
  },
  {
       id: "6",
       title: "The turtle who ate 1,000 coins",
       summary: "",
       createdAt: new Date("2027-02-27"),
       author: "Petrov petr",
       content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
       tags : "ecology," +"animals,",
    },
];

var filterConfig = {
   title : undefined,
   author : undefined,
   createdAt : undefined,
   tags : undefined,
}

var tags = [ "sports", "ecology", "politics", "cinema" , "games", "animals",];

function getArticles(skip,top,fc){
filterConfig = fc||filterConfig;
  skip = skip||0;
  top = top||10;
var arr = [];
for(var i=0; i<articles.length && top>0; i++){
  if(isSearched(articles[i])){
    arr.push(articles[i]);
    top--;
  }
}
return arr.sort(compareDates);
}

function getArticle(id){
for(var i=0; i<articles.length; i++){
if(id === articles[i].id){
return articles[i];
}
}
}

function validateArticle(article){
if( article.id===undefined || article.title === undefined || article.author === undefined || article.summary === undefined || article.createdAt === undefined || article.content === undefined){
return false;
}
if(article.tags.length === 0 || article.title.length >= 100 || article.summary.length >= 200 || article.title.length === 0 || article.summary.length === 0){
return false;
}
return true;
}

function addArticle(article){
var arr = article.tags.split(",");
for(i=0;i<arr.length;i++){
if(tags.indexOf(arr[i]) === -1){
delete arr[i];
}
else arr[i] = arr[i]+",";
}
console.log(arr);
article.tags = arr;
if(validateArticle(article)){
article.id = (articles.length + 1).toString();
articles.push(article);
return true;
}
else{
return false;
}
}

function editArticle(id, article){
var res = getArticle(id);
if(validateArticle(res)){
if(article.title!=undefined){
res.title = article.title;
}
if(article.summary!=undefined){
res.summary = article.summary;
}
if(article.content!=undefined){
res.content = article.content;
}
if(article.tags!=undefined){
res.tags = article.tags;
}
return true;
}
return false;
}

function removeArticle(id){
if(articles[id-1] != undefined){
delete articles[id-1];
return true;
}
return false;
}

function addTag(tag){
if(tags.indexOf(tag) === -1){
tags.push(tag);
return true;
}
return false;
}

function removeTag(tag){
if(tags.indexOf(tag)!= -1){
delete tags[tags.indexOf(tag)];
return true;
}
return false;
}

function compareDates(a,b){
if(a.createdAt.getTime()>b.createdAt.getTime()) return 1;
if(a.createdAt.getTime()>b.createdAt.getTime()) return -1;
}


function isSearched(element){
var result = false;
result = (compareAuthor(element)&&compareDate(element)&&compareTags(element));
return result;
}

function compareAuthor(element){
if(filterConfig.author != undefined){
if(filterConfig.author.toLowerCase() === element.author.toLowerCase()){
return true;
}
return false;
}
return true;
}

function compareDate(element){
if(filterConfig.createdAt != undefined){
if(filterConfig.createdAt.getTime() === element.createdAt.getTime()){
return true;
}
return false;
}
return true;
}

function compareTags(element){
if(filterConfig.tags != undefined){
var arr = element.tags.split(",");
var filter = filterConfig.tags.split(",")
for(i = 0;i<arr.length;i++){
if ((filter.indexOf(arr[i]) != -1) && arr[i]!=""){
return true;
}
}
return false;
}
return true;
}