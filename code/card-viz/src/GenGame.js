import React, { Component } from 'react';
import './GenGame.css';
import CadrDeckImage from './images/deck.png';
import CadrCover from './images/cover.png';

class GenGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AppMode: "NoAction", // NoAction, Game, PlayerWin, AIWin
            PlayerState: "NoState", // AI1, AI2, AI3, Player
            CardsDeck: new Array(52),
            PlayerDeck: new Array(52),
            AI1Deck: new Array(52),
            AI2Deck: new Array(52),
            AI3Deck: new Array(52),
            PlayerBank: new Array(4),
            AI1Bank: new Array(4),
            AI2Bank: new Array(4),
            AI3Bank: new Array(4),
            MoveCount: 0,
            PlayerTrick: 0,
            AI1Trick: 0,
            AI2Trick: 0,
            AI3Trick: 0,
            CurrentCard: null,
        };
        this.TableCanvas = React.createRef()

        this.StartNewGame.bind(this);
        //this.DoOneMove.bind(this);
        //this.EndMove.bind(this);
        this.GetOneCardFromDeck.bind(this);
        this.AIRounds.bind(this);
        //this.componentDidUpdate.bind(this);
        //this.render.bind(this);
        //this.draw_card.bind(this);
    }

    GetOneCardFromDeck = () => {
        let rnd = Math.round(Math.random()* 52)
        if(this.state.CardsDeck[rnd] != 0) {
            this.state.CardsDeck[rnd] = 0;
            return rnd
        }
        for(let count=rnd+1; count < 52; count++) {
            if(this.state.CardsDeck[count] != 0) {
                this.state.CardsDeck[count] = 0;
                return count
            }
        }
        for(let count = rnd - 1; count >= 0; count --) {
            if(this.state.CardsDeck[count] != 0) {
                this.state.CardsDeck[count] = 0;
                return count;
            }
        }
        return -1;
    }


    MoveDeck = (deck) => {
        for(let count = 0; count < 51; count ++) {
            deck[count] = deck[count + 1];
        }
        deck[51] = null
    }

    GetCardCount = (deck) => {
        let count;
        for(count=0; count < 52; count ++) {
            if(deck[count] == null) {break};
        } return (count == 52) ? 0: count++;
    }

    StartNewGame = () => {
        for(let count = 0; count < 52; count ++) {
            this.state.CardsDeck[count] = 1;

            this.state.PlayerDeck[count] = null;
            this.state.AI1Deck[count] = null;
            this.state.AI2Deck[count] = null;
            this.state.AI3Deck[count] = null;

            this.state.PlayerBank[count] = null;
            this.state.AI1Bank[count] = null;
            this.state.AI2Bank[count] = null;
            this.state.AI3Bank[count] = null;
        }
        for(let count = 0; count < 13; count ++) {
            this.state.PlayerDeck[count] = this.GetOneCardFromDeck();
            this.state.AI1Deck[count] = this.GetOneCardFromDeck();
            this.state.AI2Deck[count] = this.GetOneCardFromDeck();
            this.state.AI3Deck[count] = this.GetOneCardFromDeck();
        }
        for(let count = 0; count < 4; count++) {
            this.state.PlayerBank[count] = this.state.PlayerDeck[count];
            this.state.AI1Bank[count] = this.state.AI1Bank[count];
            this.state.AI2Bank[count] = this.state.AI1Bank[count];
            this.state.AI3Bank[count] = this.state.AI1Bank[count];

            this.MoveDeck(this.PlayerDeck)
            this.MoveDeck(this.AI1Bank)
            this.MoveDeck(this.AI2Bank)
            this.MoveDeck(this.AI3Bank)

        }
        this.setState({PlayerState: 'Player'});
        this.setState({AppMode: 'Game'});
    }

    // AIRounds = () => {
    //     switch(this.state.PlayerState) {
    //         case 'AI1':

    //     }
    // }

    function SortBank(bank) {

        return function (o1, o2) {
            if (o1 == null && o2 == null) {
                return 0;
            }
            if (o1 == null) {
                return 1;
            }
            if (o2 == null) {
                return -1;
            }
            return o1.compareTo(o2);
      
      }

    // DoOneMove = () => {
    //     let PlayerCard = -1;
    //     let AICard = -1;
    //     let BankCardCount;
    //     let PlayerCount = 0;
    //     let AICardCount = 0;

    //     switch(this.state.MoveState) {
    //         case 'Equality':
    //             PlayerCount = this.GetCardCount(this.state.PlayerDeck);
    //             AICardCount = this.GetCardCount(this.state.AIDeck);
    //             if(PlayerCount <4) {
    //                 this.state({AppMode: 'AIWin'});
    //             } if(AICardCount <4) {
    //                 this.state({AppMode: 'PlayerWin'});
    //             }
    //             BankCardCount = this.GetCardCount(this.state.PlayerBank);
    //             for(let count = 0; count < 4; count ++) {
    //                 PlayerCard = this.state.PlayerDeck[0];
    //                 AICard = this.state.AIDeck[0];
    //                 this.MoveDeck(this.state.PlayerDeck);
    //                 this.MoveDeck(this.state.AIDeck);
    //                 this.state.PlayerBank[BankCardCount] = PlayerCard;
    //                 this.state.AIBank[BankCardCount] = AICard;
        
    //                 BankCardCount ++;
    //             }
        
    //             if((PlayerCard % 13) == (AICard % 13)) {
    //                 this.setState({MoveState: 'Equality'});
    //             } else {
    //                 this.setState({MoveState: 'EndMove'});
    //             }
    //             break;
    //         case 'EndMove':
    //             this.EndMove();
    //             this.setState({MoveState: 'NoState'});
    //             break;
    //         case 'NoState':
    //         default:
    //             PlayerCard = this.state.PlayerDeck[0];
    //             AICard = this.state.AIDeck[0];
    //             this.MoveDeck(this.state.PlayerDeck);
    //             this.MoveDeck(this.state.AIDeck);

    //             BankCardCount = this.GetCardCount(this.state.PlayerBank);
    //             console.log(BankCardCount);
    //             this.state.PlayerBank[BankCardCount] = PlayerCard;
    //             this.state[BankCardCount] = AICard;

    //             if((PlayerCard%13) == (AICard%13)) {
    //                 this.setState({MoveState:'Equality'});
    //             } else {
    //                 this.setState({MoveState: 'EndMove'});
    //             } break;
    //     }
    // }
    // EndMove = () => {
    //     let BankCardCount = this.GetCardCount(this.state.PlayerBank);
    //     let PlayerCard = this.state.PlayerBank[BankCardCount-1] %13;
    //     let AICard = this.state.AIBank[BankCardCount-1] % 13;
    //     let count;
    //     let AICardCount;
    //     let PlayerCardCount;

    //     if(PlayerCard == AICard) {
    //     } else {
    //         if(PlayerCard > AICard) {
    //             console.log('Player win!');
    //             PlayerCardCount = this.GetCardCount(this.state.PlayerDeck);
    //             for(count = 0; count < BankCardCount; count ++) {
    //                 this.state.PlayerDeck[PlayerCardCount] = this.state.PlayerBank[count];
    //                 this.state.PlayerBank[count] = null;
    //                 PlayerCardCount ++;
    //             }
    //             for(count=0; count<BankCardCount; count++) {
    //                 this.state.PlayerDeck[PlayerCardCount] = this.state.AIBank[count];
    //                 this.state.AIBank[count] = null;
    //                 PlayerCardCount++
    //             }
    //             if(AICardCount == 0) {
    //                 this.setState({AppMode: 'PlayerWin'})
    //             }
    //         } else {
    //             console.log('AI win!')
    //             AICardCount = this.GetCardCount(this.stateAIDeck);
    //             for(count=0;count<BankCardCount;count++) {
    //                 this.state.AIDeck[AICardCount] = this.state.AIBank[count];
    //                 this.state.AIBank[count] = null;
    //                 AICardCount++
    //             }
    //             for(count = 0; count < BankCardCount; count ++) {
    //                 this.state.AIDeck[AICardCount] = this.state.PlayerBank[count];
    //                 this.state.PlayerBank[count] = null;
    //                 AICardCount++
    //             }
    //             AICardCount = this.GetCardCount(this.state.PlayerDeck);
    //                 if(AICardCount == 0){
    //                 this.setState({AppMode: 'AIWin'})
    //             }
    //         }
    //     }
    // }
    // componentDidUpdate = () => {
    //     let TableCtx = this.refs.TableCanvas.getContext("2d");
    //     let count;

    //     TableCtx.fillStyle = "green";
    //     TableCtx.fillRect(0, 0, 500, 500);

    //     let CardsInDeck = Math.floor(this.GetCardCount(this.state.AIDeck)/ 13);
    //     TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 50, 30, 70, 96)

    //     CardsInDeck = Math.floor(this.GetCardCount(this.state.PlayerDeck) / 13);
    //     TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 300, 350, 70, 96);
        
    //     let CardsInBank = this.GetCardCount(this.state.PlayerBank);
    //     console.log('Cards in player bank - ' + CardsInBank);

    //     let bc_x = 300;
    //     let bc_y = 200;

    //     for(count = 0; count < CardsInBank; count++) {
    //         if(count%4 == 0) {
    //             this.draw_card(this.state.PlayerBank[count], bc_x, bc_y);
    //             this.draw_card(this.state.AIBank[count], bc_x-200, bc_y);
    //         } else {
    //             this.draw_card(-1,  bc_x, bc_y);
    //             this.draw_card(-1, bc_x - 200, bc_y);
    //         }
    //         bc_x += 16;
    //         bc_y += 16
    //     }
    // }
    
    // draw_card(CardNumber, DestinationX, DestinationY){
     
    //     let TableCtx = this.refs.TableCanvas.getContext("2d");
     
    //     if(CardNumber == -1)
    //     {
    //       TableCtx.drawImage(this.refs.CadrCover, 6, 0, 64, 96, DestinationX, DestinationY, 64, 96);
          
    //     }
    //     else{
    //       let SourceX = (CardNumber % 13) * 64;
    //       let SourceY = Math.floor(CardNumber / 13) * 96;
     
    //       TableCtx.drawImage(this.refs.CadrDeckImg, SourceX, SourceY, 64, 96, DestinationX, DestinationY, 64, 96);
    //     }
    //   }
    
    // ButtonMoveClick = event => {
    //     this.DoOneMove();
    //     this.setState({MoveCount: this.state.MoveCount+1});
    // }
    render = () => {
        let BtnText = "Move";
        switch (this.state.MoveState) {
          case "EndMove":
            // Someone will win! Let's chek it
            let BankCardCount = this.GetCardCount(this.state.PlayerBank);
            let PlayerCard = this.state.PlayerBank[BankCardCount - 1] % 13;
            let AICard = this.state.AIBank[BankCardCount - 1] % 13;
            if (PlayerCard > AICard) {
              BtnText = "Player WIN!";
            } else {
              BtnText = "AI WIN!";
            }
            break;
          case "Equality":
            BtnText = "WAR! - next step";
            break;
          default:
            BtnText = "Move";
            break;
        }
    
        let AICardCount = this.GetCardCount(this.state.AIDeck);
        let PlayerCardCount = this.GetCardCount(this.state.PlayerDeck);
        //
        return (
          <div className="CardTable">
            <div className="CardTableHeader">
              <div className="HeaderText"> AI ({AICardCount}) </div>
    
              <button
                className="WarGameButton HeaderText"
                onClick={this.StartNewGame}
              >
                {" "}
                New game{" "}
              </button>
    
              <div className="HeaderText"> Player ({PlayerCardCount}) </div>
            </div>
            <div className="CardTableMainArea">
              <canvas
                ref="TableCanvas"
                className="TableCanvas"
                width={500}
                height={500}
              />
            </div>
            <div className="CardTableFooter">
              {this.state.AppMode == "Game" ? (
                <button
                  className="WarGameButton"
                  onClick={this.BtnOnMoveClick.bind(this)}
                >
                  {" "}
                  {BtnText}{" "}
                </button>
              ) : (
                this.state.AppMode
              )}
            </div>
    
            <img
              ref="CadrDeckImg"
              className="HiddenImage"
              src={CadrDeckImage}
              alt="deck"
            />
            <img
              ref="CadrCover"
              className="HiddenImage"
              src={CadrCover}
              alt="deck"
            />
          </div>
        );
    };
}
export default GenGame;



