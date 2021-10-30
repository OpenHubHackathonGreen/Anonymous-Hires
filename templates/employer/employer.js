//Hard-coded list of skills to choose from (will be pulled from server dynamically)
const skills = {"0":{ "name": "Python"}, "1":{ "name": "Web"}, "2":{ "name": "Java"}, "3":{ "name": "Evil buisness"}, "4":{ "name": "Cleaning"}, "5":{ "name": "Manical Laughing"}, "6":{ "name": "Cat Stroking"}, "7":{ "name": "Cooking"}, "8":{ "name": "Art"}};
//Hard-coded list of listings a company has already made (will be pulled from server dynamically)
let listings = {
                    "0": {"name": "DevOps", "description": "Develop software in an agile enviornment", 
                        "skills": ["0", "2"],
                        "applicants": [{"id": "0", "skills": ["1"]}]
                    }, 
                    "1": {"name": "Evil Logistics", "description": "Concoct only the most nefarious of supply chains", 
                        "skills": ["1"],
                        "applicants": []
                    }, 
                    "2": {"name": "Devious Chef", "description": "Cook who knows has mastered all 27 arts of poison and cookies", 
                        "skills": ["3"],
                        "applicants": []
                    }, 
                    "3": {"name": "Software Engineer", "description": "Work in a development enviornment", 
                        "skills": ["1", "2"],
                        "applicants": []
                    }
                };
//The name of the currently selected listing
let currentListing = null;
//Weather the center of the screen shows  job applicants or editing for a listing
//0: applicants
//1: editing
let currentView = 0;
//Takes listings saved in dictionary and presents them on startup
function initListings(){
    //Get listings from server
    listings = queryData("listings");
    for(let key in listings)
        //Add listing to page as a tile
        addTile(key, listings[key].name, 'listingsList', listingClick);
}
//Toggles between editing and applicants view
function contextSwitch(){
    //Set update vide flag and show view
    if(currentView == 0){
        currentView = 1;
        editListing(currentListing);
    }
    else{
        currentView = 0;
        loadListing(currentListing);
    }
}
//Load a listing onto the page to show current applicants
function loadListing(listingId){
    //Set title and description
    document.getElementById("listingTitle").innerHTML = listings[listingId].name;
    document.getElementById("listingDescription").value = listings[listingId].description;
    document.getElementById("searchDiv").style.visibility = "hidden";
    //Add skills tiles for listing
    loadApplicants(listings[listingId].applicants);
}
//Load a listing onto the page to be edited
function editListing(listingId){
    //Set title and description
    document.getElementById("listingTitle").innerHTML = listings[listingId].name;
    document.getElementById("listingDescription").value = listings[listingId].description;
    document.getElementById("searchDiv").style.visibility = "visible";
    //Add skills tiles for listing
    loadSkills(listings[listingId].skills);
}
//Loads all applicants who quailify for the job
function loadApplicants(applicantList){
    //Empty list
    document.getElementById("itemList").innerHTML = "";
    //Add tile for every applicant in the list
    for(let i=0; i<applicantList.length; i++)
        addTile(applicantList[i].id, ""+applicantList[i].skills, "itemList", function(){}, true);
}
//Loads all skills from the given list onto the page as tiles
function loadSkills(skillList){
    //Empty list
    document.getElementById("itemList").innerHTML = "";
    //Add tile for every skill in the list
    for(let i=0; i<skillList.length; i++)
        addTile(skillList[i], skills[skillList[i]].name, "itemList", function(){}, true);
}
//Returns a list of skill ids that match the given search string
function searchSkill(search){
    let searchList = [];
    for(let id in skills)
        //If the current skill includes the search string
        if(skills[id].name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && search !== "")
            //Add to list
            searchList.push(id);
    return searchList;
}
//Add a new listing to the page and update the list
function addListing(){
    //The name of the new listing
    let listingName = document.getElementById("newListingName").value;
    //Tests to determine of name if value
    if(listingName === "") return;
    let newId = "";
    for(id in listings)
        if(listings[id].name.toLocaleLowerCase() === listingName.toLocaleLowerCase()) return;
    
    //Add blank listing
    listings[newId] = {"name": listingName,"description": "", "skills": [], "applicants": []};
    //Add tile using input from input element
    addTileByInput(newId, 'newListingName', 'listingsList', true, listingClick)
}
//Add a new skill to the current listing
function addSkill(){
    //The name of the new skill
    let skillName = document.getElementById("newSkillName").value;
    //Check if name is valid
    if(skillName === "") return;
    //The id of the skill being added
    let skillId = "";
    let found = false;
    //Check if entered skill is valid
    for(id in skills)
        if(skills[id].name.toLocaleLowerCase() === skillName.toLocaleLowerCase()){
            found = true;
            skillId = id;
        }
    //Return of the skill is not in the predefined list
    if(!found) return;
    if(listings[currentListing].skills.includes(skillId)) return;
    //Add skill to the listing
    listings[currentListing].skills.push(skillId);
    //Add tile to page using input from element
    addTileByInput(skillId, 'newSkillName', 'itemList', true, function(){}, true);
}
//Removes a skill from a listing
function removeItem(id){
    //Remove an applicant
    if(currentView === 0){
        for(let i=0; i<listings[currentListing].applicants.length; i++)
            if(listings[currentListing].applicants[i]["id"] == id)
                //Remove applicant from list
                listings[currentListing].applicants.splice(id, 1);
    }
    //Remove a skill
    else{
        let index = listings[currentListing].skills.indexOf(id);
        if(index < 0) return;
        //Remove skill from list
        listings[currentListing].skills.splice(index, 1);
    }
    //Remove skill tile from the page
    let itemTiles = document.getElementById("itemList");
    for(let child in itemTiles.children)
        //If the id matches the name
        if(itemTiles.children[child] !== undefined && itemTiles.children[child].id == "tile"+id)
            itemTiles.removeChild(itemTiles.children[child]);
}
//Adds a tile to the page based on the input of the given element id to the given parent list id element
function addTileByInput(id, inputId, parentId, clearInput, onTileClick, canRemove){
    //Call add tile
    addTile(id, document.getElementById(inputId).value, parentId, onTileClick, canRemove);
    //clear the input of the input element
    if(clearInput){
        document.getElementById(inputId).value = "";
        //Refresh the search bar if that is the input
        const event = new CustomEvent('input', { "detail": "" });
        document.getElementById(inputId).dispatchEvent(event);
    }
}
//Adds a tile to the page based on the input text and the given parent list id element
function addTile(id, name, parentId, onTileClick, canRemove){
    //Create a new list element
    let tile = document.createElement("LI");
    tile.className = "w3-blue";
    //Add text to the list element
    tile.innerHTML = "<p>"+name+"</p>";
    tile.id = "tile"+id;
    //If the tile can be removed
    if(canRemove){
        //Add a remove button to the tile
        let button = document.createElement("BUTTON");
        button.className = "w3-button";
        button.innerText = "[Remove]";
        button.onclick = function(){removeItem(id)};
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
    currentListing = this.id.substring(4);
    currentView = 0;
    //Load current listing for editing
    loadListing(currentListing);
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
        addTile(skillTiles[i], skills[skillTiles[i]].name, "searchList", function(){
            //Set the input as the name of this suggestion
            document.getElementById("newSkillName").value = skills[skillTiles[i]].name;
        });
});
//Input update listener for listing descriptions
document.getElementById("listingDescription").addEventListener("input", function (e) {
    //Update listings data structure with new description
    listings[currentListing].description = document.getElementById("listingDescription").value;
});
//Initalize Listingss
initListings();