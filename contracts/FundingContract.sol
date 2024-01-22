//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

enum EventStatus {
    Started,
    Ended
}

contract FundingContract is Initializable {

    address payable private _eventOwner;
    string public eventCId;
    uint256 public prizePool;
    uint256 public startTime;
    uint256 public eventEndTime;
    uint256 private _totalUsers;
    uint256 private _numberOfProjectsListed;
    uint256 private _numberOfWithdrawal;

    uint256 constant MAX_VOTE = 100;

    EventStatus eventStatus;

    struct Vote {
        address userAddress;
        uint256 voteCount;
    }

    struct Project {
        uint256 projectId;
        address projectOwner;
        string projectCID;
        bool isWithdrawnFund;
        uint256 amountWon;
        uint256 totalVotes;
        Vote[] votes;
    }

    struct User {
        address userAddress;
        Project[] projects;
        uint256 votesLeft;
    }

    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;

    event projectListed(address indexed owner, string projectCID, uint256 projectId);
    event voted(address indexed user, uint256 voteCount, uint256 projectId);
    event resultPublished(uint256 dateEnded,uint256 totalProjects);
    event fundsWithdrawn(uint256 indexed projectId, uint256 amount, uint256 date, address owner);

    function initialize(
        string calldata _eventCId,
        uint256 _prizePool,
        uint256 _duration
    ) external initializer {
        _eventOwner = payable(tx.origin);
        eventCId = _eventCId;
        prizePool = _prizePool;
        startTime = block.timestamp;
        eventEndTime = block.timestamp + _duration;
        eventStatus = EventStatus.Started;
    }

    function makeVote(uint256 _projectId, uint256 _voteCount) public {

        require(eventStatus != EventStatus.Ended,"Voting time period ended");
        require(users[msg.sender].userAddress != address(0),"User doesn't exist");
        require(projects[_projectId].projectId > 0,"Project doesn't exist");

        Project storage votingProject = projects[_projectId];
        require(votingProject.projectOwner != msg.sender,"Can'vote to your own project");

        User storage voter = users[msg.sender];
        require(voter.votesLeft >= _voteCount,"Don't have enough votes left");

        users[msg.sender].votesLeft -= _voteCount;

        Vote memory newVote;
        newVote.userAddress = msg.sender;
        newVote.voteCount = _voteCount;

        votingProject.votes.push(newVote);
        votingProject.totalVotes += _voteCount;

        emit voted(msg.sender, _voteCount, _projectId);
    }

    function creatNewProject(string memory _projectCID) public {

        require(eventStatus != EventStatus.Ended,"Voting time period ended");

        _numberOfProjectsListed++;
        Project storage newProject = projects[_numberOfProjectsListed];
        newProject.projectId = _numberOfProjectsListed;
        newProject.isWithdrawnFund = false;
        newProject.projectCID = _projectCID;
        newProject.amountWon = 0;
        newProject.projectOwner = msg.sender;
        newProject.totalVotes = 0;

        if(users[msg.sender].userAddress == address(0)){
            _totalUsers++;
            User storage newUser = users[msg.sender];
            newUser.userAddress = msg.sender;
            newUser.votesLeft = MAX_VOTE;
            newUser.projects.push(newProject);
        }else{
            User storage user = users[msg.sender];
            user.projects.push(newProject);
        }
        
        emit projectListed(msg.sender, _projectCID,_numberOfProjectsListed);
    }

    

    function etherBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function publisResult() public {
        require(payable(msg.sender) == _eventOwner, "you not the owner");
        require(eventStatus != EventStatus.Ended);
        require(block.timestamp > eventEndTime, "End date not reached");

        uint256 counter;
        uint256 totalVotes = _totalUsers * MAX_VOTE;

        for(counter = 1 ; counter <= _numberOfProjectsListed ; counter++){
            Project storage project = projects[counter];
            project.amountWon = (prizePool * project.totalVotes)/totalVotes;
        }
        eventStatus = EventStatus.Ended;

        emit resultPublished(block.timestamp,_numberOfProjectsListed);
    }

    function withdrawFunds(uint256 _projectId) public {

        require(eventStatus == EventStatus.Ended);

        uint256 balance = address(this).balance;
        require(balance > 0, "nothing to withdraw");

        require(projects[_projectId].projectOwner == msg.sender,"You are not onwer of this project");

        uint256 availableBalance = projects[_projectId].amountWon;
        (bool success, ) = payable(msg.sender).call{value: availableBalance}("");

        require(success, "withdrawal failed");

        projects[_projectId].isWithdrawnFund = true;
        
        emit fundsWithdrawn(_projectId,availableBalance,block.timestamp,msg.sender);
    }

    

    function getProjectById(uint256 _projectId) public view returns (Project memory) {
        return projects[_projectId];
    }

    function eventOwner() public view returns (address payable) {
        return _eventOwner;
    }

    function getUserByAddress(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    

    receive() external payable {}
}