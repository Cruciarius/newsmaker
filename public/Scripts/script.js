"use strict";

var articleService = (function () {
    var articles = [
        {
            id: "1",
            title: "Минское «Динамо» обыграло ярославский «Локомотив»",
            summary: "Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2",
            createdAt: new Date("2017-02-27"),
            author: "Иванов Иван",
            content: "Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.",
            tags: ["sports"],
            deleted : false
        },
        {
            id: "2",
            title: "Trump to sign new immigration order",
            summary: "Donald Trump is to sign a new executive order on immigration later on Monday, his aide Kellyanne Conway has said.",
            createdAt: new Date("2017-03-05"),
            author: "BBC News",
            content: "A revised order has been expected from the White House since the earlier ban was blocked by a federal court.The previous order suspended the entire US refugee resettlement programme and blocked citizens of seven Muslim-majority nations from entering the US.It sparked confusion at airports, as people with valid visas were turned away, and mass protests.President Trump's administration argued that the ban was necessary to keep the US safe from terrorism.",
            tags: ["politics"],
            deleted : false
        },
        {
            id: "3",
            title: "France election: Juppe will not replace scandal-hit Fillon",
            summary: "Alain Juppe, the leading candidate to replace under-fire French presidential hopeful Francois Fillon, says he will not run, despite pressure to do so.",
            createdAt: new Date("2017-02-05"),
            author: "BBC News",
            content: "Mr Fillon has denied allegations that members of his family were paid taxpayers' money for fictitious jobs." +
            "He has lost support within the centre-right party and in opinion polls ahead of the first round of voting in April." +
            "Mr Juppe, seen as his most likely replacement, attacked his rival's but said he would not run." +
            "Opinion polls had shown that Mr Juppe would have progressed into the second round of the election. Mr Fillon is not projected to make it past the first round." +
            "What are the accusations against Fillon?" +
            "They have been rumbling on for more than a month now - and the longer they have gone on, the more Mr Fillon has dug in (seemingly at the expense of his own chances of the presidency)." +
            "He has fought allegations that his Welsh-born wife, Penelope, was paid for a number of years for work that she did not do as his parliamentary assistant." +
            "However Mrs Fillon, who insists she did work for her husband, told French magazine Journal du Dimanche on Saturday that everything was legal and declared.",
            tags: ["politics"],
            deleted : false
        },
        {
            id: "4",
            title: "The turtle who ate 1,000 coins",
            summary: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            createdAt: new Date("2017-02-27"),
            author: "Ivanov ivan",
            content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            tags: ["ecology", "turtles"],
            deleted : false
        },
        {
            id: "5",
            title: "The turtle who ate 1,000 coins",
            summary: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            createdAt: new Date("2017-02-28"),
            author: "Ivanov Ivan",
            content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            tags: ["ecology", "animals"],
            deleted : false
        },
        {
            id: "6",
            title: "The turtle who ate 1,000 coins",
            summary: "",
            createdAt: new Date("2027-02-27"),
            author: "Petrov petr",
            content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            tags: ["ecology", "animals"],
            deleted : false
        },
        {
            id: "7",
            title: "Supreme Court drops landmark transgender school bathroom case",
            summary: "The US Supreme Court has reversed its decision to hear a landmark case on transgender bathroom rights.",
            createdAt: new Date("1027-02-27"),
            author: "bbc",
            content: "Gavin Grimm, who was born female but identifies as male, sued his school board over their policy which prevented him from using male facilities." +
            "The Supreme Court had scheduled for a hearing on 28 March." +
            "However, it has now sent the case back to a lower court after Donald Trump's administration issued new policy guidance relevant to the case." +
            "The US Court of Appeals for the 4th Circuit originally ruled in Mr Grimm's favour in April last year." +
            "It deferred to then-president Barack Obama's directive on the issue - which said that federal law banning sex discrimination in public schools extended to protecting transgender bathroom rights." +
            "The supreme justices later accepted a petition from Gloucester County, Virginia, to hear an appeal - in what would have been the first Supreme Court ruling on transgender rights.",
            tags: ["ecology", "people", "society"],
            deleted : false
        },
        {
            id: "8",
            title: "Stella McCartney's surprise George Michael tribute",
            summary: "Stella McCartney models burst into a rendition of the late singer's hit song Faith on the runway at Paris Fashion Week.",
            createdAt: new Date("2027-02-27"),
            author: "Petrov petr",
            content: "video",
            tags: ["people"],
            deleted : false
        },
        {
            id: "9",
            title: "Gender pay gap in 'reverse' for some ethnic groups",
            summary: "Working women in some ethnic groups in the UK have not only narrowed the gender pay gap but have overtaken men's earning power, analysis suggests.",
            createdAt: new Date("2007-12-27"),
            author: "Petrov petr",
            content: "The Fawcett Society, which campaigns for equality, said Caribbean and white Irish working women, on average, earn more than men from the same background." +
            "Its report found that, for most ethnic groups, men earned more than women." +
            "It used hourly pay data from the Office for National Statistics (ONS) covering full-time employees in the UK." +
            "The gender pay gap, or the average difference in hourly pay between men and women, currently stands at 13.9% for full-time workers, according to the ONS.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "10",
            title: "Troadec case: Brother-in-law admits murdering missing family of four",
            summary: "A relative of a French family of four who have been missing since mid-February has admitted killing them, a prosecutor said.",
            createdAt: new Date("2010-10-10"),
            author: "Petrov petr",
            content: "Pascal Troadec's former brother-in-law, named as Hubert Caouissin, told investigators he had killed them in a row about the inheritance of gold bars." +
            "He battered them to death with a crowbar at their home in Nantes, local prosecutor Pierre Sennes said." +
            "Mr Caouissin will be charged and jailed on Monday." +
            "He was arrested in Brest on Sunday along with Mr Troadec's sister Lydie Troadec, his ex-wife.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "11",
            title: "India 'human sacrifice': Arrests over 10-year-old's death",
            summary: "Police in the south Indian state of Karnataka have arrested three people in connection with the human sacrifice of a 10-year-old girl .",
            createdAt: new Date("2027-02-27"),
            author: "Petrov petr",
            content: "Police told BBC Hindi that the child was killed on the instructions of a sorcerer to cure a paralysed man." +
            "The man's brother and sister have been arrested on charges of abducting and murdering the girl." +
            "The alleged sorcerer told them it was the only way to undo black magic affecting their sibling, police said." +
            "A 17-year-old boy has also been arrested for helping to abduct the girl, police said.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "12",
            title: "Gender pay gap in 'reverse' for some ethnic groups",
            summary: "Working women in some ethnic groups in the UK have not only narrowed the gender pay gap but have overtaken men's earning power, analysis suggests.",
            createdAt: new Date("2007-12-27"),
            author: "PETROV petr",
            content: "The Fawcett Society, which campaigns for equality, said Caribbean and white Irish working women, on average, earn more than men from the same background." +
            "Its report found that, for most ethnic groups, men earned more than women." +
            "It used hourly pay data from the Office for National Statistics (ONS) covering full-time employees in the UK." +
            "The gender pay gap, or the average difference in hourly pay between men and women, currently stands at 13.9% for full-time workers, according to the ONS.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "13",
            title: "Troadec case: Brother-in-law admits murdering missing family of four",
            summary: "A relative of a French family of four who have been missing since mid-February has admitted killing them, a prosecutor said.",
            createdAt: new Date("2010-2-31"),
            author: "Petrov petr",
            content: "Pascal Troadec's former brother-in-law, named as Hubert Caouissin, told investigators he had killed them in a row about the inheritance of gold bars." +
            "He battered them to death with a crowbar at their home in Nantes, local prosecutor Pierre Sennes said." +
            "Mr Caouissin will be charged and jailed on Monday." +
            "He was arrested in Brest on Sunday along with Mr Troadec's sister Lydie Troadec, his ex-wife.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "14",
            title: "India 'human sacrifice': Arrests over 10-year-old's death",
            summary: "Police in the south Indian state of Karnataka have arrested three people in connection with the human sacrifice of a 10-year-old girl .",
            createdAt: new Date("2027-02-27"),
            author: "Petrov petr",
            content: "Police told BBC Hindi that the child was killed on the instructions of a sorcerer to cure a paralysed man." +
            "The man's brother and sister have been arrested on charges of abducting and murdering the girl." +
            "The alleged sorcerer told them it was the only way to undo black magic affecting their sibling, police said." +
            "A 17-year-old boy has also been arrested for helping to abduct the girl, police said.",
            tags: ["people", "society", "murder"],
            deleted : false
        },
        {
            id: "15",
            title: "The turtle who ate 1,000 coins",
            summary: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            createdAt: new Date("2017-02-28"),
            author: "Ivanov Ivan",
            content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            tags: ["ecology", "animals"],
            deleted : false
        },
        {
            id: "16",
            title: "The turtle who ate 1,000 coins",
            summary: "",
            createdAt: new Date("2027-02-27"),
            author: "Dima Sidorov",
            content: "Bank the turtle is recovering in Thailand after tourists threw money into his pond for luck.",
            tags: ["ecology", "animals"],
            deleted : false
        },
        {
            id: "17",
            title: "Supreme Court drops landmark transgender school bathroom case",
            summary: "The US Supreme Court has reversed its decision to hear a landmark case on transgender bathroom rights.",
            createdAt: new Date("1027-02-27"),
            author: "bbc",
            content: "Gavin Grimm, who was born female but identifies as male, sued his school board over their policy which prevented him from using male facilities." +
            "The Supreme Court had scheduled for a hearing on 28 March." +
            "However, it has now sent the case back to a lower court after Donald Trump's administration issued new policy guidance relevant to the case." +
            "The US Court of Appeals for the 4th Circuit originally ruled in Mr Grimm's favour in April last year." +
            "It deferred to then-president Barack Obama's directive on the issue - which said that federal law banning sex discrimination in public schools extended to protecting transgender bathroom rights." +
            "The supreme justices later accepted a petition from Gloucester County, Virginia, to hear an appeal - in what would have been the first Supreme Court ruling on transgender rights.",
            tags: ["ecology", "people", "society"],
            deleted : false
        },
        {
            id: "18",
            title: "Stella McCartney's surprise George Michael tribute",
            summary: "Stella McCartney models burst into a rendition of the late singer's hit song Faith on the runway at Paris Fashion Week.",
            createdAt: new Date("2027-02-27"),
            author: "Petrov petr",
            content: "video",
            tags: ["people"],
            deleted : false
        },
        {
            id: "19",
            title: "Gender pay gap in 'reverse' for some ethnic groups",
            summary: "Working women in some ethnic groups in the UK have not only narrowed the gender pay gap but have overtaken men's earning power, analysis suggests.",
            createdAt: new Date("2007-12-27"),
            author: "Petrov petr",
            content: "The Fawcett Society, which campaigns for equality, said Caribbean and white Irish working women, on average, earn more than men from the same background." +
            "Its report found that, for most ethnic groups, men earned more than women." +
            "It used hourly pay data from the Office for National Statistics (ONS) covering full-time employees in the UK." +
            "The gender pay gap, or the average difference in hourly pay between men and women, currently stands at 13.9% for full-time workers, according to the ONS.",
            tags: ["people", "society"],
            deleted : false
        },
        {
            id: "20",
            title: "Troadec case: Brother-in-law admits murdering missing family of four",
            summary: "A relative of a French family of four who have been missing since mid-February has admitted killing them, a prosecutor said.",
            createdAt: new Date("2010-10-10"),
            author: "Petrov petr",
            content: "Pascal Troadec's former brother-in-law, named as Hubert Caouissin, told investigators he had killed them in a row about the inheritance of gold bars." +
            "He battered them to death with a crowbar at their home in Nantes, local prosecutor Pierre Sennes said." +
            "Mr Caouissin will be charged and jailed on Monday." +
            "He was arrested in Brest on Sunday along with Mr Troadec's sister Lydie Troadec, his ex-wife.",
            tags: ["people", "society"],
            deleted : false
        }
    ];

    if(!localStorage.getItem("allArticles")){
        articles = JSON.stringify(articles);
        localStorage.setItem("allArticles", articles);
    }

    var filterConfig = {
        title: undefined,
        author: undefined,
        createdAfter: undefined,
        createdBefore: undefined,
        tags: undefined
    };

    var tags = ["sports", "ecology", "politics", "cinema", "games", "animals", "people", "society"];

    function getArticles(skip, top, fc) {
        filterConfig = fc || filterConfig;
        skip = skip || 0;
        top = top || 10;
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        articles=articles.sort(compareDates);
        var arr = [];
        for (var i = skip; i < articles.length && top > 0; i++) {
            if (isSearched(articles[i])) {
                if (validateArticle(articles[i])) {
                    arr.push(articles[i]);
                    top--;
                }
            }
        }
        localStorage.setItem("articles", arr);
        return arr.sort(compareDates);
    }

    function getArticle(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        for (var i = 0; i < articles.length; i++) {
            if (id === articles[i].id) {
                return articles[i];
            }
        }
    }

    function validateArticle(article) {
        if (article.id === undefined || article.title === undefined || article.author === undefined || article.summary === undefined || article.createdAt === undefined || article.content === undefined) {
            return false;
        }
        if (article.tags.length === 0 || article.title.length >= 100 || article.summary.length >= 200 || article.title.length === 0 || article.summary.length === 0) {
            return false;
        }
        return true;
    }

    function validateId(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        for(var i=0;i<articles.length;i++){
            if(articles[i].id == id) {
                return false;
            }
        }
        return true;
    }

    function addArticle(article) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        localStorage.setItem("size", articles.length);
        article = article || JSON.parse(localStorage.getItem("articleTemp"));
        for (var i = 0; i < tags.length; i++) {
            if (tags.indexOf(article.tags[i]) === -1) {
                article.tags.splice(i, 1);
            }
        }
        article.id = localStorage.getItem("size");
        article.id++;
        console.log(article.id);
        if (validateArticle(article) && validateId(article.id)) {
            article.id = (articles.length + 1).toString();
            articles.push(article);
            localStorage.setItem("size", article.id);
            localStorage.setItem("allArticles", JSON.stringify(articles));
            return true;
        }
        else {
            return false;
        }
    }

    function editArticle(id, article) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        article = article || JSON.parse(localStorage.getItem("articleTemp"));
        if (validateArticle(articles[id-1])) {
            if (article.title) {
                articles[id-1].title = article.title;
            }
            if (article.summary) {
                articles[id-1].summary = article.summary;
            }
            if (article.content) {
                articles[id-1].content = article.content;
            }
            if (article.tags) {
                articles[id-1].tags = article.tags;
            }
            localStorage.setItem("allArticles",JSON.stringify(articles));
            return true;
        }
        return false;
    }

    function removeArticle(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        if (articles[id - 1]) {
            articles[id-1].deleted = true;
            articles.splice(id - 1, 1);
            localStorage.setItem("allArticles",JSON.stringify(articles));
            return true;
        }
        return false;
    }

    function addTag(tag) {
        if (tags.indexOf(tag) === -1) {
            tags.push(tag);
            return true;
        }
        return false;
    }

    function removeTag(tag) {
        if (tags.indexOf(tag) != -1) {
            tags.splice(tags.indexOf(tag), 1);
            return true;
        }
        return false;
    }

    function compareDates(a, b) {
        return (a.createdAt - b.createdAt);
    }

    function isSearched(element) {
        var result = false;
        result = (compareAuthor(element) && compareDate(element) && compareTags(element));
        return result;
    }

    function compareAuthor(element) {
        if (filterConfig.author) {
            if (filterConfig.author.toLowerCase() === element.author.toLowerCase()) {
                return true;
            }
            return false;
        }
        return true;
    }

    function compareDate(element) {
        if (filterConfig.createdBefore && filterConfig.createdAfter) {
            if (filterConfig.createdAfter.getTime() <= element.createdAt.getTime() && filterConfig.createdBefore.getTime() >= element.createdAt.getTime()) {
                return true;
            }
            return false;
        }
        return true;
    }

    function compareTags(element) {
        if (filterConfig.tags) {
            var filter = filterConfig.tags.split(",");
            for (var i = 0; i < element.tags.length; i++) {
                if ((filter.indexOf(element.tags[i]) != -1) && element.tags[i] != "") {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    function getArticlesLength(fc) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        if(!fc){
            return articles.length;
        }
        else{
            return getArticles(0,articles.length,fc).length;
        }
    }

    function parseDate(key, value){
        if (key == 'createdAt'){
            return new Date(value);
        }
        return value;
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        validateId: validateId,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        getArticlesLength: getArticlesLength,
        parseDate: parseDate,
        filterConfig: filterConfig
    }

}());