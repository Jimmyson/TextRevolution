//ANIMATION SETUP
  // User modifible variables
var word_loop = effect("Word Loop Occurances")("Slider").value; // (int) Times animation is looped
var pause = effect("Paused Frames")("Slider").value; // (int) Frames the animation is paused for
var reverse = effect("Reverse Direction")("Checkbox").value; // (boolean) Characters shift forwards or backwards
var space_hold = effect("Process Spaces")("Checkbox").value; // (boolean) Hold the space character positions

//READS INPUTED TEXT
var string = text.sourceText; // Text of the layer
var lng_size = string.length;
var lng_char = string.split("");

var layerTime = timeToFrames(time - inPoint); // Find the layer startpoint in the composition
var output = ""; // Final string value to be rendered
var offset = 0;

//Check Space Process
if (space_hold == true) { //SHORT STRING PROCESS
    //DROPS SPACES
    var srt_string = string.replace(/ /gi, "");
    var srt_size = srt_string.length;
    var srt_char = srt_string.split("");

    offset = offsetValue(word_loop, pause, layerTime, srt_size, reverse);

    for (i = 0; i < lng_size; i++) {
        if (lng_char[i] == " ") {
            output += " ";
        } else {
            output += srt_char[offset % srt_size];
            offset++;
        }
    }
} else { //LONG STRING PROCESS
    offset = offsetValue(word_loop, pause, layerTime, lng_size, reverse)

    //Output string
    for (i = 0; i < lng_size; i++) {
        output += lng_char[(i + offset) % lng_size];
    }
}

//OUTPUT TO LAYER
output

// Calculate the new position of the character in the array
function offsetValue(wordLoopOccur, pause, layerTime, stringSize, rev) {
    _loopLength = stringSize * wordLoopOccur;
    _loopFrame = layerTime % (_loopLength + pause);

    if (_loopFrame < _loopLength) {
        return (rev == true) ?
            (1 + _loopFrame) % stringSize :
            stringSize - (1 + _loopFrame) % stringSize;
    }
    return 0;
}
