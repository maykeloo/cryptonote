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
    constructor() public{
        createNotes("Hejo Michal");
    } 
    
    function createNotes(string memory _content) public {
        uint noteCount = notesCount[msg.sender];
        notes[msg.sender][noteCount] = Note(noteCount,_content);
        notesCount[msg.sender]++;
        emit NoteCreated(noteCount, _content);

    }
    
    function getAllNotes() public view returns (Note[] memory){
      Note[] memory allNotes = new Note[](notesCount[msg.sender]);
      for (uint i = 0; i < notesCount[msg.sender]; i++) {
          Note storage currentNote = notes[msg.sender][i];
          allNotes[i] = currentNote;
      }
      return allNotes;
  }
}



