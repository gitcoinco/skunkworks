pragma solidity ^0.5.0;

/**
* @dev iNET Token Contract
*
* todo: make the token pausable so it must be held for a specified period of time.
*
*/
contract Token {
    string  public name = "iNET Token";
    string  public symbol = "iNET";
    uint256 public totalSupply = 100000000000000000000000000; // 100 million tokens
    uint8   public decimals = 18;

    /**
    * @dev all distribution will add up to the 100 million tokens minted.
    */
    // Founder
    string public foundersAddress = '0xd2cCea05436bf27aE49B01726075449F815B683e';
    uint256 public foundersDistribution = 1000000000000000000000000; // 10 Million Tokens

    // Partners, Bounties and Marketing
    string public partner1 = '';
    string public partner2 = '';
    uint256 public partner1Dist = 150000000000000000000000; // 1.5 Million
    uint256 public partner2Dist = 150000000000000000000000; // 1.5 Million
    uint256 public bountyDist = 100000000000000000000000; // 1 Million
    uint256 public marketingDist = 1000000000000000000000000; // 10 Million

    // Public Sale
    uint256 public publicSaleDist = 75000000000000000000000000; // 75 Million

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply - 1000000000000000000000000;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, 'you need more ether');
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], 'not enough ether');
        require(_value <= allowance[_from][msg.sender], 'you are not allowed to spend that amount yet');
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}