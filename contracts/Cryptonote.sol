pragma solidity >=0.5.0 <0.9.0;

contract Cryptonote {

    uint public noteCount = 0;
    struct Note{
        uint id;
        string text;
    }

    mapping(uint => Note) public notes;

    event NoteCreated(
        uint id,
        string text
    );
    constructor() public{
        createNotes("Hejo Michal");
    } 
    
    function createNotes(string memory _content) public {
        noteCount ++;
        notes[noteCount] = Note(noteCount,_content);
        emit NoteCreated(noteCount, _content);
        
    }
}



