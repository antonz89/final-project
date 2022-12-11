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
//--------div 5 ---------------------
let apiIMG0 = document.querySelector("#apiIMG0");
apiIMG0.src = "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
let apiPara0 = document.querySelector("#apiP0");
apiPara0.innerText = "Description"
let link0 = document.querySelector("#link0");

let apiIMG1 = document.querySelector("#apiIMG1");
apiIMG1.src = "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
let apiPara1 = document.querySelector("#apiP1");
apiPara1.innerText = "Description";
let link1 = document.querySelector("#link1");

let apiIMG2 = document.querySelector("#apiIMG2");
apiIMG2.src = "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
let apiPara2 = document.querySelector("#apiP2");
apiPara2.innerText = "Description"
let link2 = document.querySelector("#link2");

let apiIMG3 = document.querySelector("#apiIMG3");
apiIMG3.src = "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
let apiPara3 = document.querySelector("#apiP3");
apiPara3.innerText = "Description";
let link3 = document.querySelector("#link3");

let apiIMG4 = document.querySelector("#apiIMG4");
apiIMG4.src = "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
let apiPara4 = document.querySelector("#apiP4");
apiPara4.innerText = "Description"
let link4 = document.querySelector("#link4");

let span0 = document.querySelector("#span0");
let span1 = document.querySelector("#span1");
let span2 = document.querySelector("#span2");
let span3 = document.querySelector("#span3");
let span4 = document.querySelector("#span4");
//----------- for dropdowns in ADD ITEMS---------
items.addEventListener("select", itemSelection);
colors.addEventListener("select", colorSelection);
// ---------GLobal Variables----------------
let value1;
let value2;
let imgSrc;
let imgName;
let obj = {
    items:[]
};
let onlineInfo = {
  items:[]
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
    }else {
      obj.items.push(itm);
      items.selectedIndex = "";
      colors.selectedIndex = "";
      priceInput.value = ""; 
      imgItem.src = "";
     
    }
    
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
  console.log(obj);
  inputRemove.value = "";
})
//--------API CALL and updating cards----------------
apiButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let url = `https://api.redcircleapi.com/request?api_key=D20DD632DC4F405E9A30F44BCDF2D3AA&type=search&search_term=${searchItem.value}${searchColor.value}&sort_by=best_seller`;
  let response = await fetch (url);
  let data = await response.json();
  console.log(data);  
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
  //--- adding to the list view and my inventory from target cards
  if(onlineInfo.items.length === 1){
    updateCard0();
    span0.addEventListener("click", function(){
      span0Click()
          // console.log(obj);
          // console.log(itm);
      addToOl();
      addToCarousel();
    })
    
  }else if(onlineInfo.items.length === 2){
    updateCard0();
    updateCard1();
    span0.addEventListener("click", function(){
      span0Click()
       // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
    })
    span1.addEventListener("click", function(){
      span1Click();
      // console.log(obj);
      // console.log(itm);
      addToOl();
      addToCarousel();
    })
    
  } else if(onlineInfo.items.length === 3){
    updateCard0();
    updateCard1();
    updateCard2();
    span0.addEventListener("click", function(){
        span0Click()
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
    span1.addEventListener("click", function(){
        span1Click();
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
    span2.addEventListener("click", function(){
      span2Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
  } else if(onlineInfo.items.length === 4){
      updateCard0();
      updateCard1();
      updateCard2();
      updateCard3();

      span0.addEventListener("click", function(){
        span0Click()
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
      span1.addEventListener("click", function(){
        span1Click();
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
      span2.addEventListener("click", function(){
      span2Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
      span3.addEventListener("click", function(){
      span3Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
  } else if(onlineInfo.items.length === 5){
      updateCard0();
      updateCard1();
      updateCard2();
      updateCard3();
      updateCard4();

      span0.addEventListener("click", function(){
        span0Click()
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
      span1.addEventListener("click", function(){
        span1Click();
        // console.log(obj);
        // console.log(itm);
        addToOl();
        addToCarousel();
      })
      span2.addEventListener("click", function(){
      span2Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
      span3.addEventListener("click", function(){
      span3Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
      span4.addEventListener("click", function(){
      span4Click();
        // console.log(obj);
        // console.log(itm);
      addToOl();
      addToCarousel();
      })
  }
  console.log(onlineInfo);
})

// -------- FUNCTIONS------------------
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
    allInventory[i].id = `id${i}`
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
    console.log(obj)
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
//----------- functions to reset cards' Images, Description and Links(view online button) after API call
function updateCard0(){
  apiIMG0.src = onlineInfo.items[0].img
  apiPara0.innerText = onlineInfo.items[0].para
  link0.href = onlineInfo.items[0].link
}
function updateCard1(){
  apiIMG1.src = onlineInfo.items[1].img
  apiPara1.innerText = onlineInfo.items[1].para
  link1.href = onlineInfo.items[1].link 
}
function updateCard2(){
  apiIMG2.src = onlineInfo.items[2].img
  apiPara2.innerText = onlineInfo.items[2].para
  link2.href = onlineInfo.items[2].link
}
function updateCard3(){
  apiIMG3.src = onlineInfo.items[3].img
  apiPara3.innerText = onlineInfo.items[3].para
  link3.href = onlineInfo.items[3].link
}
function updateCard4(){
  apiIMG4.src = onlineInfo.items[4].img
  apiPara4.innerText = onlineInfo.items[4].para
  link4.href = onlineInfo.items[4].link
}

//------- click span + (adding to my inventory and list view) functions
function span0Click(){
  let itm = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[0].price.toString(),
    imgSource:onlineInfo.items[0].img
  }
  obj.items.push(itm);
}
function span1Click(){
  let itm = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[1].price.toString(),
    imgSource:onlineInfo.items[1].img
  }
  obj.items.push(itm);
}
function span2Click(){
  let itm = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[2].price.toString(),
    imgSource:onlineInfo.items[2].img
  }
  obj.items.push(itm);
}
function span3Click(){
  let itm = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[3].price.toString(),
    imgSource:onlineInfo.items[3].img
  }
  obj.items.push(itm);
}
function span4Click(){
  let itm = {
    item:searchItem.value,
    color:searchColor.value,
    price:onlineInfo.items[4].price.toString(),
    imgSource:onlineInfo.items[4].img
  }
  obj.items.push(itm);
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
