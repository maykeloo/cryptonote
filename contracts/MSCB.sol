pragma solidity >=0.6.12 <0.9.0;

import "./interfaces/IMSCB.sol";

contract MSCB is IMSCB{
    // TOKEN NAME
    string private _name;

    //TOKEN SYMBOL
    string private _symbol;

    mapping(address => uint256) private balances;

    mapping(address => mapping(address =>uint256)) private allowances;

    uint256 private _totalSupply; 


    constructor()  public{
        _name = "MSCB";
        _symbol = "MSCB-TOKEN";
        _totalSupply = 10000000;
        balances[msg.sender] = _totalSupply;
    } 

    function name() public view returns (string memory){
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _account) public view virtual override returns (uint256){
        return balances[_account];
    }

    function transfer(address _to, uint256 _amount) public virtual override returns (bool){
        _transfer(msg.sender, _to, _amount);
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) public virtual override returns (bool){
        require(_amount <= balances[_from]);
        require(_amount <= allowances[_from][_to]);
        _transfer(_from, _to, _amount);
        emit Transfer(_from, _to, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public virtual override returns (bool){
        _approve(msg.sender,_spender,_amount);
        return true;
    }

     function decimals() public pure returns (uint8) {
        return 4;
    }
    function _transfer(address _from, address _to, uint256 _amount) internal {
        require(_from != address(0));
        require(_to != address(0));
        require(balanceOf(_from) >= _amount);
        balances[_from] -= _amount;
        balances[_to] += _amount;
    }

    function _approve(address _owner, address _spender, uint256 _amount) internal {
        require(_owner != address(0));
        require(_spender != address(0));
        allowances[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }



}