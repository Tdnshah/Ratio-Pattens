# Unplatform-Windows-Packaging
This is the script for making the windows installer for Unplatform (CLIxModule) using a software named Inno Setup 

# Index
1. Change Log
2. Software requirements
3. Script Execution guide. 

# Change Log 

 Date|Notes|By 
------------ | ------------- | -------------
15/03/2017 | Scripting Execution Guide | Tejas.S

# Software Requirement

* Inno Setup Compiler 

	* Download the Inno Setup Compiler at this [link](http://www.jrsoftware.org/isdl.php).

* Inno script for making the windows clixmodules installer at this [link](https://drive.google.com/a/clixindia.org/file/d/0B8jO_EmBxRInQi1IMFA3RXAxZk0/view?usp=sharing).

# Script Execution Guide:- 

* Step 1 :- Download the Inno Setup Compiler Software from the above given link.

* Step 2 :- Download the script for packaging clixmodules for windows from the above given links

* Step 3 :- Open the downloaded packaging script by double clicking on the script file.

* Step 4:-  Find the following lines in the script and change the locations as per the location (file paths) to the clixmodules in your computer.
	
```
[Setup]
	
	OutputDir=(Please put the path where you want the packaged output file is to be stored in your computer)
	SetupIconFile=(Please give the path to the setup icon of the clixmodules square icon which is used exclusively for clixmodules setup files)

[Files]
	
	Source: (here set the path to the unplatform_win32_ssl.bat file in the clixmodule in your computer)
	Source: (here set the path to the complete folder of the clixmodules /* defines all the files inside clixmodules)
```

* After Changing this files paths press on the green arrow (Run) button located on the top menu in the inno software. This will start the compiling and this will take
a bit longer and time depends on the total size of the complete clixmodules.

* After completion of the compiling process the inno software will automatically run created .exe installer and test it.

* If everything works well you will get the success message and clixmodule will be installed in you completed.

* Now to distrubute clixmodules you can file the clixmodules-setup.exe installer file at the location you mentioned in the [setup] outputdir section in the script.
