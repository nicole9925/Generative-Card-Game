# Project Title

DSC160 Data Science and the Arts - Final Project - Generative Arts - Spring 2020

Project Team Members: 
- Nicole Lee, nml015@ucsd.edu
- Brandon Tsui, bhtsui@ucsd.edu
- Saveree Joshipura, sjoshipu@ucsd.edu
- Leon Kuo, lkuo@ucsd.edu
- Will Bates, wbates@ucsd.edu


## Abstract

Our basic concept for this project is to scrape data online for instructions on how to play different card games and use a generative network to produce a new set of rules. After it is produced, we will try to play a game to see if it produced anything close to a real game. We will be using tensorflow (https://www.tensorflow.org/guide/keras/rnn) to create a recurrent neural network, as the RNN model is a typical one used for text generation. Our training data will consist of several instructions for card games.Our goal is to be able to generate new sets of rules for hypothetical games that at baseline, make some logical sense, and ideally, might even be fun to play. We will want to generate rules in the form of those in the dataset: with sections for different elements of the game, such as “Introduction," “The Deal”, and “The Play”, "The Scoring." In addition to the rules itself we will provide a review of what happened when we tried to follow the rules and play the produced game. One of the challenges we expect to face has to do with the nature of the training data. As mentioned, all of the given rules have sections describing different aspects of the games but nothing is standardized and there are many named sections that are specific to certain games that would not make sense in others. We will need to figure out how to handle/balance these differences and what to use in the final output. Secondly, it will be very hard to playtest the game if the instructions are nonsensical so there may need to be some human tinkering on the final result. 
Overall, we are seeking to expand on the topic of text generation. Similar to the project which created new recipes, we wanted to tackle a different angle by using card game instructions and trying the result in real life. This project is interesting because even today many new board games and card games are constantly being developed. In the past this process has been done solely by human creativity but we wanted to see if a neural net could produce something unique and playable. While we don’t expect the output to match the instructions of a real card game, we hope to test the possibilities of implementing this type of technology even into the creation of board and card games. Although we are making a game rules generator, we are taking inspiration from the following three sources because we haven’t found similar projects to this. We believe that this idea will utilize similar techniques that random recipe generators use, so we are taking inspiration from papers that talk about that. https://homes.cs.washington.edu/~yejin/Papers/emnlp16_neuralchecklist.pdf
https://lct-master.org/getfile.php?id=2194&n=1&dt=TH&ft=pdf&type=TH (download link)
This is a basic article for text generation https://towardsdatascience.com/simple-text-generation-d1c93f43f340.

## Data and Model

The data is a list of 421 card game rules. The games all use only standard playing cards, though some games use only a subset of the main 52 cards. These rules were initially found on bicyclecards.com, but the website pagat.com turned out to be easier to scrape from as bicyclecards.com did not allow web scraping. Consistent elements of the dataset include a game’s name, number of players, deck subset, and rules. Since the goal of our project was to create the rules to a new card game, the rules section was entered into the model as training data. Some of the section categorizations were a bit messy or incomplete, but other categories like “Deal” and “Play” were featured fairly often.

The neural network used was an LSTM (Long Short Term Memory) network which uses an input gate to discover which values to use to modify the memory and a forget gate to decide which details should be discarded. The input gate and the memory of the block then determines the output or the output gate. This type of neural network seems to be very common with a few variations and as a result there doesn't seem to be just one paper to source here. The RNN LSTM model was used from Tensorflow, specifically the [keras](https://www.tensorflow.org/guide/keras/rnn) RNN model. We were inspired to use this model after reading papers for recipe generators ([Globally Coherent Text Generation with Neural Checklist Models](https://homes.cs.washington.edu/~yejin/Papers/emnlp16_neuralchecklist.pdf), [Ingredient-driven Recipe Generation Using Neural and Distributional Models (download link)](https://lct-master.org/getfile.php?id=2194&n=1&dt=TH&ft=pdf&type=TH)]. We eventually also gained inspiration from [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/), suggested by our TA Subrato, which praised the effectiveness of RNN LSTM regarding text generation. 

## Code

[Code for Scraping pt1](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/HtmlScrapping.ipynb): This notebook scrapes from pagat.com and uses bs4 and requests to acquire a .csv file of every card game’s online URL and its rules in HTML format. 

[Code for Scraping pt2](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/scrape_cards.ipynb): This notebook also scrapes from pagat.com and produces a dataframe of each game’s name, player requirement, card quantity, and URL, as well as a dataframe of rules from every game broken up into categories (eg. how the cards are dealt, how a round of the game is played). It then exports a [csv file](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/data/text_data_grouped_by_cat.csv), which we will use in the following sections.

[Code for RNN](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/RNN-LSTM.ipynb): This is the preprocessing, training, and predicting for our RNN with LSTM. It initially splits our dataset to introduction, scoring, dealing, and playing sections, preprocesses it, and prints out generated text. We ran the functions multiple times for each dataset. We've also run different versions of this code, adding and deleting parameters as we saw fit. 

[Code for Game](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/code/card-viz): This is the code for the working version of the game. Most of the written code is in the src directory, in the "GenGame.js" file. You can run it by running "npm start" in terminal. 

## Results

[Epoch data](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/data/generated_epochs) Within this directory is 3 directories. The first is named "60 Epochs," which consists of the raw epoch generated results. As soon as we realized we were overfitting the data, we made adjustments and created the Else file. The last file contains the pdf files of the else files, as pdf was the expected format.

[Playable Game](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/results/Game%20Rules.pdf): This was the original game we physically play-tested. This file contains a more complete version of a ruleset based on the generated text. This is not necessarily based on a word for word interpretation of the literal generated text, but takes many elements from both the interpretations listed above as well as some of the vocabulary and basic instructions found in the generated text. This ruleset takes more liberty in terms of interpretation and also expands on mechanics such as trick taking which the generated text mentions a lot in the play section but does not actually explain how it works. Overall, the ruleset is a creative expansion on the actual text with tweaks and changes to make the actual game more playable. 

[Computer Game](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/results/card-viz): (Note: Download directory, type "npm install," then "npm start" in terminal. In addition to the user-tested game above, we created a working version of a different set of rules. The rules were randomly generated from phrases from our dataset. The file consists of the working version of generated game developed using facebook’s create-react-app, React.js, and canvas. The game instructions were generated using the RNN that we trained with 30 epochs and 0.5 temperature. The instructions were interpreted into a working game, with the generated text being the inspiration. As such, the RNN contributed the creative element of this, and we acted as a translator. This is the [link](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/results/1.mov) to the demo we showed during the presentation, and we hope that this will give you a good understanding of the game. [This](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/results/results.pdf) is the rule sheet that we based the game off of. 

## Discussion
Despite a lack of complete coherence, overall the results produced by the RNN with the LSTM layer was fairly successful. In general, based on the training data, the network was able to capture the sentiment of each titled section with relevant text related to its purpose. For example, in the introduction, the network titled the game and gave a vague description/background as to how it would play. In the “Deal” and “Play” sections, the network provided a decent framework for the setup of the game and a basic understanding of how to play. One problem we noticed here is that in some cases, the generated text was very repetitive and overly predicted certain words such as “deal” and “dealer” and in the “Play” section, even completed repeated the same sentence multiple times. Despite this, when we filtered out the repetition, we were able to extract useful information and were able to combine everything into a simple interpretation of all of the rules. Finally, we were able to use this simple interpretation to create a more exhaustive set of rules expanding on the topics mentioned in the generated text and also adding in more tried and true game mechanics.

Part of the reason this project was so interesting is that, based on our research, this type of work had not been done in this context before. Neural nets have more famously been used to learn how to play board games such as AlphaGo but we didn’t ever find anything which created a brand new set of rules based on previous text. One example did stand out in our research that was somewhat similar. In 2009 Cameron Browne actually published a board game created by a computer program which was commercially successful and was once on the top 100 Abstract games on BoardGameGeek.com. His approach was different however as he specifically set out to make a combinatorial game similar to tic tac toe or othello and instead of feeding the program text, broke down game rules into standardized elements (called Game Description Language) specific to those types of games. In fact, there are many other examples of breaking down rules into Game Description Languages, and using a macro to create new games. After feeding data like this, the program both generated different combinations of elements to make new games and also tested those games itself to determine which it thought humans would be most interested in playing. 

Looking back at our project, we sought to use a different technique to create new games by scraping the literal text of a set of instructions and using a Neural Net to generate new results. This approach is slightly disadvantageous compared to one that uses Game Description Languages due to the lack of standardization, but using the actual text allowed us to generate equally new and novel ideas that also takes ideas and mechanics from other games. Since we narrowed our scope to card games using a standard 52-card deck, the result was inherently able to make more sense as opposed to one of our original ideas in the brainstorming phase of using instructions for all kinds of board games since most of these types are card games just use the cards itself, with no extra pieces needed. However, because of this, many of the rules listed were very similar and in some cases, were essentially the same game under different names or only had small tweaks. Not only that, but many card games share mechanics and are not always very unique, such as trick taking card games, or poker style card games. This was a concern because we didn’t want our rules to be the same as a pre-existing game which would raise an ethical concern having to do with mistakenly stealing someone else’s idea without knowing. While we can’t know for certain if this is the case for the final result, based on standard knowledge of different types of card games, we do not believe this is the case and were happy that the result did appear to be unique in some key aspects.

In order to make the final game more playable, we definitely had to insert a more complete explanation of certain parts of the rules and though the result did not actually have any exact sentences from the original text, we think it was still a successful use of the model. We were able to use the framework, while adding human creativity together in order to make our game which added novelty/ new mechanics while being coherent as a ruleset. Probably the biggest creativity leap taken was to commit to the type of game it would be: trick taking. The generated text mentioned many elements of a trick-taking game such as the trump suit and rounds in the game, but never fully explained how to play; so the final result was more inspired by pre-existing games such as Hearts or Napoleon in order to better formulate how to play with trick-taking. Overall, while this project was pretty successful, there are still ways to improve upon it. With more time, we would definitely want to use different models such as GPT-2 to compare results as well as spend more time tinkering with the parameters. In addition, as mentioned earlier, we would like to expand this past card games and train a new model on real board game instructions ranging from Monopoly, to Settlers of Catan and even more advanced games with complicated rules.

## Team Roles

Brandon Tsui: 
- Helped scrape the rules from online ([scrape cards ipynb](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/scrape_cards.ipynb))
- Worked on the interpretation of rules ([Game rules pdf](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/results/Game%20Rules.pdf))
- Helped write report

Nicole Lee: 
- Built and trained RNN LSTM model ([RNN LSTM ipynb](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/RNN-LSTM.ipynb))
- Created prediction + interpretated results ([results.pdf](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/results/results.pdf), [generated epoch directory](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/data/generated_epochs))
- Created working version of game ([card_viz directory](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/code/card-viz))
- Created/edited presentation
- Helped write report

Leon Kuo: 
- Helped scrape the links to the websites used and the html code of them for a possible extension ([HTMLScrapping ipynb](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/HtmlScrapping.ipynb))

Saveree Joshipura: 

Will Bates:
- Initialize ideas and helped write the report

## Technical Notes and Dependencies

HtmlScrapping.ipynb:
- Pandas
- BeautifulSoup

RNN-LSTM.ipynb
- Tensorflow version 2.2.0
- Sklearn

Card-viz
- Enter the directory and type in "npm install"
- Run using “npm start” in directory


## Reference

- [Evolutionary Game Design](http://cambolbro.com/cv/publications/ciaig-browne-maire-19.pdf)
- [React Card Game](https://html5hive.org/create-a-card-game-in-canvas-with-react-components/) 
- [Text Generation RNN](https://github.com/jeffheaton/t81_558_deep_learning/blob/master/t81_558_class_10_3_text_generation.ipynb)
- [Example of RNN used to play games](https://towardsdatascience.com/building-a-deep-neural-network-to-play-fifa-18-dce54d45e675)
- [Inspiration blog post about making cocktails using RNN](https://towardsdatascience.com/generating-novel-cocktail-recipes-with-a-specific-style-through-recurrent-neural-networks-4339e9168404)

