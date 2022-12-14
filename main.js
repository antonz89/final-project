//---div1
let form =document.querySelector('form');
let button = document.querySelector('button');
let items = document.getElementsByName('item_id')[0];
let colors = document.getElementsByName('color_id')[0];
    //----- price
let price = document.querySelector("#priceInput");
    //----- image
let imgItem = document.querySelector("#result");
//-------- div 2 
let div2 = document.querySelector("#id2");
let carousel = document.querySelector(".carousel");
let carouselInner = document.querySelector(".carousel-inner");
let allInventory = document.querySelectorAll(".carousel-inner .carousel-item");
//-------------- div3 list items
let listInventory = document.querySelector(".listInventory");
let allItemsList = document.querySelectorAll(".listInventory .listItems");
          //------ div 3 remove button
let removeButton = document.querySelector("#removeButton");
          //---- div 3 inputRemove
let inputRemove = document.querySelector("#removeNumber");
//--------div 4 ---------------------
let apiButton = document.querySelector("#getAPI");
let searchItem = document.querySelector("#searchItem");
let searchColor = document.querySelector("#searchColor");
//--------row 2 ---------------------
let row2Div = document.querySelector("#row2")

//----------- for dropdowns in ADD ITEMS---------
items.addEventListener("select", itemSelection);
colors.addEventListener("select", colorSelection);
// ---------GLobal Variables----------------
let value1;
let value2;
let imgSrc;
let imgName;

//--stores items added manually or added from Target search after span("+") click
let obj = {
    items:[]
};

//----- stores filtered items after target search, needs for creation of Cards 
let onlineInfo = {
  items:[]
}


//--- need for removal of all cards after 2nd and more api calls
let myDivCards = []

//---- adding an image-----------
document.querySelector("#files").addEventListener("change",(e)=>{
  let files = e.target.files;

  for(let i = 0;i<files.length;i++){
      if(!files[i].type.match("image"))continue;
      
      let picReader = new FileReader();
      
      picReader.addEventListener("load", function(event){
        let picFile = event.target;        
        imgItem.src = picFile.result;
        imgSrc = picFile.result;
        imgName = files.name;
      })
      picReader.readAsDataURL(files[i]);
  }
})
//--------submiting an item
form.addEventListener('submit',function(event){
  event.preventDefault();
    itemSelection();
    colorSelection(); 
    
  let itm = {
        item:value1,
        color:value2,
        price:priceInput.value,
        imgSource:imgSrc
    }

    if(value1==="Select An Item"){
      alert("Please Select Correct Item");
    } else if (value2 ==="Select Color"){     
      alert("Please Select Correct Color");      
    } else if (priceInput.value ===""){     
      alert("Please Enter Correct Price");      
    } else {
      obj.items.push(itm);
      items.selectedIndex = "";
      colors.selectedIndex = "";
      priceInput.value = ""; 
      imgItem.src = "";     
    }

    console.log("Object holds added items(carousel and ol after add manualy");
    console.log(obj);
    //-- adding items to my inventory div 2 
    addToCarousel();
    addToOl();
})
//--------removing an item
removeButton.addEventListener('click', function(){
  
    if (allInventory[inputRemove.value-1].className === "carousel-item active"){
    allInventory[0].className = "carousel-item active";
    allInventory[inputRemove.value-1].className = "carousel-item";
  }

  allInventory[inputRemove.value-1].remove();
  allItemsList[inputRemove.value-1].remove();
  obj.items.splice(inputRemove.value-1,1);
  
  allItemsList = document.querySelectorAll(".listInventory .listItems");
  allInventory = document.querySelectorAll(".carousel-inner .carousel-item");

  // console.log(allInventory);
  // console.log(allItemsList);
  console.log("Object holds added items(carousel and ol after remove manualy ");
  console.log(obj);
  inputRemove.value = "";
})
//--------API CALL and updating cards----------------
apiButton.addEventListener('click', async (e) => {
  //---- removes all previous cards from row 2, needs if you will make second api call----------
  while(myDivCards.length>0){
    myDivCards[0].remove();
    myDivCards = document.querySelectorAll("#row2 #divID")
  }
  
  e.preventDefault();
  console.log("api call before fetch")

  let url = `https://api.redcircleapi.com/request?api_key=D20DD632DC4F405E9A30F44BCDF2D3AA&type=search&search_term=${searchItem.value}${searchColor.value}&sort_by=best_seller`;
  let response = await fetch (url);
  let data = await response.json();
  console.log(data.search_results); 
  console.log("api call after fetch")
  //------ test 
  onlineInfo = {
    items:[]
  }
  console.log("online info bellow supose to be empty")
  console.log(onlineInfo);
  
  //-------- filter for men 
  for(let i = 0; i<data.search_results.length; i++){
    if (data.search_results[i].product.title.search("Men")!=-1){
        let onlineItems = {
          img:data.search_results[i].product.main_image,
          para:data.search_results[i].product.feature_bullets[0],
          link:data.search_results[i].product.link,
          price:data.search_results[i].offers.primary.price
        }
        onlineInfo.items.push(onlineItems)      
    }     
  }
  
  console.log(onlineInfo)
  console.log("onlineInfo")
 
  //----- creating cards based on how many items collected after filter , limiting my app to five cards maximum
  if(onlineInfo.items.length === 1){
    card0Create();
  } else if (onlineInfo.items.length === 2){
    card0Create();
    card1Create();    
  } else if (onlineInfo.items.length === 3){
    card0Create();
    card1Create();  
    card2Create();  
  } else if (onlineInfo.items.length === 4){
    card0Create();
    card1Create();  
    card2Create(); 
    card3Create();
  } else if (onlineInfo.items.length >= 5){
    card0Create();
    card1Create();  
    card2Create(); 
    card3Create();
    card4Create();
  }

})


