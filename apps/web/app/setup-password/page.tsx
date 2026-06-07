'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LeftPanel from '@/app/components/setup-password/LeftPanel';
import StepTracker from '@/app/components/setup-password/StepTracker';
import SuccessState from '@/app/components/setup-password/SuccessState';

export default function SetupPasswordPage() {
  const searchParams = useSearchParams();
  
  // Dynamically resolve properties via safe query string interfaces
  const pName = searchParams?.get('name') || 'James Sutton';
  const pEmail = searchParams?.get('email') || 'james@meridian.com';
  const pCompany = searchParams?.get('company') || 'Meridian Group';
  
  const firstName = pName.split(' ')[0];
  const initials = pName.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();

  // Controlled UI Hooks
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(2);

  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState({ pw: false, cpw: false, terms: false });
  const [shakes, setShakes] = useState({ pw: false, cpw: false });

  const validationRules = [
    { id: 'r-len', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'r-up', label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'r-num', label: 'One number', met: /[0-9]/.test(password) },
    { id: 'r-sym', label: 'One special character (!@#$…)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const calcStrengthIndex = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12 && score >= 3) score = 4;
    return Math.min(3, Math.max(0, score - 1));
  };

  const strengthLevels = [
    { label: 'Weak', color: '#e05252', bars: 1 },
    { label: 'Fair', color: '#e09040', bars: 2 },
    { label: 'Good', color: '#c8c030', bars: 3 },
    { label: 'Strong', color: '#52c87a', bars: 4 },
  ];

  const currentStrength = strengthLevels[calcStrengthIndex()];

  const handleValidationProcess = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pwErr = !password || password.length < 8;
    const cpwErr = !confirmPassword || confirmPassword !== password;
    const termsErr = !termsChecked;

    setErrors({ pw: pwErr, cpw: cpwErr, terms: termsErr });

    if (pwErr) {
      setShakes(s => ({ ...s, pw: true }));
      setTimeout(() => setShakes(s => ({ ...s, pw: false })), 400);
    }
    if (cpwErr) {
      setShakes(s => ({ ...s, cpw: true }));
      setTimeout(() => setShakes(s => ({ ...s, cpw: false })), 400);
    }

    if (pwErr || cpwErr || termsErr) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setCurrentStep(3);
    }, 1600);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-[#0b0705] text-[#f0dcc8] antialiased overflow-y-auto md:overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes inlineFieldErrorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-shake { animation: inlineFieldErrorShake 0.35s ease-in-out; }
      `}} />

      {/* LEFT SIDE PANEL ILLUSTRATION */}
      <LeftPanel firstName={firstName} />

      {/* RIGHT INTERACTIVE CONTENT SECTION */}
      <div className="flex-1 flex flex-col relative rounded-t-[30px] md:rounded-none -mt-6 md:mt-0 bg-[#0b0705] z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] md:shadow-none md:h-screen md:overflow-y-auto">
        {/* Mobile top pull indicator bar handle */}
        <span className="block md:hidden w-9 h-1 bg-[rgba(190,140,90,0.25)] rounded-full mx-auto mt-4 mb-2" />
        
        {/* Vertical and padding configurations optimized for top layout priority */}
        <div className="w-full flex-1 flex items-start justify-center p-5 sm:p-8 md:p-12 lg:p-16 pt-2 sm:pt-4 md:pt-14 lg:pt-20">
          <div className="w-full max-w-[420px] flex flex-col pt-0 pb-6 md:pb-10">
            
            {/* FIXED PLACEMENT: Step Progress Tracker completely isolated at the top */}
            <div className="w-full mb-5 md:mb-6 block">
              <StepTracker currentStep={currentStep} />
            </div>

            {!isSuccess ? (
              <form onSubmit={handleValidationProcess} className="animate-[fup_0.5s_ease_both] flex flex-col gap-4">
                
                {/* Invited user card view block */}
                <div className="bg-[rgba(255,255,255,0.038)] border border-[rgba(190,140,90,0.14)] rounded-xl p-3 md:p-[14px_16px] flex items-center gap-3 relative overflow-hidden">
                  <div className="w-[38px] h-[38px] md:w-[44px] h-[44px] rounded-full shrink-0 bg-gradient-to-br from-[rgba(224,120,64,0.3)] to-[rgba(224,120,64,0.1)] border border-[rgba(224,120,64,0.3)] flex items-center justify-center font-sans text-xs md:text-[15px] font-black text-[#e07840]">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] md:text-[13.5px] font-bold truncate text-[#f0dcc8]">{pName}</div>
                    <div className="text-[11.5px] text-[#7a6858] truncate mt-0.5">{pEmail} · {pCompany}</div>
                  </div>
                  <div className="hidden sm:block shrink-0 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[rgba(82,200,122,0.12)] text-[#52c87a] border border-[rgba(82,200,122,0.28)] tracking-wider uppercase">
                    Invited
                  </div>
                </div>

                {/* Core Form Titles */}
                <div className="mt-1">
                  <h1 className="font-sans text-[26px] md:text-[36px] font-extrabold text-[#e07840] leading-[1.1] tracking-tight mb-2">Setup Password</h1>
                  <p className="text-[13px] md:text-[13.5px] text-[#7a6858] leading-[1.6]">
                    Create a strong password to secure your Salford account. You'll use it every time you sign in.
                  </p>
                </div>

                {/* Input Fields */}
                <div className={`transition-transform duration-200 ${shakes.pw ? 'animate-shake' : ''}`}>
                  <label className="block text-[10.5px] font-bold tracking-[0.09em] text-[#7a6858] uppercase mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className={`w-full p-[13px_44px_13px_13px] md:p-[13px_46px_13px_16px] bg-[rgba(255,255,255,0.038)] border rounded-xl text-[#f0dcc8] font-sans text-base md:text-sm outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.055)] focus:border-[rgba(220,120,60,0.46)] focus:shadow-[0_0_0_3px_rgba(224,120,64,0.18)] ${
                        errors.pw ? 'border-[rgba(200,60,40,0.46)] bg-[rgba(200,60,40,0.03)] focus:border-[rgba(200,60,40,0.46)]' : 'border-[rgba(190,140,90,0.14)]'
                      }`}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-[11px] md:right-3 top-1/2 -translate-y-1/2 p-1 text-[#7a6858] hover:text-[#e07840] transition-colors">
                      {showPw ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-1.5 animate-[fup_0.2s_ease_both]">
                      <div className="flex gap-1 mb-1">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="flex-1 h-[3px] rounded-full transition-colors duration-300"
                            style={{ backgroundColor: idx < currentStrength.bars ? currentStrength.color : 'rgba(190,140,90,0.14)' }}
                          />
                        ))}
                      </div>
                      <span className="text-[10.5px] font-bold tracking-wider transition-colors duration-300" style={{ color: currentStrength.color }}>
                        {currentStrength.label}
                      </span>
                    </div>
                  )}
                  {errors.pw && <div className="text-[11px] text-[#e05252] mt-1 pl-0.5">Password must be at least 8 characters</div>}
                </div>

                <div className="flex flex-col gap-1.5 py-1">
                  {validationRules.map((rule) => (
                    <div key={rule.id} className={`flex items-center gap-2.5 text-[11.5px] md:text-sm transition-colors duration-300 ${rule.met ? 'text-[#52c87a]' : 'text-[#7a6858]'}`}>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${rule.met ? 'border-[rgba(82,200,122,0.5)] bg-[rgba(82,200,122,0.12)]' : 'border-[rgba(190,140,90,0.26)]'}`}>
                        <svg className={`w-[9px] h-[9px] transition-colors stroke-[2.2] ${rule.met ? 'stroke-[#52c87a]' : 'stroke-transparent'}`} viewBox="0 0 12 12" fill="none">
                          <polyline points="2 6 5 9 10 3"/>
                        </svg>
                      </div>
                      {rule.label}
                    </div>
                  ))}
                </div>

                <div className={`transition-transform duration-200 ${shakes.cpw ? 'animate-shake' : ''}`}>
                  <label className="block text-[10.5px] font-bold tracking-[0.09em] text-[#7a6858] uppercase mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showCpw ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className={`w-full p-[13px_70px_13px_13px] bg-[rgba(255,255,255,0.038)] border rounded-xl text-[#f0dcc8] font-sans text-base md:text-sm outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.055)] focus:border-[rgba(220,120,60,0.46)] focus:shadow-[0_0_0_3px_rgba(224,120,64,0.18)] ${
                        confirmPassword && confirmPassword === password ? 'border-[rgba(82,200,122,0.42)]' : confirmPassword ? 'border-[rgba(224,82,82,0.42)]' : 'border-[rgba(190,140,90,0.14)]'
                      } ${errors.cpw ? 'border-[rgba(200,60,40,0.46)] bg-[rgba(200,60,40,0.03)]' : ''}`}
                    />
                    {confirmPassword && (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        {confirmPassword === password ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#52c87a" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e05252" strokeWidth="2.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        )}
                      </span>
                    )}
                    <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute right-[11px] top-1/2 -translate-y-1/2 p-1 text-[#7a6858] hover:text-[#e07840] transition-colors">
                      {showCpw ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.cpw && <div className="text-[11px] text-[#e05252] mt-1 pl-0.5">Passwords do not match</div>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} className="hidden" />
                    <span className={`w-[18px] h-[18px] rounded-[5px] border bg-[rgba(255,255,255,0.038)] flex items-center justify-center shrink-0 mt-0.5 transition-all group-hover:border-[rgba(224,120,64,0.5)] ${
                      termsChecked ? 'border-[rgba(224,120,64,0.52)] bg-[rgba(224,120,64,0.12)]' : 'border-[rgba(190,140,90,0.26)]'
                    } ${errors.terms ? 'border-[rgba(224,82,82,0.55)]' : ''}`}>
                      <svg className={`w-2.5 h-2.5 stroke-[#e07840] stroke-[2.4] transition-opacity ${termsChecked ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 12 12" fill="none">
                        <polyline points="2 6 5 9 10 3"/>
                      </svg>
                    </span>
                    <span className="text-xs md:text-[12.5px] text-[#7a6858] leading-[1.6]">
                      I agree to the <a href="#" className="text-[#e07840] border-b border-[rgba(224,120,64,0.3)] hover:text-[#e98a58] transition-colors">Terms of Service</a> and <a href="#" className="text-[#e07840] border-b border-[rgba(224,120,64,0.3)] hover:text-[#e98a58] transition-colors">Privacy Policy</a>, including HIPAA data processing.
                    </span>
                  </label>
                  {errors.terms && <div className="text-[11px] text-[#e05252] mt-1">Please accept the terms to continue</div>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-[14px] rounded-xl bg-[#e07840] text-white font-sans text-[14.5px] md:text-base font-bold flex items-center justify-center gap-2 tracking-wide transition-all duration-200 hover:bg-[#e98a58] hover:-translate-y-px hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-2"
                >
                  <span>{isSubmitting ? 'Activating account…' : 'Activate My Account'}</span>
                  {isSubmitting && <span className="w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full animate-spin" />}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10.5px] md:text-xs text-[rgba(120,100,80,0.55)] text-center mt-1">
                  <svg className="w-[11px] h-[11px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  256-bit encrypted · HIPAA compliant · Firebase secured
                </div>

                <div className="text-center text-[12.5px] md:text-[13px] text-[#7a6858]">
                  Already set up? <a href="/salford-login" className="text-[#e07840] font-bold border-b border-[rgba(224,120,64,0.32)] hover:text-[#e98a58] transition-colors">Sign in →</a>
                </div>
              </form>
            ) : (
              <SuccessState firstName={firstName} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}