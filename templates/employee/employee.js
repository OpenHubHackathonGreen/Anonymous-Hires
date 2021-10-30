//Hard-coded list of skills to choose from (will be pulled from server dynamically)
const skills = {"0":{ "name": "Python"}, "1":{ "name": "Web"}, "2":{ "name": "Java"}, "3":{ "name": "Evil buisness"}, "4":{ "name": "Cleaning"}, "5":{ "name": "Manical Laughing"}, "6":{ "name": "Cat Stroking"}, "7":{ "name": "Cooking"}, "8":{ "name": "Art"}};
//Hard-coded list of listings a company has already made (will be pulled from server dynamically)
let listings = {
                    "0": {
                        "companyName": "PandaCorp",
                        "name": "DevOps", "description": "Develop software in an agile enviornment", 
                        "skills": ["0", "2"], "hasApplied": false
                    }, 
                    "1": {
                        "companyName": "Doofenshmirtz Evil Inc",
                        "name": "WMD Manager", "description": "Oversee development of WMDs with goal of conquering Tri-State Area", 
                        "skills": ["1"], "hasApplied": false
                    }, 
                    "2": {
                        "companyName": "SpilledMilk LLC",
                        "name": "Devious Chef", "description": "Cook who knows has mastered all 27 arts of poison and cookies", 
                        "skills": ["3"], "hasApplied": false
                    }, 
                    "3": {
                        "companyName": "PandaCorp Inc",
                        "name": "Software Engineer", "description": "Work in a development enviornment", 
                        "skills": ["1", "2"], "hasApplied": false
                    }
                };
//The id of the currently selected listing
let currentListing = null;
//Takes listings saved in dictionary and presents them on startup
function initListings(){
    //Get listings from server
    listings = queryData("listings");
    for(let key in listings)
        //Add listing to page as a tile
        addTile(key, listings[key].name, 'listingsList', listingClick, listings[key].companyName);
}
//Load a listing onto the page to show current applicants
function loadListing(listingId){
    //Set title and description
    document.getElementById("listingCompanyName").innerHTML = listings[listingId].companyName;
    document.getElementById("listingTitle").innerHTML = listings[listingId].name;
    document.getElementById("listingDescription").innerHTML = listings[listingId].description+", applied?: "+listings[listingId].hasApplied;
    //Add skills tiles for listing
    loadSkills(listings[listingId].skills);
}
//Loads all skills from the given list onto the page as tiles
function loadSkills(skillList){
    //Empty list
    document.getElementById("itemList").innerHTML = "";
    //Add tile for every skill in the list
    for(let i=0; i<skillList.length; i++)
        addTile(skillList[i], skills[skillList[i]].name, "itemList", function(){}, null);
}
//Adds a tile to the page based on the input text and the given parent list id element
function addTile(id, name, parentId, onTileClick, companyName){
    //Create a new list element
    let tile = document.createElement("LI");
    tile.className = "w3-blue";
    //Add text to the list element
    if(companyName != null){
        tile.innerHTML = "<p>" + companyName + "</p>"
    }
    tile.innerHTML += "<p>"+name+"</p>";
    tile.id = "tile"+id;
    //Give onclick functionality
    tile.onclick = onTileClick;
    //Add to parent list
    document.getElementById(parentId).appendChild(tile);
}
//Gets data from the server and loads it to the apropriate data structure
function queryData(dataType){
    if(dataType === "listings")
        return listings;
}
//Writes data from the page to the server
function writeData(){
    //Write dictionary to database
}
//Update server with application to a job
function applyToListing(){
    listings[currentListing].hasApplied = true;
    writeData();
}
//Click function for list items
function listingClick(){
    //Update current listing
    currentListing = this.id.substring(4);
    currentView = 0;
    //Load current listing for editing
    loadListing(currentListing);
    //Show the editing panel
    document.getElementById("listingInfo").style.visibility = "visible";
}
//Input update listener for listing descriptions
document.getElementById("listingDescription").addEventListener("input", function (e) {
    //Update listings data structure with new description
    listings[currentListing].description = document.getElementById("listingDescription").value;
});
//Initalize Listingss
initListings();