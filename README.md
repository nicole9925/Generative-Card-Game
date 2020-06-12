# Project Title

DSC160 Data Science and the Arts - Final Project - Generative Arts - Spring 2020

Project Team Members: 
- Nicole Lee, nml015@ucsd.edu
- Brandon Tsui, bhtsui@ucsd.edu
- Saveree Joshipura, sjoshipu@ucsd.edu
- Leon Kuo, lkuo@ucsd.edu
- Will Bates, wbates@ucsd.edu

### Google Doc
https://docs.google.com/document/d/1ZWcxBZ9tQARwlK6HArpG2S3XDDYOKV_M8lK5zBpOPag/edit?usp=sharing

## Abstract

Our basic concept for this project is to scrape data online for instructions on how to play different card games and use a generative network to produce a new set of rules. After it is produced, we will try to play a game to see if it produced anything close to a real game. We will be using tensorflow (https://www.tensorflow.org/guide/keras/rnn) to create a recurrent neural network, as the RNN model is a typical one used for text generation. Our training data will consist of several instructions for card games.Our goal is to be able to generate new sets of rules for hypothetical games that at baseline, make some logical sense, and ideally, might even be fun to play. We will want to generate rules in the form of those in the dataset: with sections for different elements of the game, such as “Introduction," “The Deal”, and “The Play”, "The Scoring." In addition to the rules itself we will provide a review of what happened when we tried to follow the rules and play the produced game. One of the challenges we expect to face has to do with the nature of the training data. As mentioned, all of the given rules have sections describing different aspects of the games but nothing is standardized and there are many named sections that are specific to certain games that would not make sense in others. We will need to figure out how to handle/balance these differences and what to use in the final output. Secondly, it will be very hard to playtest the game if the instructions are nonsensical so there may need to be some human tinkering on the final result. 
Overall, we are seeking to expand on the topic of text generation. Similar to the project which created new recipes, we wanted to tackle a different angle by using card game instructions and trying the result in real life. This project is interesting because even today many new board games and card games are constantly being developed. In the past this process has been done solely by human creativity but we wanted to see if a neural net could produce something unique and playable. While we don’t expect the output to match the instructions of a real card game, we hope to test the possibilities of implementing this type of technology even into the creation of board and card games. Although we are making a game rules generator, we are taking inspiration from the following three sources because we haven’t found similar projects to this. We believe that this idea will utilize similar techniques that random recipe generators use, so we are taking inspiration from papers that talk about that. https://homes.cs.washington.edu/~yejin/Papers/emnlp16_neuralchecklist.pdf
https://lct-master.org/getfile.php?id=2194&n=1&dt=TH&ft=pdf&type=TH (download link)
This is a basic article for text generation https://towardsdatascience.com/simple-text-generation-d1c93f43f340

## Data and Model

(10 points) 

In the final submission, this section will describe both the data you use for this project and any pre-existing models/neural nets. For each you should provide the name, a textual description, and a link. If there is a paper (for neural net) link that as well.
- Such and such Neural Net. The short description of this neural net. 
  - [link to code]().
  - [Title of Paper with Link](). 
- Training data. Short description of training data including bibliographic info. [link to data]().


## Code

(20 points)

This section will link to the various code for your project (stored within this repository). Your code should be executable on datahub, should we choose to replicate your result. This includes code for: 

- code for data acquisition/scraping
- code for preprocessing
- training code (if appropriate)
- generative methods

Link each of these items to your .ipynb or .py files within this seection, and provide a brief explanation of what the code does. Reading this section we should have a sense of how to run your code.

[Code for Scraping pt1](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/HtmlScrapping.ipynb): This notebook scrapes from pagat.com and uses bs4 and requests to acquire a .csv file of every card game’s online URL and its rules in HTML format. 

[Code for Scraping pt2](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/scrape_cards.ipynb): This notebook also scrapes from pagat.com and produces a dataframe of each game’s name, player requirement, card quantity, and URL, as well as a dataframe of rules from every game broken up into categories (eg. how the cards are dealt, how a round of the game is played). It then exports a [csv file](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/data/text_data_grouped_by_cat.csv), which we will use in the following sections.

[Code for RNN](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/blob/master/code/RNN-LSTM.ipynb): This is the preprocessing, training, and predicting for our RNN with LSTM. It initially splits our dataset to introduction, scoring, dealing, and playing sections, preprocesses it, and prints out generated text.

[Code for Game](https://github.com/ucsd-dsc-arts/dsc160-final-dsc160-final-group16/tree/master/code/card-viz): This is the code for the working version of the game. Most of the written code is in the src directory, in the "GenGame.js" file. You can run it by running "npm start" in terminal. 

## Results

(30 points) 

This section should summarize your results and will embed links to documentation to significant outputs. This should document both process and show artistic results. This can include figures, sound files, videos, bitmaps, as appropriate to your generative art idea. Each result should include a brief textual description, and all should be listed below: 

- image files (`.jpg`, `.png` or whatever else is appropriate)
- audio files (`.wav`, `.mp3`)
- written text as `.pdf`

## Discussion

(30 points, three to five paragraphs)

The first paragraph should be a short summary describing your results.

The subsequent paragraphs could address questions including:
- Why is this culturally innovative?
- How does your generative computational approach differ from traditional art/music/cultural production? 
- How do your results relate to broader social, cultural, economic political, etc., issues? 
- What are the ethical concerns for this form of generative art? 
- In what future directions could you expand this work?

## Team Roles

Provide an account of individual members and their efforts/contributions to the specific tasks you accomplished.

## Technical Notes and Dependencies

Any implementation details or notes we need to repeat your work. 
- Additional libraries you are using for this project
- Does this code require other pip packages, software, etc?
- Does this code need to run on some other (non-datahub) platform? (CoLab, etc.)

## Reference

All references to papers, techniques, previous work, repositories you used should be collected at the bottom:
- Papers
- Repositories
- Blog posts
