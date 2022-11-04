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
        string[] imageHashList;
        string[] imageNameList;
    }

    mapping(address => mapping(uint => Note)) public notes;
    mapping(address => uint) public notesCount;
    mapping (address => string[]) public imageHashList;
    mapping (address => string[]) public imageNameList;
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
    
    function createNotes(string memory _content,uint _priority,string memory _imageHash, string memory _imageName) public {
        bool listContainPriority = false;
        for (uint256 index = 0; index < priority.length; index++) {
            if(_priority == priority[index]){
                listContainPriority = true;
            }
        }
        if(listContainPriority){
            imageUpload(_imageHash, _imageName);
            uint noteCount = notesCount[msg.sender];
            notes[msg.sender][noteCount] = Note(noteCount, _content, block.timestamp, _priority,imageHashList[msg.sender], imageNameList[msg.sender]);
            notesCount[msg.sender]++;
            emit NoteCreated(noteCount, _content);
        }
        
    }


    function imageUpload(string memory _imageHash, string memory _imageName) private{
        if(bytes(_imageHash).length != 0 ){
            imageHashList[msg.sender].push(_imageHash);
            imageNameList[msg.sender].push(_imageName);
        }
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
        notes[to][notesCount[to]] = Note(notesCount[to],note.text,block.timestamp,note.priority,note.imageHashList, note.imageNameList);
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



