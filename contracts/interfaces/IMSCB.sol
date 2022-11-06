pragma solidity >=0.5.0 <0.9.0;

interface IMSCB {

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event Approval(address indexed _owner, address indexed _spender, uint256 _amount);

    //Return the total supply of token in circulation
    function totalSupply() external view returns (uint256);

    //This function returns the balance of token in specific account
    function balanceOf(address _account) external view returns (uint256);

    //Transfer token 
    function transfer(address _to, uint256 _amount) external returns (bool);

    //Transfer token from specific address
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool);

    //Approve transfer
    function approve(address _spender, uint256 _amount) external returns (bool);

}