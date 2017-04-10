/**
 * Created by Cruciarius on 10.04.2017.
 */
var request = (function () {
    function createGetRequest(string){
        let oReq = new XMLHttpRequest();
        oReq.open("GET", string);
        oReq.setRequestHeader("Access-Control-Allow-Origin", "*");
        oReq.send();
        return oReq;
    }
    function createPatchRequest(string,article) {
        let oReq = new XMLHttpRequest();
        oReq.open("PATCH", string);
        oReq.setRequestHeader("content-type", "application/json");
        oReq.send(JSON.stringify(article));
        return oReq;
    }

    function createArticlesString(fc, paginationParams) {
        let string = "/articles?skip="+paginationParams.skip+"&top="+paginationParams.top;
        if(fc.author){
            string=string+"&author="+fc.author;
        }
        if(fc.createdAfter){
            string=string+"&createdAfter="+fc.createdAfter;
        }
        if(fc.createdBefore){
            string=string+"&createdBefore="+fc.createdBefore;
        }
        if(fc.tags){
            string=string+"&tags="+fc.tags;
        }
        return string;
    }
    return{
        createGetRequest:createGetRequest,
        createPatchRequest:createPatchRequest,
        createArticlesString:createArticlesString,
    }
}());