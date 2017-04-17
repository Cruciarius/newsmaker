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

    function createPostRequest(string,article) {
        let oReq = new XMLHttpRequest();
        oReq.open("POST", string);
        oReq.setRequestHeader("content-type", "application/json");
        oReq.send(JSON.stringify(article));
        return oReq;
    }
    function createDeleteRequest(string) {
        let oReq = new XMLHttpRequest();
        oReq.open("DELETE", string);
        oReq.setRequestHeader("content-type", "application/json");
        oReq.send();
        return oReq;
    }

    function getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
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
        getUrlVars: getUrlVars,
        createGetRequest:createGetRequest,
        createPostRequest:createPostRequest,
        createPatchRequest:createPatchRequest,
        createDeleteRequest:createDeleteRequest,
        createArticlesString:createArticlesString,
    }
}());