//---functions to create cards----------

function card0Create(){
  let div5 = document.createElement("div")
  div5.id = "divID"
  div5.className = "col-2"

  let card0 = document.createElement("div");
  card0.id = "card"
  card0.className = "card"
  div5.appendChild(card0)

  let apiIMG0 = document.createElement("img");
  apiIMG0.className = "card-img-top w-100"
  apiIMG0.id = "apiIMG0"
  card0.appendChild(apiIMG0)

  let divCB0 = document.createElement("div");
  divCB0.className = "card-body"
  card0.appendChild(divCB0)

  let apiPara0 = document.createElement("p");
  apiPara0.id="apiP0"
  apiPara0.className = "card-text"
  divCB0.appendChild(apiPara0)

  let link0 = document.createElement("a");
  link0.id = "link0" 
  link0.href = "#"
  link0.className = "btn btn-primary"
  link0.target = "_blank"
  link0.innerText = "View Online"
  divCB0.appendChild(link0)

  let span0 = document.createElement("span");
  span0.innerText = "+"
  span0.id="span0"
  span0.className = "span"
  divCB0.appendChild(span0)

  apiIMG0.src = onlineInfo.items[0].img
    apiPara0.innerText = onlineInfo.items[0].para
    link0.href = onlineInfo.items[0].link
    row2Div.appendChild(div5)

    
    myDivCards = document.querySelectorAll("#row2 #divID")
    console.log("mydivcards after second search probably will have 2")
    console.log(myDivCards);

    span0.addEventListener("click", function(){
    span0Click()
    console.log("span0, goes after onlineinfo")
        // console.log(obj);
        // console.log(itm);
    addToOl();
    addToCarousel();
      })
}
function card1Create(){
      let div6 = document.createElement("div")
    div6.id = "divID"
    div6.className = "col-2"
    
    let card1 = document.createElement("div");
    card1.id = "card"
    card1.className = "card"
    div6.appendChild(card1)

    let apiIMG1 = document.createElement("img");
    apiIMG1.className = "card-img-top w-100"
    apiIMG1.id = "apiIMG0"
    card1.appendChild(apiIMG1)

    let divCB1 = document.createElement("div");
    divCB1.className = "card-body"
    card1.appendChild(divCB1)

    let apiPara1 = document.createElement("p");
    apiPara1.id="apiP0"
    apiPara1.className = "card-text"
    divCB1.appendChild(apiPara1)

    let link1 = document.createElement("a");
    link1.id = "link0" 
    link1.href = "#"
    link1.className = "btn btn-primary"
    link1.target = "_blank"
    link1.innerText = "View Online"
    divCB1.appendChild(link1)

    let span1 = document.createElement("span");
    span1.innerText = "+"
    span1.id="span0"
    span1.className = "span"
    divCB1.appendChild(span1)

      apiIMG1.src = onlineInfo.items[1].img
      apiPara1.innerText = onlineInfo.items[1].para
      link1.href = onlineInfo.items[1].link
      row2Div.appendChild(div6)

      myDivCards = document.querySelectorAll("#row2 #divID")
    console.log("mydivcards after second search probably will have 2")
    console.log(myDivCards);


      span1.addEventListener("click", function(){
        span1Click();
        console.log("span1, goes after onlineinfo")
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
    })

   
  
} 
function card2Create(){
  let div7 = document.createElement("div")
div7.id = "divID"
div7.className = "col-2"

let card2 = document.createElement("div");
card2.id = "card"
card2.className = "card"
div7.appendChild(card2)

let apiIMG2 = document.createElement("img");
apiIMG2.className = "card-img-top w-100"
apiIMG2.id = "apiIMG0"
card2.appendChild(apiIMG2)

let divCB2 = document.createElement("div");
divCB2.className = "card-body"
card2.appendChild(divCB2)

let apiPara2 = document.createElement("p");
apiPara2.id="apiP0"
apiPara2.className = "card-text"
divCB2.appendChild(apiPara2)

let link2 = document.createElement("a");
link2.id = "link0" 
link2.href = "#"
link2.className = "btn btn-primary"
link2.target = "_blank"
link2.innerText = "View Online"
divCB2.appendChild(link2)

let span2 = document.createElement("span");
span2.innerText = "+"
span2.id="span0"
span2.className = "span"
divCB2.appendChild(span2)

  apiIMG2.src = onlineInfo.items[2].img
  apiPara2.innerText = onlineInfo.items[2].para
  link2.href = onlineInfo.items[2].link
  row2Div.appendChild(div7)

  myDivCards = document.querySelectorAll("#row2 #divID")
    console.log("mydivcards after second search probably will have 2")
    console.log(myDivCards);


  span2.addEventListener("click", function(){
    span2Click();
    // console.log(obj);
    // console.log(itm);
    addToOl();
    addToCarousel();
})



} 
function card3Create(){
  let div8 = document.createElement("div")
div8.id = "divID"
div8.className = "col-2"

let card3 = document.createElement("div");
card3.id = "card"
card3.className = "card"
div8.appendChild(card3)

let apiIMG3 = document.createElement("img");
apiIMG3.className = "card-img-top w-100"
apiIMG3.id = "apiIMG0"
card3.appendChild(apiIMG3)

let divCB3 = document.createElement("div");
divCB3.className = "card-body"
card3.appendChild(divCB3)

let apiPara3 = document.createElement("p");
apiPara3.id="apiP0"
apiPara3.className = "card-text"
divCB3.appendChild(apiPara3)

let link3 = document.createElement("a");
link3.id = "link0" 
link3.href = "#"
link3.className = "btn btn-primary"
link3.target = "_blank"
link3.innerText = "View Online"
divCB3.appendChild(link3)

let span3 = document.createElement("span");
span3.innerText = "+"
span3.id="span0"
span3.className = "span"
divCB3.appendChild(span3)

  apiIMG3.src = onlineInfo.items[3].img
  apiPara3.innerText = onlineInfo.items[3].para
  link3.href = onlineInfo.items[3].link
  row2Div.appendChild(div8)

  myDivCards = document.querySelectorAll("#row2 #divID")
    console.log("mydivcards after second search probably will have 2")
    console.log(myDivCards);


  span3.addEventListener("click", function(){
    span3Click();
    // console.log(obj);
    // console.log(itm);
    addToOl();
    addToCarousel();
})



}
function card4Create(){
  let div9 = document.createElement("div")
div9.id = "divID"
div9.className = "col-2"

let card4 = document.createElement("div");
card4.id = "card"
card4.className = "card"
div9.appendChild(card4)

let apiIMG4 = document.createElement("img");
apiIMG4.className = "card-img-top w-100"
apiIMG4.id = "apiIMG0"
card4.appendChild(apiIMG4)

let divCB4 = document.createElement("div");
divCB4.className = "card-body"
card4.appendChild(divCB4)

let apiPara4 = document.createElement("p");
apiPara4.id="apiP0"
apiPara4.className = "card-text"
divCB4.appendChild(apiPara4)

let link4 = document.createElement("a");
link4.id = "link0" 
link4.href = "#"
link4.className = "btn btn-primary"
link4.target = "_blank"
link4.innerText = "View Online"
divCB4.appendChild(link4)

let span4 = document.createElement("span");
span4.innerText = "+"
span4.id="span0"
span4.className = "span"
divCB4.appendChild(span4)

  apiIMG4.src = onlineInfo.items[4].img
  apiPara4.innerText = onlineInfo.items[4].para
  link4.href = onlineInfo.items[4].link
  row2Div.appendChild(div9)

  myDivCards = document.querySelectorAll("#row2 #divID")
    console.log("mydivcards after second search probably will have 2")
    console.log(myDivCards);


  span4.addEventListener("click", function(){
    span4Click();
    // console.log(obj);
    // console.log(itm);
    addToOl();
    addToCarousel();
})



}

