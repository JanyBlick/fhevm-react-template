/**
 * Key Management API Route
 * Handles public key distribution and management
 */

import { NextRequest, NextResponse } from 'next/server';

// Simulated key store (in production, use proper key management)
const keyStore = new Map<string, { publicKey: string; timestamp: string }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, address } = body;

    switch (action) {
      case 'generate': {
        // Generate a new keypair for the user
        const publicKey = `0x${Math.random().toString(16).substring(2, 66).padEnd(64, '0')}`;
        const keyData = {
          publicKey,
          timestamp: new Date().toISOString(),
        };

        if (address) {
          keyStore.set(address, keyData);
        }

        return NextResponse.json({
          success: true,
          publicKey,
          timestamp: keyData.timestamp,
        });
      }

      case 'retrieve': {
        if (!address) {
          return NextResponse.json(
            { error: 'Address required for key retrieval' },
            { status: 400 }
          );
        }

        const keyData = keyStore.get(address);
        if (!keyData) {
          return NextResponse.json(
            { error: 'Key not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          ...keyData,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Key management error:', error);
    return NextResponse.json(
      { error: 'Key management operation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Key Management API',
    actions: ['generate', 'retrieve'],
    activeKeys: keyStore.size,
  });
}
