# eSports Results   

https://morning-ravine-22892.herokuapp.com

This website utilizes Pandascore's API where it constantly updates results of new tournaments,
series and leagues. Pandascore's API is a REST API which organizes each categories into a specific structure. 
A token based authorization key is required to access Pandascore's API. Then access to each categories is 
separated by the following below from the Pandascore API website:

The PandaScore API allow you to access data about eSports events by using a specific structure.

Leagues Leagues are the top level events, it doesn’t have a date and represents a regular competition. A League is composed of one or several series. 
Some League of legends leagues are: EU LCS, NA LCS, LCK, etc. 
Some Dota 2 leagues are: ESL One, GESC, The International, PGL, etc.

Series The Serie represents an occurrence of a league event. 
The EU LCS league has two series per year: spring 2017, summer 2017, spring 2016, summer 2016 etc. 
Some Dota2 Series examples would be: Changsha Major, Open Bucharest, Frankfurt, i-League Invitational etc.

Tournaments groups all the matches of a serie under "stages" and "groups". 
The tournaments of the EU LCS of summer 2017 are: Group A, Group B, Playoffs, etc. 
Some Dota 2 tournaments are: Group A, Group B, Playoffs, etc.

And finally, we have the matches , which have two players or teams (depending on the played videogame) and several games (the rounds of the match). 
The matches of the group A in the EU LCS of summer 2017 are: G2 vs FNC, MSF vs NIP, etc. 
The matches of the group A in the ESL One, Genting tournamnet are: Lower Round 1, Quarterfinal, Upper Final, etc. 

The website utilizes bootstrap to style the page. It also uses nodeJS and the Express framework to handle the API requests 
on the server side.