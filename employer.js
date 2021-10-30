//Hard-coded list of skills to choose from (will be pulled from server dynamically)
const skills = ["Python", "Web", "Java", "Evil buisness", "Cleaning", "Manical Laughing", "Cat Stroking", "Cooking", "Art"];
//Hard-coded list of listings a company has already made (will be pulled from server dynamically)
let listings = {
                    "DevOps": {"description": "Develop software in an agile enviornment", 
                        "skills": ["Python", "Java"]
                    }, 
                    "Evil Logistics": {"description": "Concoct only the most nefarious of supply chains", 
                        "skills": ["Web"]
                    }, 
                    "Devious Chef": {"description": "Cook who knows has mastered all 27 arts of poison and cookies", 
                        "skills": ["Evil buisness"]
                    }, 
                    "Software Engineer": {"description": "Work in a development enviornment", 
                        "skills": ["Web", "Java"]
                    }
                };
//The name of the currently selected listing
let currentListing = null;
//Takes listings saved in dictionary and presents them on startup
function initListings(){
    //Get listings from server
    listings = queryData("listings");
    for(let key in listings)
        //Add listing to page as a tile
        addTile(key, 'listingsList', listingClick);
}
//Load a listing onto the page to be edited
function loadListing(title, data){
    //Set title and description
    document.getElementById("listingTitle").innerHTML = title;
    document.getElementById("listingDescription").value = data.description;
    //Add skills tiles for listing
    loadSkills(listings[title].skills);
}
//Loads all skills from the given list onto the page as tiles
function loadSkills(skillList){
    //Empty list
    document.getElementById("skillsList").innerHTML = "";
    //Add tile for every skill in the list
    for(let i=0; i<skillList.length; i++)
        addTile(skillList[i], "skillsList", function(){}, true);
}
//Returns a list of skills that match the given search string
function searchSkill(search){
    let searchList = [];
    for(let i=0; i<skills.length; i++)
        //If the current skill includes the search string
        if(skills[i].toLocaleLowerCase().includes(search.toLocaleLowerCase()) && search !== "")
            //Add to list
            searchList.push(skills[i]);
    return searchList;
}
//Add a new listing to the page and update the list
function addListing(){
    //The name of the new listing
    let listingName = document.getElementById("newListingName").value;
    //Tests to determine of name if value
    if(listingName === "") return;
    if(listingName in listingName) return;
    //Add blank listing
    listings[listingName] = {"description": "", "skills": []};
    //Add tile using input from input element
    addTileByInput('newListingName', 'listingsList', true, listingClick)
}
//Add a new skill to the current listing
function addSkill(){
    //The name of the new skill
    let skillName = document.getElementById("newSkillName").value;
    //Check if name is valid
    if(skillName === "") return;
    if(listings[currentListing].skills.includes(skillName)) return;
    if(!skills.includes(skillName)) return;
    //Add skill to the listing
    listings[currentListing].skills.push(skillName);
    //Add tile to page using input from element
    addTileByInput('newSkillName', 'skillsList', true, function(){}, true);
}
//Removes a skill from a listing
function removeSkill(skillName){
    //The index of the skill in the listing's list
    const index = listings[currentListing].skills.indexOf(skillName);
    if (index > -1) {
        //Remove the skill from the list
        listings[currentListing].skills.splice(index, 1);
    }
    //Remove skill tile from the page
    let skillTiles = document.getElementById("skillsList");
    for(let child in skillTiles.children)
        //If the id matches the name
        if(skillTiles.children[child] !== undefined && skillTiles.children[child].id == skillName+"Tile")
            skillTiles.removeChild(skillTiles.children[child]);
}
//Adds a tile to the page based on the input of the given element id to the given parent list id element
function addTileByInput(inputId, parentId, clearInput, onTileClick, canRemove){
    //Call add tile
    addTile(document.getElementById(inputId).value, parentId, onTileClick, canRemove);
    //clear the input of the input element
    if(clearInput){
        document.getElementById(inputId).value = "";
        //Refresh the search bar if that is the input
        const event = new CustomEvent('input', { "detail": "" });
        document.getElementById(inputId).dispatchEvent(event);
    }
}
//Adds a tile to the page based on the input text and the given parent list id element
function addTile(inputText, parentId, onTileClick, canRemove){
    //Create a new list element
    let tile = document.createElement("LI");
    tile.className = "w3-blue";
    //Add text to the list element
    tile.innerHTML = "<p>"+inputText+"</p>";
    tile.id = inputText+"Tile";
    //If the tile can be removed
    if(canRemove){
        //Add a remove button to the tile
        let button = document.createElement("BUTTON");
        button.className = "w3-button";
        button.innerText = "[Remove]";
        button.onclick = function(){removeSkill(inputText)};
        tile.appendChild(button);
    }
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
//Click function for list items
function listingClick(){
    //Update current listing
    currentListing = this.id.substring(0, this.id.lastIndexOf("Tile"));
    //Load current listing for editing
    loadListing(currentListing, listings[currentListing]);
    //Show the editing panel
    document.getElementById("listingInfo").style.visibility = "visible";
}
//Input update listener for new skills
document.getElementById("newSkillName").addEventListener("input", function (e) {
    //Gets list of skills that satusfy the inputed text
    let skillTiles = searchSkill(document.getElementById("newSkillName").value);
    //Clear suggestions
    document.getElementById("searchList").innerHTML = "";
    for(let i=0; i<skillTiles.length; i++)
        //Add tile for skill suggstion
        addTile(skillTiles[i], "searchList", function(){
            //Set the input as the name of this suggestion
            document.getElementById("newSkillName").value = skillTiles[i];
        });
});
//Input update listener for listing descriptions
document.getElementById("listingDescription").addEventListener("input", function (e) {
    //Update listings data structure with new description
    listings[currentListing].description = document.getElementById("listingDescription").value;
});
//Initalize Listingss
initListings();