import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { Container, Button } from './index';

function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            const searchParams = new URLSearchParams(location.search);
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if (!userId || !secret) {
                setVerificationStatus('Invalid verification link.');
                return;
            }

            try {
                const result = await authService.verification(userId, secret);
                if (result.success) {
                    setVerificationStatus("verified successfully");
                    setIsVerified(true);
                } else {
                    setVerificationStatus("verified ");
                }
            } catch (error) {
                setVerificationStatus('Verification failed. Please try again or contact support.');
            }
        };

        verifyEmail();
    }, [location]);

    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                <p className="text-center mb-4">{verificationStatus}</p>
                {isVerified && (
                    <Button onClick={() => navigate('/login')}>
                        Proceed to Login
                    </Button>
                )}
            </div>
        </Container>
    );
}

export default EmailVerification;