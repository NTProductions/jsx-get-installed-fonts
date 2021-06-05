// get all fonts
var window = new Window("palette", "Installed Fonts", undefined);
var fontsDD = window.add("dropdownlist", undefined, []);
fontsDD.size = [220, 25];
var randomButton = window.add("button", undefined, "Random");

var bt = new BridgeTalk();
    
bt.target = "indesign";
bt.body = "var fonts = [];\
                var fontsFile = File('~/Desktop/fonts.txt');\
                if(!fontsFile.exists) {\
                fontsFile.open('w');\
                for(var i = 0; i < app.fonts.length; i++) { \
                fontsFile.writeln(app.fonts[i].postscriptName);\
                } \
                fontsFile.close();\
                }";
bt.onResult = function(res) {
// use eval to reconstruct the array
var arr = eval(res.body);
var fontFile = File("~/Desktop/fonts.txt");
fontFile.open("r");
do {
    fontsDD.add("item", fontFile.readln());
    } while(!fontFile.eof);
fontFile.close();
fontsDD.selection = 0;
}

bt.send();

randomButton.onClick = function() {
        fontsDD.selection = Math.floor(Math.random() * fontsDD.items.length);
    }

window.center();
window.show();