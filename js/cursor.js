function setCursorPosition(fieldElement, pos) {
  var br = (fieldElement.selectionStart || fieldElement.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false);

  if (br == "ie") { 
    fieldElement.focus();
    range = document.selection.createRange();
    range.moveStart('character', -fieldElement.value.length);
    range.moveStart('character', pos);
    range.moveEnd('character', 0);
    range.select();
  } else if (br == "ff") {
    fieldElement.selectionStart = pos;
    fieldElement.selectionEnd = pos;
    fieldElement.focus();
  }
}

function insertAtCursor(fieldElement, text, setPos) {
  if (setPos == undefined) setPos = true;

  var scrollPos = fieldElement.scrollTop,
      startPos = 0, strPos = 0,
      br = (fieldElement.selectionStart || fieldElement.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false),
      range, front, back
  
  if (br == "ie") { 
    fieldElement.focus();
    range = document.selection.createRange();
    range.moveStart('character', -fieldElement.value.length);
    startPos = range.text.length;
  } else if (br == "ff") {
    startPos = fieldElement.selectionStart;
  }

  front = fieldElement.value.substring(0, startPos);  
  back = fieldElement.value.substring(startPos, fieldElement.value.length); 
  fieldElement.value = front+text+back;
  strPos = startPos + text.length;

  if (setPos) setCursorPosition(fieldElement, strPos);

  fieldElement.scrollTop = scrollPos;
  return startPos;
}