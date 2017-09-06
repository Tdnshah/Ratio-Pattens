# Ratio-Patterns.

![Ration-Patterns Game](https://github.com/Tdnshah/Ratio-Patterns/blob/development/Screenshot%20from%202017-09-06%2015-11-21.png)

Ratio Patterns is an activity based interactive tool, designed and developed by [Connected Learning Initiative (CLIx)](https://clix.tiss.edu).
This interactive tool is designed by the CLIx Mathematics Team and MIT, based on the digital pedagogy concepts of Ratio and Proportions for high school students. This design was then converted into the digital tool by the CLIx technology team.This interactive consist of 6 Activities and is developed activity wise. This activities are also available in two different Indian languages :- English,Hindi,Telgu.

## Contributors.
    
### Conceptualising and Designing.

#### CLIx Curriculum Team.

1. Suchi 
2. Arindam Bose
3. Shweta 
4. Saurabh Khanna
5. Arati Bapat

#### MIT.

1. Scott Osterweil

### Development Team
1. Ashwin Nagappa
2. [Tejas shah](https://github.com/Tdnshah)
3. [Tanvi Domadia](https://github.com/tanvidom)

### Technology Behind the development.

This interactive is developed using open source HTML5 & javascript game framework named [Phaser](https://phaser.io/).

### How to install/embed this.
 
## Standalone Installation instructions

Step 1:- To install the game you have to clone the git repository in you local computer. Type the commands to your terminal.
        (Preriqusite git software has to be installed in)
    
```git clone https://github.com/Tdnshah/Ratio-Patterns.git```
    
Step 2:- Unzip this folder and copy it in the root directory of your server.If you using apache in linux, then your root Directory would be at:- 

```/var/www/html```
    
Or you can use brackets editor and open this folder in brackets and click on the electricity icon on the top right corner of your editor screen for live preview this will create a temporary local server for your development enviornment.

Step 3:- This step is optional but recommended to change the permission of you direcctory to 755.To do so below is the command

```chmod -R 755 /var/www/html/Ratio-Patterns```

Step 4:- Just visit the url of the server. If your are running a local server then the url will be 
    
``` localhost:8080```
    
If you are putting it on a live server then url will be 

```http://example.com/name-of-directory-in-which-you-have-copied-the-repository```

## Embeding in you WebProject Using Iframe

1st to 4th steps as it is with the additional 5 step as given below. 

Step 5:- Put the HTML Iframe in your code where you want to embed this tool. You can also embed this activity wise by just adding the url of the particular activity you want to embed. Below is the code for the same 

``` <iframe src="http://example.com/en/Activity1/" width="some pixels" height="somepixels"></iframe>```