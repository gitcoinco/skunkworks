pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        uint256 boostAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        uint256 boostAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    event PostBoosted(uint256 id, address payable author, uint256 boostAmount);

    constructor() public {
        name = "InsureNET Social Network";
    }

    function createPost(string memory _content) public {
        // Require valid content
        require(bytes(_content).length > 0, 'the contract is not deployed');
        // Increment the post count
        postCount++;
        // Create the post
        posts[postCount] = Post(postCount, _content, 0, 0, msg.sender);
        // Trigger event
        emit PostCreated(postCount, _content, 0, 0, msg.sender);
    }

    function tipPost(uint256 _id) public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= postCount, 'you need an id to tip a post, log in.');
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sending them Ether
        address(_author).transfer(msg.value);
        // Incremet the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }

    function boostPost(uint256 _id) public payable {
        // check the id
        require(_id > 0 && _id <= postCount, 'you need an id to boost a post...');
        // Fetch the post
        Post memory _post = posts[_id];
        // Add the boosted amount to the post, not the author.
        // the author will get a portion of this.
        address payable _author = _post.author;
        // todo: pay the post and subtract fees
        // todo: address(_author).transfer(msg.value);
        // Increment the boost amount
        _post.boostAmount = _post.boostAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger event
        emit PostBoosted(_id, msg.sender, msg.value);
    }

}
