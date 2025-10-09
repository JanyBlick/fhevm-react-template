'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useFhevm, useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

// Mock contract ABI (replace with actual ABI from @fhevm/contracts)
const VOTING_ABI = [
  'function createProposal(string description, uint256 votingPeriod) returns (uint256)',
  'function vote(uint256 proposalId, bytes32 encryptedVote)',
  'function getProposal(uint256 proposalId) view returns (string, uint256, bool, uint256, uint256)',
  'function hasVoted(uint256 proposalId, address voter) view returns (bool)',
  'function proposalCount() view returns (uint256)',
];

export default function VotingApp() {
  const { client, isInitialized, publicKey } = useFhevm();
  const { encrypt } = useEncrypt();
  const [account, setAccount] = useState<string>('');
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [newProposal, setNewProposal] = useState('');
  const [votingPeriod, setVotingPeriod] = useState('86400');

  // Connect wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        setAccount(accounts[0]);
        setSigner(signer);

        // Initialize contract
        const contractAddress = process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS;
        if (contractAddress) {
          const votingContract = new ethers.Contract(contractAddress, VOTING_ABI, signer);
          setContract(votingContract);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Load proposals
  const loadProposals = async () => {
    if (!contract) return;

    try {
      const count = await contract.proposalCount();
      const loadedProposals = [];

      for (let i = 0; i < Number(count); i++) {
        const proposal = await contract.getProposal(i);
        loadedProposals.push({
          id: i,
          description: proposal[0],
          deadline: Number(proposal[1]),
          finalized: proposal[2],
          yesVotes: Number(proposal[3]),
          noVotes: Number(proposal[4]),
        });
      }

      setProposals(loadedProposals);
    } catch (error) {
      console.error('Error loading proposals:', error);
    }
  };

  // Create proposal
  const handleCreateProposal = async () => {
    if (!contract || !newProposal) return;

    try {
      const tx = await contract.createProposal(newProposal, votingPeriod);
      await tx.wait();
      setNewProposal('');
      loadProposals();
      alert('Proposal created successfully!');
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Failed to create proposal');
    }
  };

  // Vote on proposal
  const handleVote = async (proposalId: number, voteYes: boolean) => {
    if (!contract || !isInitialized) return;

    try {
      // Encrypt the vote
      const voteValue = voteYes ? 1 : 0;
      const encrypted = await encrypt(voteValue, FheType.UINT8);

      // Convert encrypted data to bytes32
      const encryptedBytes32 = ethers.zeroPadValue(encrypted.data, 32);

      const tx = await contract.vote(proposalId, encryptedBytes32);
      await tx.wait();
      loadProposals();
      alert('Vote cast successfully!');
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to cast vote');
    }
  };

  useEffect(() => {
    if (contract) {
      loadProposals();
    }
  }, [contract]);

  if (!isInitialized) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem' }}>Initializing FHEVM...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <h2>Wallet Connection</h2>
        {account ? (
          <div>
            <p>
              <strong>Connected:</strong> {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <p>
              <strong>Public Key:</strong> {publicKey?.slice(0, 20)}...
            </p>
          </div>
        ) : (
          <button className="button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      {account && (
        <>
          <div className="card">
            <h2>Create Proposal</h2>
            <input
              type="text"
              className="input"
              placeholder="Proposal description"
              value={newProposal}
              onChange={(e) => setNewProposal(e.target.value)}
            />
            <input
              type="number"
              className="input"
              placeholder="Voting period (seconds)"
              value={votingPeriod}
              onChange={(e) => setVotingPeriod(e.target.value)}
            />
            <button
              className="button"
              onClick={handleCreateProposal}
              disabled={!contract || !newProposal}
            >
              Create Proposal
            </button>
          </div>

          <div className="card">
            <h2>Active Proposals</h2>
            {proposals.length === 0 ? (
              <p>No proposals yet. Create one to get started!</p>
            ) : (
              <div className="grid">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="card" style={{ margin: 0 }}>
                    <h3>Proposal #{proposal.id}</h3>
                    <p>{proposal.description}</p>
                    <p>
                      <strong>Deadline:</strong>{' '}
                      {new Date(proposal.deadline * 1000).toLocaleString()}
                    </p>
                    {proposal.finalized ? (
                      <div>
                        <p>
                          <strong>Results:</strong>
                        </p>
                        <p>Yes: {proposal.yesVotes}</p>
                        <p>No: {proposal.noVotes}</p>
                      </div>
                    ) : (
                      <div style={{ marginTop: '1rem' }}>
                        <button
                          className="button"
                          onClick={() => handleVote(proposal.id, true)}
                          style={{ marginRight: '0.5rem' }}
                        >
                          Vote Yes
                        </button>
                        <button
                          className="button button-secondary"
                          onClick={() => handleVote(proposal.id, false)}
                        >
                          Vote No
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