//------- click span + (adding to my inventory and list view) functions
function span0Click(){
  let itmz = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[0].price.toString(),
    imgSource:onlineInfo.items[0].img
  }
  console.log("itemz after click +");
  // console.log(itmz);
  obj.items.push(itmz);
  console.log("span, needs to go after itemz")

}

function span1Click(){
  let itmz = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[1].price.toString(),
    imgSource:onlineInfo.items[1].img
  }
  console.log("itemz after click +");
  console.log(itmz);
  obj.items.push(itmz);
  console.log("span1, goes after itemz")


}

function span2Click(){
  let itmz = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[2].price.toString(),
    imgSource:onlineInfo.items[2].img
  }
  console.log("itemz after click +");
  // console.log(itmz);
  obj.items.push(itmz);
  console.log("span2, goes after itemz")


}

function span3Click(){
  let itmz = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[3].price.toString(),
    imgSource:onlineInfo.items[3].img
  }
  console.log("itemz after click +");
  // console.log(itmz);
  obj.items.push(itmz);
  console.log("span3, goes after itemz")

}

function span4Click(){
  let itmz = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[4].price.toString(),
    imgSource:onlineInfo.items[4].img
  }
  console.log("itemz after click +");
  // console.log(itmz);
  obj.items.push(itmz);
  console.log("span4, goes after itemz")


}

