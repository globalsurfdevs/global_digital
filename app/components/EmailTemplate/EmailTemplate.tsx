import * as React from 'react';

interface EmailTemplateProps {
  otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  otp,
}) => (
  <div>
    <h1>Your OTP is {otp}</h1>
  </div>
);