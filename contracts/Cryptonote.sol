pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract Cryptonote {

    address owner;
    constructor() public{
        owner = msg.sender;
    } 
    modifier _onlyOwner {
        require(msg.sender == owner);
        _;
    }
    struct Note{
        uint id;
        string text;
        uint timestamp;
        uint priority;
        //string[] imageHashList;
    }

    mapping(address => mapping(uint => Note)) public notes;
    mapping(address => uint) public notesCount;
    mapping (address => string[]) public imageHashList;
    uint[] public priority = [1,2,3,4,5];
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
    
    function createNotes(string memory _content,/*string memory _imageHash*/ uint _priority) public {
        bool listContainPriority = false;
        for (uint256 index = 0; index < priority.length; index++) {
            if(_priority == priority[index]){
                listContainPriority = true;
            }
        }
        if(listContainPriority){
            uint noteCount = notesCount[msg.sender];
            notes[msg.sender][noteCount] = Note(noteCount, _content, block.timestamp, _priority/*imageHashList[msg.sender]*/);
            notesCount[msg.sender]++;
            emit NoteCreated(noteCount, _content);
        }
        //if(bytes(_imageHash).length != 0){
            //imageUpload(_imageHash);
      
        //}
    }


    function imageUpload(string memory _imageHash) private{
        imageHashList[msg.sender].push(_imageHash);
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
        notes[to][notesCount[to]] = Note(notesCount[to],note.text,block.timestamp,note.priority);
        notesCount[to]++;
        return true;
    }

    //Nie wiem czy to działa bo w sumie tylko to napisałem i spanko poszłem :) 
    // Działa :)
    function editNote(uint _noteId, string memory _text) public {
        notes[msg.sender][_noteId].text = _text;
        emit NoteEdited(_noteId); 
    }

    function _getPriority() public view returns (uint[] memory){
        return priority;
    }


}



