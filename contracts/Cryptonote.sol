pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract Cryptonote {

    struct Note{
        uint id;
        string text;
    }

    mapping(address => mapping(uint => Note)) public notes;
    mapping(address => uint) public notesCount;

    event NoteCreated(
        uint id,
        string text
    );

    event NoteEdited(
        uint id
    );
    event NoteDeleted(
        uint id
    );
    constructor() public{

    } 
    
    function createNotes(string memory _content) public {
        uint noteCount = notesCount[msg.sender];
        notes[msg.sender][noteCount] = Note(noteCount,_content);
        notesCount[msg.sender]++;
        emit NoteCreated(noteCount, _content);
    }
    function deleteNote(uint _noteId) public {
        delete notes[msg.sender][_noteId].text;
        emit NoteDeleted(_noteId);
    }
    
    function getAllNotes() public view returns (Note[] memory){
      Note[] memory allNotes = new Note[](notesCount[msg.sender]);
      for (uint i = 0; i < notesCount[msg.sender]; i++) {
          Note storage currentNote = notes[msg.sender][i];
          allNotes[i] = currentNote;
      }
      return allNotes;
    }

    function _shareNotes(address to, uint noteId) public returns (bool) {
        address noteOwner = msg.sender;
        Note storage note = notes[noteOwner][noteId];
        notes[to][notesCount[to]] = Note(notesCount[to],note.text);
        notesCount[to]++;
        return true;
    }

    //Nie wiem czy to działa bo w sumie tylko to napisałem i spanko poszłem :) 
    // Działa :)
    function editNote(uint _noteId, string memory _text) public {
        notes[msg.sender][_noteId].text = _text;
        emit NoteEdited(_noteId); 
    }


}