// -------- FUNCTIONS adding to OL and Carousle ------------------
function addToOl(){
  let li = document.createElement("li");
      li.className = "listItems";
      listInventory.appendChild(li);
      li.innerText = `${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`;
    
  allItemsList = document.querySelectorAll(".listInventory .listItems");
 
  // console.log(obj)
  // console.log(allInventory);
  // console.log(allItemsList);
  for (let i = 0; i<allInventory.length; i++){
    allItemsList[i].id = `id${i}`
  }
}
function addToCarousel(){
  let carouselItem = document.createElement("div");
  carouselItem.className = "carousel-item active";
  carouselInner.appendChild(carouselItem);

  let carouselImg = document.createElement("img");
  carouselImg.className = "d-block w-100";
  carouselImg.src = obj.items[obj.items.length-1].imgSource;
  carouselItem.appendChild(carouselImg);

  let carouselInfo = document.createElement("p");
  carouselInfo.id = "para";
  carouselItem.appendChild(carouselInfo);
  carouselItem.style.backgroundColor = "white"
  carouselInfo.innerText = `${obj.items.length}. ${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`

  // changng class name <active>
  allInventory = document.querySelectorAll(".carousel-inner .carousel-item");

    if(allInventory.length>=2){
      for( let i = 0; i<allInventory.length-1;i++){
        allInventory[i].className = "carousel-item"; 
      }
    }
    // console.log(obj)
}

