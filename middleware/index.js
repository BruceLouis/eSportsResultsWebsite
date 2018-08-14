var middlewareObj = {};

middlewareObj.options = function(category, id, extra_category){
    //authentication to pandascore 
    var url = 'https://api.pandascore.co/';
    var authorization = 'Bearer J_ytOfaK-bRT_3fOwEC2A0WHjLskDM3ZMbaI-kvlaE5r9p42oEk';
    
    id = id || "";
    extra_category = extra_category || "";
    var option =
    {
        url: url + category + id + extra_category + ".json", 
        headers: { "Authorization": authorization}
    };
    
    console.log(option.url);
    return option;
};


//gets rid of 28AA030d kind of words from a strArring
middlewareObj.checkLettersAndDigits = function(strArr) {
    var numLetter = 0;
    var numNumbers = 0;
    var regExpLetter = new RegExp("^[a-zA-Z]+$");
    var regExpNumber = new RegExp("^[0-9]+$");
    for (var i = 0; i < strArr.length; i++){
        if (regExpLetter.test(strArr[i])){
            numLetter++;
        }
        else if (regExpNumber.test(strArr[i])){
            numNumbers++;
        }
    }
    if (numLetter > 0 && numNumbers > 0){
        return true;
    }
    else{
        return false;
    }
};

middlewareObj.capitalizeFirstLetter = function(strArr){
    var result = [];
    for (var i = 0; i < strArr.length; i++){ 
        result.push(strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1)); 
    }
    result = result.join(" ");  
    return result;
};

module.exports = middlewareObj;
