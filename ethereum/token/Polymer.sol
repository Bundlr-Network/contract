// SPDX-License-Identifier: MIT"
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./ERC20Burnable.sol";

contract Polymer is ERC20Burnable {
  address[] internal stakers;
  mapping(address => uint256) internal stakes;
  
  constructor(uint256 initialSupply) ERC20("Polymer", "PLY") {
    _mint(msg.sender, initialSupply);
  }
  
  // Staking Functions.
  function lock(uint256 _stake) public {
    _burn(msg.sender, _stake);
    
    if(stakes[msg.sender] == 0) {
      (bool _isStaker, ) = isStaker(msg.sender);
      if(!_isStaker) stakers.push(msg.sender);
    }
    
    stakes[msg.sender] = stakes[msg.sender] + _stake;
  }
  
  function unlock(uint256 _stake) public {
    stakes[msg.sender] = stakes[msg.sender] - _stake;
    
    if(stakes[msg.sender] == 0) {
      (bool _isStaker, uint256 i) = isStaker(msg.sender);
      if(_isStaker) {
        stakers[i] = stakers[stakers.length - 1];
        stakers.pop();
      }
    }
    
    _mint(msg.sender, _stake);
  }
  
  // Util Functions.
  function isStaker(address _address) public view returns(bool, uint256) {
    for (uint256 i = 0; i < stakers.length; i += 1){
      if (_address == stakers[i]) return (true, i);
    }
    
    return (false, 0);
  }
  
  function stakeOf(address _staker) public view returns(uint256) {
    return stakes[_staker];
  }
}