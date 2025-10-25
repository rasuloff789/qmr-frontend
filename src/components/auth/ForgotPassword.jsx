import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function ForgotPassword({ onBack }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('998');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmResult, setConfirmResult] = useState(null);
    const [step, setStep] = useState(1); // 1 = phone input, 2 = code verification
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Setup reCAPTCHA
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': () => {
                    // reCAPTCHA solved, allow sendSMS.
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    setError(translate('recaptchaExpired') || 'reCAPTCHA expired. Please try again.');
                }
            });
        }
        return window.recaptchaVerifier;
    };

    // Send verification code
    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const fullPhone = `${countryCode}${phone}`;
            const appVerifier = setupRecaptcha();
            
            // Send verification code
            const confirmationResult = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
            setConfirmResult(confirmationResult);
            setStep(2);
            setSuccess(translate('codeSentSuccess') || 'Verification code sent successfully!');
        } catch (error) {
            console.error('Error sending code:', error);
            setError(error.message || translate('errorSendingCode') || 'Error sending verification code');
        } finally {
            setLoading(false);
        }
    };

    // Verify code and reset password
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Verify the code
            const result = await confirmResult.confirm(verificationCode);
            
            // If successful, you can now reset the password
            setSuccess(translate('codeVerifiedSuccess') || 'Code verified successfully!');
            
            // Here you would typically redirect to reset password page
            // For now, we'll just show a success message
            setTimeout(() => {
                onBack();
            }, 2000);
            
        } catch (error) {
            console.error('Error verifying code:', error);
            setError(error.message || translate('invalidCode') || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    if (step === 1) {
        return (
            <form onSubmit={handleSendCode} className="space-y-6">
                {/* Title */}
                <div className="text-center">
                    <h2 
                        className="text-2xl font-semibold mb-2"
                        style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
                    >
                        {translate('forgotPassword') || 'Forgot Password'}
                    </h2>
                    <p 
                        className="text-sm"
                        style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                    >
                        {translate('forgotPasswordDescription') || 'Enter your phone number to receive a verification code'}
                    </p>
                </div>

                {/* Phone Input */}
                <div className="flex gap-2">
                    <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        style={{
                            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                            borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
                            color: isDarkMode ? '#f3f4f6' : '#111827',
                            appearance: 'none',
                            backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.7rem center',
                            backgroundSize: '1em',
                            paddingRight: '2.5rem',
                            minWidth: '100px'
                        }}
                    >
                        <option value="998">🇺🇿 +998</option>
                        <option value="90">🇹🇷 +90</option>
                    </select>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="901234567"
                        required
                        maxLength="15"
                        className="flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        style={{
                            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                            borderColor: error ? '#ef4444' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
                            color: isDarkMode ? '#f3f4f6' : '#111827'
                        }}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div 
                        className="p-3 rounded-lg text-sm"
                        style={{
                            backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2',
                            borderColor: isDarkMode ? '#991b1b' : '#fecaca',
                            color: isDarkMode ? '#fca5a5' : '#b91c1c'
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div 
                        className="p-3 rounded-lg text-sm"
                        style={{
                            backgroundColor: isDarkMode ? 'rgba(20, 83, 45, 0.2)' : '#f0fdf4',
                            borderColor: isDarkMode ? '#166534' : '#bbf7d0',
                            color: isDarkMode ? '#86efac' : '#15803d'
                        }}
                    >
                        {success}
                    </div>
                )}

                {/* reCAPTCHA Container */}
                <div id="recaptcha-container"></div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium"
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
                            color: isDarkMode ? '#d1d5db' : '#6b7280'
                        }}
                    >
                        {translate('back') || 'Back'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-50"
                    >
                        {loading ? translate('sending') || 'Sending...' : translate('sendCode') || 'Send Code'}
                    </button>
                </div>
            </form>
        );
    }

    // Step 2: Verify Code
    return (
        <form onSubmit={handleVerifyCode} className="space-y-6">
            {/* Title */}
            <div className="text-center">
                <h2 
                    className="text-2xl font-semibold mb-2"
                    style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
                >
                    {translate('enterVerificationCode') || 'Enter Verification Code'}
                </h2>
                <p 
                    className="text-sm"
                    style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                >
                    {translate('codeSentTo') || 'Code sent to'}: +{countryCode}{phone}
                </p>
            </div>

            {/* Verification Code Input */}
            <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={translate('enterCode') || 'Enter verification code'}
                required
                maxLength="6"
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-center text-2xl tracking-widest"
                style={{
                    backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                    borderColor: error ? '#ef4444' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
                    color: isDarkMode ? '#f3f4f6' : '#111827'
                }}
            />

            {/* Error Message */}
            {error && (
                <div 
                    className="p-3 rounded-lg text-sm"
                    style={{
                        backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2',
                        borderColor: isDarkMode ? '#991b1b' : '#fecaca',
                        color: isDarkMode ? '#fca5a5' : '#b91c1c'
                    }}
                >
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div 
                    className="p-3 rounded-lg text-sm"
                    style={{
                        backgroundColor: isDarkMode ? 'rgba(20, 83, 45, 0.2)' : '#f0fdf4',
                        borderColor: isDarkMode ? '#166534' : '#bbf7d0',
                        color: isDarkMode ? '#86efac' : '#15803d'
                    }}
                >
                    {success}
                </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setStep(1);
                        setVerificationCode('');
                        setError('');
                        setSuccess('');
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
                        color: isDarkMode ? '#d1d5db' : '#6b7280'
                    }}
                >
                    {translate('back') || 'Back'}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? translate('verifying') || 'Verifying...' : translate('verify') || 'Verify'}
                </button>
            </div>
        </form>
    );
}
