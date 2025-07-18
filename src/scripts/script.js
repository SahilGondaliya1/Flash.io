

const state = {
   cardsets:[]
}

/*event binders*/

///render new card-deck input window
const createSetButton = document.querySelector('#nav__set-create-button');
createSetButton.addEventListener("click", () =>{
   if(!document.querySelector('.input-window'))
   {
      renderCardDeckInput();
   }
});

///new card detail input window
document.querySelector(".dashboard__card-grid").addEventListener('click', (e) => {
   if(e.target.classList.contains('card-deck__create-button')){ 
      const deckId =  e.target.closest('.card-deck').id; 
      console.log(deckId) ;
       renderCardInput(deckId);
   }  
})







/*cloning templates*/

   ///card deck input window
const cloneDeckinputWindow=  ()=>{
   const template = document.querySelector('.template__input__card-deck');
   const inputWindow = template.content.cloneNode(true);
   return inputWindow;
}

   ///card deck;
const cloneDeck = ()=>{
   const template = document.querySelector('.template__card-deck');
   const cardDeck = template.content.cloneNode(true);
   return cardDeck;
}  
   
   ///card input window
const cloneCardInputWindow = () => {
   const template = document.querySelector('.template__input__card');
   const inputWindow = template.content.cloneNode(true);
   return inputWindow;
}

   ////card clone
const cloneCard = () => {
   const template = document.querySelector('.template__card');
   const card = template.content.cloneNode(true);
   return card;
}




/* redering components */

   ///render card-desk input-window
const renderCardDeckInput = () => {
   const clone = cloneDeckinputWindow();
   document.body.appendChild(clone);
   const inputWindow = document.body.querySelector('.input-window');
   ////add card-deck
   inputWindow.querySelector('#input__card-deck__create-button').addEventListener('click', ()=>{
      const deckID = `cs-${Date.now()}`;
      console.log(deckID)
      let deckTitle = inputWindow.querySelector('#input__card-deck__title').value;
      deckTitle = deckTitle.trim();
      if(deckTitle){
         const cardset = {
            id:deckID,
            title:deckTitle,
            cards:[]
         }
         state.cardsets.push(cardset)
         renderCardDeck(cardset);
         document.querySelector('.input-window').remove();
      }
   });
   /////
}

   ///render card input window
const renderCardInput = (deckID) => {
   const clone = cloneCardInputWindow();
   let inputWindow = clone.querySelector('.input-window');
   document.body.appendChild(inputWindow);
   ////add card
   inputWindow = document.querySelector('.input-window');
   inputWindow.querySelector('#input__card__create-button').addEventListener('click',()=>{
      const cardID = `c-${Date.now()}`;
      let cardTitle = inputWindow.querySelector('#input__card__title').value;
      let cardDesc = inputWindow.querySelector('#input__card__description').value;
      cardTitle = cardTitle.trim();
      cardDesc = cardDesc.trim();
      if(cardTitle && cardDesc){
         const card = {
            id:cardID,
            title:cardTitle,
            description:cardDesc,
         }
         const cardDeck = state.cardsets.find(cs => cs.id === deckID);
         if(cardDeck) {
            cardDeck.cards.push(card);
         }
         renderCard(deckID, card);
         document.querySelector('.input-window').remove();
         // Optionally, you can re-render the cardset here if you want to show the new card immediately
      }
   });
}




   ///render card-deck
const renderCardDeck = (cardset) => {
   const clone = cloneDeck();
   const cardDeck = clone.querySelector('.card-deck');
   const title = cardset.title;
   cardDeck.querySelector('.card-deck__title').innerHTML = title;
   cardDeck.id = cardset.id
   // Start closed (no .open class)
   // Add click event to title to toggle drawer
   cardDeck.querySelector('.card-deck__title').addEventListener('click', () => {
      cardDeck.classList.toggle('open');
   });
   const dashboard = document.querySelector('.dashboard__card-grid');
   dashboard.appendChild(cardDeck);
}

const renderCard = (deckID,cardObj) => {
   const clone = cloneCard();
   const card = clone.querySelector('.card');
   card.id = cardObj.id;
   card.querySelector('.card__title').textContent= cardObj.title;
   card.querySelector('.card__description').textContent = cardObj.description;
   const deck = document.querySelector(`#${deckID}`);
   const cardList = deck.querySelector('.card-list');
   cardList.appendChild(card);
   // Ensure the drawer is open when a card is added
   deck.classList.add('open');
}

   



