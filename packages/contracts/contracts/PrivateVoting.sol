// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PrivateVoting
 * @dev Example contract demonstrating FHE-based private voting
 *
 * This is a simplified example showing how encrypted votes work.
 * In production, you would use a proper FHE library like fhEVM.
 */
contract PrivateVoting {
    struct Proposal {
        string description;
        uint256 deadline;
        bytes32 encryptedYesVotes;  // In real FHE, this would be euint32
        bytes32 encryptedNoVotes;   // In real FHE, this would be euint32
        bool finalized;
        uint256 yesVotes;
        uint256 noVotes;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;
    address public owner;

    event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
    event VoteCast(uint256 indexed proposalId, address indexed voter);
    event ProposalFinalized(uint256 indexed proposalId, uint256 yesVotes, uint256 noVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Create a new proposal
     */
    function createProposal(string memory description, uint256 votingPeriod) external onlyOwner returns (uint256) {
        uint256 proposalId = proposalCount++;

        proposals[proposalId] = Proposal({
            description: description,
            deadline: block.timestamp + votingPeriod,
            encryptedYesVotes: bytes32(0),
            encryptedNoVotes: bytes32(0),
            finalized: false,
            yesVotes: 0,
            noVotes: 0
        });

        emit ProposalCreated(proposalId, description, proposals[proposalId].deadline);
        return proposalId;
    }

    /**
     * @dev Cast an encrypted vote
     * @param proposalId The proposal to vote on
     * @param encryptedVote The encrypted vote (yes=1, no=0)
     */
    function vote(uint256 proposalId, bytes32 encryptedVote) external {
        require(proposalId < proposalCount, "Invalid proposal");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(block.timestamp < proposals[proposalId].deadline, "Voting ended");
        require(!proposals[proposalId].finalized, "Already finalized");

        // In real FHE implementation:
        // if (vote == true) {
        //     proposals[proposalId].encryptedYesVotes = FHE.add(
        //         proposals[proposalId].encryptedYesVotes,
        //         FHE.asEuint32(1)
        //     );
        // } else {
        //     proposals[proposalId].encryptedNoVotes = FHE.add(
        //         proposals[proposalId].encryptedNoVotes,
        //         FHE.asEuint32(1)
        //     );
        // }

        // For this demo, we just store the encrypted vote
        proposals[proposalId].encryptedYesVotes = keccak256(
            abi.encodePacked(proposals[proposalId].encryptedYesVotes, encryptedVote, msg.sender)
        );

        hasVoted[proposalId][msg.sender] = true;
        emit VoteCast(proposalId, msg.sender);
    }

    /**
     * @dev Finalize proposal and reveal results
     * In real FHE, this would use permission-based decryption
     */
    function finalizeProposal(uint256 proposalId, uint256 _yesVotes, uint256 _noVotes) external onlyOwner {
        require(proposalId < proposalCount, "Invalid proposal");
        require(block.timestamp >= proposals[proposalId].deadline, "Voting still active");
        require(!proposals[proposalId].finalized, "Already finalized");

        // In real FHE implementation:
        // proposals[proposalId].yesVotes = FHE.decrypt(proposals[proposalId].encryptedYesVotes);
        // proposals[proposalId].noVotes = FHE.decrypt(proposals[proposalId].encryptedNoVotes);

        // For demo, we accept the decrypted values as parameters
        proposals[proposalId].yesVotes = _yesVotes;
        proposals[proposalId].noVotes = _noVotes;
        proposals[proposalId].finalized = true;

        emit ProposalFinalized(proposalId, _yesVotes, _noVotes);
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) external view returns (
        string memory description,
        uint256 deadline,
        bool finalized,
        uint256 yesVotes,
        uint256 noVotes
    ) {
        require(proposalId < proposalCount, "Invalid proposal");
        Proposal memory p = proposals[proposalId];
        return (p.description, p.deadline, p.finalized, p.yesVotes, p.noVotes);
    }
}
