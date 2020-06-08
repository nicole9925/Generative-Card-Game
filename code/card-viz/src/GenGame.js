import React, { Component } from 'react';
import './GenGame.css';
import CadrDeckImage from './images/deck.png';
import CadrCover from './images/cover.png';

class GenGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AppMode: "Good Luck!", // NoAction, Game, PlayerWin, AI1Win, AI2Win, AI3Win
            PlayerState: "NoState", // AI1, AI2, AI3, Player
            GameState: "NoState", // Next, Lose, First
            CardsDeck: new Array(52),
            PlayerDeck: new Array(52),
            AI1Deck: new Array(52),
            AI2Deck: new Array(52),
            AI3Deck: new Array(52),
            PlayerBank: new Array(52),
            AI1Bank: new Array(52),
            AI2Bank: new Array(52),
            AI3Bank: new Array(52),
            MoveCount: 0,
            PlayerTrick: 0,
            AI1Trick: 0,
            AI2Trick: 0,
            AI3Trick: 0,
            CurrentCard: null,
            CardIndex: -1,
        };
        this.TableCanvas = React.createRef()

        this.StartNewGame.bind(this);
        //this.DoOneMove.bind(this);
        //this.EndMove.bind(this);
        this.GetOneCardFromDeck.bind(this);
        this.OneRound.bind(this);
        this.componentDidUpdate.bind(this);
        this.render.bind(this);
        this.draw_card.bind(this);
        this.EndGame.bind(this);
        this.ResetBank.bind(this);
        //this.DisplayButton.bind(this);
        this.PlayerMove.bind(this);
        this.number.bind(this)
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
        //this.setState({AppMode: "Game"});
        
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
            this.state.AI1Bank[count] = this.state.AI1Deck[count];
            this.state.AI2Bank[count] = this.state.AI2Deck[count];
            this.state.AI3Bank[count] = this.state.AI3Deck[count];

            this.MoveDeck(this.state.PlayerDeck)
            this.MoveDeck(this.state.AI1Deck)
            this.MoveDeck(this.state.AI2Deck)
            this.MoveDeck(this.state.AI3Deck)

        }

        this.setState({PlayerTrick: 0})
        this.setState({AI1Trick: 0})
        this.setState({AI2Trick: 0})
        this.setState({AI3Trick: 0})

        this.SortBank(this.state.PlayerBank)
        this.SortBank(this.state.AI1Deck)
        this.SortBank(this.state.AI2Deck)
        this.SortBank(this.state.A31Deck)

        this.setState({PlayerState: 'Player'});
        this.setState({AppMode: 'Game'});
        this.setState({GameState: 'First'});
    }

    OneRound = () => {

        switch(this.state.PlayerState) {
            case 'AI1':
                var found = false;
                var nulls = 0;
                if(this.state.GameState == "First") {
                    this.setState({CurrentCard: this.state.AI1Bank[0]%13})
                    this.setState({CardIndex: this.state.AI1Bank[0]})
                    this.MoveDeck(this.state.AI1Bank)
                } else {
                    for(var i=0; i<4; i++) {
                        if(this.state.AI1Bank[i] == null) {
                            nulls++;
                        }    
                    }    
                    if((nulls===4)) {
                        this.ResetBank(this.state.AI1Bank, this.state.AI1Deck)
                    }
                    for(i=0; i<4; i++) {
                        if(this.state.AI1Bank[i] == null) {
                            continue
                        } else if(this.state.AI1Bank[i]%13 >= this.state.CurrentCard) {
                            this.setState({CurrentCard: this.state.AI1Bank[i]%13});
                            this.setState({CardIndex: this.state.AI1Bank[i]})
                            this.state.AI1Bank[i] = null;
                            found = true;
                            this.setState({GameState: 'Next'})
                            break;
                        }   
                    } 
                    if(found===false) {
                        this.state.PlayerTrick += 1
                        this.setState({GameState: 'First'})
                        this.setState({CurrentCard: null})
                        this.setState({CardIndex: -1})
                    }
                 } 
                this.setState({PlayerState: 'AI2'}, () => {
                    this.OneRound();
                }); 
                break
            case 'AI2':
                found = false;
                nulls = 0
                if(this.state.GameState === "First") {
                    this.setState({CurrentCard: this.state.AI2Bank[0]%13})
                    this.setState({CardIndex: this.state.AI2Bank[0]})
                    this.MoveDeck(this.state.AI2Bank)
                } else {
                    for(i=0; i<4; i++) {
                        if(this.state.AI2Bank[i] == null) {
                            nulls++;
                        }    
                    }    
                    if((nulls===4)) {
                        this.ResetBank(this.state.AI2Bank, this.state.AI2Deck)
                    }
                    for(i=0; i<4; i++) {
                        if(this.state.AI2Bank[i] == null) {
                            continue
                        } else if(this.state.AI2Bank[i]%13 >= this.state.CurrentCard) {
                            this.setState({CurrentCard: this.state.AI2Bank[i]%13})
                            this.setState({CardIndex: this.state.AI2Bank[i]})
                            this.state.AI2Bank[i] = null;
                            found = true
                            this.setState({GameState: 'Next'})
                            break
                        }   
                    } 
                    if(found==false) {
                        this.state.AI1Trick += 1
                        this.setState({GameState: 'First'})
                        this.setState({CurrentCard: null})
                        this.setState({CardIndex: -1})
                    }
                 } 
                 this.setState({PlayerState: 'AI3'}, () => {
                    this.OneRound();
                }); 
                break
                case 'AI3':
                    found = false;
                    nulls=0
                    for(i=0; i<4; i++) {
                        if(this.state.AI3Bank[i] == null) {
                            nulls++;
                        }    
                    }    
                    if((nulls==4)) {
                        this.ResetBank(this.state.AI3Bank, this.state.AI3Deck)
                    }  
                    if(this.state.GameState === "First") {
                        this.setState({CurrentCard: this.state.AI3Bank[0]%13})
                        this.setState({CardIndex: this.state.AI3Bank[0]})
                        this.MoveDeck(this.state.AI3Bank)
                    } else {
                        for(var i=0; i<4; i++) {
                            if(this.state.AI3Bank[i] == null) {
                                continue
                            } else if(this.state.AI3Bank[i]%13 >= this.state.CurrentCard) {
                                this.setState({CurrentCard: this.state.AI3Bank[i]%13})
                                this.setState({CardIndex: this.state.AI3Bank[i]})
                                this.state.AI3Bank[i]=null
                                found = true
                                this.setState({GameState: 'Next'})
                                break
                            }   
                        } if(found===false) {
                            this.state.AI2Trick += 1
                            this.setState({GameState: 'First'});
                            this.setState({CurrentCard: null})
                            this.setState({CardIndex: null})
                        }
                     } 
                    this.setState({PlayerState: 'Player'})
                    break
                default:

        }
    }    

    PlayerMove = () => {
        var less = 0;
        var nulls = 0;
        for(var i=0; i<4; i++) {
            if(this.state.PlayerBank[i] == null) {
                nulls++;
            }    
        }    
        if((nulls===4)) {
            this.ResetBank(this.state.PlayerBank, this.state.PlayerDeck)
        }  
        for(i=0; i<4; i++) {
            if((this.state.PlayerBank[i] == null) || ((this.state.PlayerBank[i]%13) < this.state.CurrentCard)) {
                less++;
            }
        } if ((less===4)) {
            this.state.AI3Trick += 1
            this.setState({GameState: "First"})
            this.setState({CurrentCard: null})
            this.setState({CardIndex: -1})
        }
        this.OneRound()
    }

    ResetBank = (bank, deck) => {
        var empty = true;
        for(let count = 0; count < 4; count++) {
            if(bank[count] != null) {
                empty = false;
            }
        } 

        if(empty === true) {
            if(this.GetCardCount(deck) < 4) {
                this.EndGame();
            }
            for(let count = 0; count < 4; count++) {
                bank[count] = deck[count];
                this.MoveDeck(deck)
            }
        }    
    }

    

    SortBank = (bank) => {

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
            return (o1%13).compareTo((o2%13));
        }
    }   

    EndGame = () => {
        if((this.state.PlayerTrick > this.state.AI1Trick) && (this.state.PlayerTrick > this.state.AI2Trick) && (this.state.PlayerTrick > this.state.AI3Trick)) {
            console.log('You Win!' )    
            this.setState({AppMode: 'PlayerWin'})
        } else if((this.state.PlayerTrick < this.state.AI1Trick) && (this.state.AI1Trick > this.state.AI2Trick) && (this.state.AI1Trick > this.state.AI3Trick)) {
            console.log('AI1 Wins!' )
            this.setState({AppMode: 'AI1Win'})
        } else if((this.state.PlayerTrick < this.state.AI2Trick) && (this.state.AI1Trick < this.state.AI2Trick) && (this.state.AI2Trick > this.state.AI3Trick)) {
            console.log('AI2 Wins!' )
            this.setState({AppMode: 'AI2Win'})
        } else if ((this.state.PlayerTrick < this.state.AI3Trick) && (this.state.AI1Trick < this.state.AI3Trick) && (this.state.AI2Trick < this.state.AI3Trick)) {
            console.log('AI3 Wins!')
            this.setState({AppMode: 'AI3Win'})
        } else {
            console.log('Tie!')
            this.setState({AppMode: 'Tie'})
        }
    }

    BtnOnMoveClick = (button) => {
        if(this.state.PlayerBank[button]%13 == null) {
            console.log('Null selected!');
        } else if((this.state.PlayerBank[button]%13) < this.state.CurrentCard) {
            console.log('Too Low!')
            this.setState({CurrentCard: null})
            this.setState({CardIndex: -1})
            this.state.AI3Trick++;
            this.setState({PlayerState: 'AI1'}, () => {
                this.OneRound();
            }); 
        } else {
            this.setState({CurrentCard: this.state.PlayerBank[button]%13});
            this.setState({CardIndex: this.state.PlayerBank[button]})
            this.state.PlayerBank[button] = null;
            this.setState({GameState: 'Next'})
            this.setState({PlayerState: 'AI1'}, () => {
                this.PlayerMove();
            }); 
        }
    };

    componentDidUpdate = () => {
        if(this.state.AppMode === "Game") {   
            let TableCtx = this.refs.TableCanvas.getContext("2d");
            let count;
            //TableCtx.clearRect(0, 0, 500, 500);
            TableCtx.fillStyle = "rgb(102, 202, 110)";
            TableCtx.fillRect(0, 0, 500, 500);

            let CardsInDeck = Math.floor(this.GetCardCount(this.state.AI1Deck)/ 13);
            TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 20, 350, 30, 56)

            CardsInDeck = Math.floor(this.GetCardCount(this.state.PlayerDeck) / 13);
            TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 320, 350, 30, 56);

            CardsInDeck = Math.floor(this.GetCardCount(this.state.AI2Deck) / 13);
            TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 20, 50, 30, 56);

            CardsInDeck = Math.floor(this.GetCardCount(this.state.AI3Deck) / 13);
            TableCtx.drawImage(this.refs.CadrCover, CardsInDeck * 70, 0, 70, 96, 320, 50, 30, 56);

            this.draw_card(this.state.CardIndex, 230, 200)

            let bc_x = 360;
            let bc_y = 150;

            for(count = 0; count < 4; count++) {
                if(this.state.PlayerBank[count] == null) {
                } else {
                    //player 1: 360, 350 2: 390, 350 3: 420, 350 4: 450, 350
                    this.draw_card(this.state.PlayerBank[count], bc_x, bc_y+200);
                } if(this.state.AI1Bank[count] == null) {
                } else {
                    //ai1: 80, 350 2: 110, 350 3: 140, 350 4: 170, 350
                    this.draw_card(this.state.AI1Bank[count], bc_x-280, bc_y+200);
                } if(this.state.AI2Bank[count] == null) {
                } else {
                    //ai2: 80, 50 2: 110, 50 3: 140, 50 4: 170, 50
                    this.draw_card(this.state.AI2Bank[count], bc_x-280, bc_y-100);
                } if(this.state.AI3Bank[count] == null) {
                }  else {
                    //ai3:  360, 50 2: 390, 50 3: 420, 50 4: 450, 50
                    this.draw_card(this.state.AI3Bank[count], bc_x, bc_y-100);               
                }
                bc_x += 30;
            }
        }
    }
    
    draw_card(CardNumber, DestinationX, DestinationY){
     
        let Ctx = this.refs.TableCanvas.getContext("2d");
     
        if(CardNumber == -1)
        {
          Ctx.drawImage(this.refs.CadrCover, 6, 0, 64, 96, DestinationX, DestinationY, 30, 56);
          
        }
        else{
          let SourceX = (CardNumber % 13) * 73;
          let SourceY = Math.floor(CardNumber / 13) * 98;
     
          Ctx.drawImage(this.refs.CadrDeckImg, SourceX, SourceY, 73, 98, DestinationX, DestinationY, 30, 56);
        }
      }

    number = (card) => {
        if(card==null) {
            return 'empty'
        }
        else if (card%13 == 0) {
            return 'A'
        } else if (card%13+1 > 10) {
            if (card%13+1 == 11) {
                return 'J'
            } else if (card%13+1 == 12) {
            return 'Q'
        } else {
            return 'K'
        }
        } else {
            return card%13+1
        }
    }

    // }
    render = () => {
    
        //
        return (
          <div className="CardTable">
            <div className="CardTableHeader">
              <div className="HeaderText"> AI1 (Tricks: {this.state.AI1Trick}) </div>
              <div className="HeaderText"> AI2 (Tricks: {this.state.AI2Trick}) </div>
    
              <button
                className="GenGameButton HeaderText"
                onClick={this.StartNewGame}
              > 
                New game
              </button>
              <div className="HeaderText"> AI3 (Tricks: {this.state.AI3Trick}) </div>
              <div className="HeaderText"> Player (Tricks: {this.state.PlayerTrick}) </div>
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
                <div>

                    <button disabled={(!this.state.PlayerBank==="Player")}
                        className="GenGameButton1"
                        onClick={this.BtnOnMoveClick.bind(this, 0)}
                        >
                        {" "}
                        {this.number(this.state.PlayerBank[0])}
                        {" "}
                        
                    </button>

                    <button
                        className="GenGameButton2"
                        onClick={this.BtnOnMoveClick.bind(this, 1)}
                        >
                        {" "}
                        {this.number(this.state.PlayerBank[1])}
                        {" "}
                    
                    </button>

                    <button
                        className="GenGameButton3"
                        onClick={this.BtnOnMoveClick.bind(this, 2)}
                        >
                        {" "}
                        {this.number(this.state.PlayerBank[2])}
                        {" "}
                        
                    </button>

                    <button
                        className="GenGameButton4"
                        onClick={this.BtnOnMoveClick.bind(this, 3)}
                        >
                        {" "}
                        {this.number(this.state.PlayerBank[3])}
                        {" "}
                        
                    </button>
               </div>     
                
              ) : (
              <h1 id="win">{this.state.AppMode}</h1>
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



