// SPDX-License-Identifier: MIT"
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PolymerBundlerStaking {
    using SafeMath for uint256;
    IERC20 polymerToken;
    uint256 public minimum;
    uint128 public unstakePeriod;

    address[] bundlers;
    mapping(address => Stake) stakes;

    struct Stake {
        uint256 amount;
        string host;
        uint128 unlockWhen;
    }

    event OnStake(address sender, uint256 amount);
    event OnUnstakeTriggered(address sender);
    event OnUnstakeFinalized(address sender);
    event OnHostChanged(address sender);

    constructor(IERC20 _polymerToken, uint256 _minimum, uint128 _unstakePeriod) {
        polymerToken = _polymerToken;
        minimum = _minimum;
        unstakePeriod = _unstakePeriod;
    }

    function getToken() view public returns (address) {
        return address(polymerToken);
    }

    function getBundlers() view public returns (address[] memory) {
        return bundlers;
    }

    function getHost(address addr) view public returns (string memory) {
        require(stakes[addr].amount >= minimum, "Address isn't staked");
        return stakes[addr].host;
    }

    function stake(uint256 _amount, string memory _host) public {
        require(_amount >= minimum, "You must stake at least 1 Polymer token");
        require(
            polymerToken.balanceOf(msg.sender) >= _amount,
            "Cannot stake more SARCO than you hold unstaked."
        );

        uint256 allowance = polymerToken.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Caller must increase their allowance");
        require(
            polymerToken.transferFrom(msg.sender, address(this), _amount),
            "Stake failed due to failed transfer"
        );
        stakes[msg.sender] = Stake(_amount, _host, 0);
        emit OnStake(msg.sender, _amount);
    }

    function triggerUnstake() public {
        require(stakes[msg.sender].amount >= minimum, "You are not staked in this contract");
        stakes[msg.sender].unlockWhen = uint128(block.number) + unstakePeriod;
        emit OnUnstakeTriggered(msg.sender);
    }

    function finalizeUnstake() public {
        require(stakes[msg.sender].unlockWhen > block.number,  "You must trigger unstake period first");
        polymerToken.transfer(msg.sender, stakes[msg.sender].amount);
        emit OnUnstakeFinalized(msg.sender);
    }

    function setHost(string memory _host) public {
        require(stakes[msg.sender].amount > 0, "You must be staked");
        stakes[msg.sender].host = _host;
        emit OnHostChanged(msg.sender);
    }
}