// ----------Functions for dropdowns(storing values into obj)
function itemSelection(){
  let value = items.options[items.selectedIndex].value;
  value1 = value;
};
function colorSelection(){
    let value = colors.options[colors.selectedIndex].value;
    value2 = value;
}



































 
                






    
// cardText.innerText = `${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`

      // cardImg.src = `${obj.items[obj.items.length-1].imgSource}`;

//---- adding items into my inventory----

    // cardText.innerText = `${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`

    // cardImg.src = obj.items[obj.items.length-1].imgSource;
    // cardImg.src = imgSrc;

      
    // console.log(obj)
    // console.log(" and here!!!!  "+ cardImg.src)

      
    
    //---- adding items into my inventory----
    

// let ol = document.createElement('ol');
// div2.appendChild(ol);
// while (i<obj.items.length){
      

    //   let li = document.createElement("li");
    //   li.innerText = `${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`
    //   ol.appendChild(li);

    // i++;
    // }


//--------card inside inventory

// let card = document.createElement("div");
// card.className = "card";
// div2.appendChild(card);


// let cardBody = document.createElement("div");
// card.className = "card-body";
// card.innerText
// card.appendChild(cardBody);

// let card = document.querySelector(".card");
// let cardBody = document.querySelector(".card-body");
// let cardText = document.querySelector("#cardText");
// let cardImg = document.querySelector("#result



//--------- List items div 3
// while (i<obj.items.length){
      

//   let li = document.createElement("li");
//     li.className = "xxx"
//     listInventory.appendChild(li);
//     let input = document.createElement("input");
//     input.type = "checkbox"
//     li.appendChild(input);
//     let span = document.createElement("span");
//     span.innerText = `${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`;
//     li.appendChild(span);
//     console.log(" I COUNT" + i)
//     console.log(checked.value);

//   i++;
//   }

//------------- deleting items
// let itemz = document.querySelectorAll(".listInventory li"), tab = [], liIndex;
//         //--populating tab with li data
//         for(let i = 0; i<itemz.length;i++){
//           tab.push(itemz[i].innerHTML);
//         }
//         //-- get li index using tab array
//         for(let i = 0; i<itemz.length; i++){
//           itemz[i].onclick = function(){
//             liIndex = tab.indexOf(this.innerHTML);
//             console.log(this.innerHTML + " INDEX = "+ liIndex)
//             console.log(itemz);
//           }
//         }

//         function removeLI(){
//           itemz[liIndex].parentNode.removeChild(itemz[liIndex])
//         }


///----------------- old carousel
//------carousel
// let carousel = document.querySelector("#carouselExampleDark");
// let carouselInner = document.querySelector("#carouselInner") 

// let firstCarousel = document.querySelector("#firstCarousel")

// let allItems = document.querySelectorAll(".carousel-inner .carousel-item")
// let allItemsClassList;

// let item1 = document.querySelector("#item1");



// if(obj.items.length>0){
        

  //   let carouselItem = document.createElement("div")
  //   carouselItem.className = "carousel-item active"
  //   carouselInner.appendChild(carouselItem)

  //   let carouselImg = document.createElement("img")
  //   carouselImg.className = "img-thumbnail"
  //   // carouselImg.className = "d-block w-100"
    
  //   carouselItem.appendChild(carouselImg)
  //   carouselImg.src = obj.items[obj.items.length-1].imgSource

  //   let carouselCaption = document.createElement("div")
  //   carouselCaption.className = "carousel-caption d-none d-md-block"
  //   carouselItem.appendChild(carouselCaption)

  //   let itemInfo = document.createElement("p")
  //   itemInfo.className = "itemInfo"
  //   carouselItem.appendChild(itemInfo)
  //   itemInfo.innerText = `${obj.items.length+1}. ${obj.items[obj.items.length-1].color} ${obj.items[obj.items.length-1].item} $${obj.items[obj.items.length-1].price}`
// }
