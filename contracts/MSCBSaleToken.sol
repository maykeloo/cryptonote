pragma solidity >=0.6.12 <0.9.0;

import "./MSCB.sol";

contract MSCBSaleToken{
    
    address private _owner;
    bool private _sellStatus;
    uint256 private _tokenPrice;
    uint256 public _tokenSold;
    MSCB public _MSCB;

    event SellStatusChanged(
        bool _sellStatus
    );
    event TokenPriceChanged(
        uint256 _tokenPrice
    );
    event Received(
        address _received
    );
    constructor(MSCB MSCBToken)  public{
        _sellStatus = true;
        _owner = msg.sender;
        _tokenPrice = 1000;
        _tokenSold = 0;
        _MSCB = MSCBToken;
    } 

    modifier _onlyOwner {
        require(msg.sender == _owner);
        _;
    }

    function setSellStatus(bool _setSellStatus) public _onlyOwner {
        _sellStatus = _setSellStatus;
        emit SellStatusChanged(_sellStatus);
    }

    function setTokenPrice(uint256 _setTokenPrice) public _onlyOwner {
        require(_sellStatus);
        _tokenPrice = _setTokenPrice;
        emit TokenPriceChanged(_tokenPrice);
    }

    function buyTokens(uint256 _amount) public payable{
        _MSCB.approve(msg.sender, _amount);
        _MSCB.transferFrom(_owner, msg.sender, _amount);
        //payable (_owner).transfer(msg.value);
        _tokenSold += _amount;
    }
    function getBalance() public view returns (string memory){
        string memory name =  _MSCB.name();
        return name;
    }
    function pay() public payable {
        emit Received(msg.sender);
    }

    function balanceOfSM() public returns (uint256){
        return address(this).balance;
    }



}