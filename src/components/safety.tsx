"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, Home, LogIn } from 'lucide-react';

interface SafetyPageProps {
  type?: 'unauthorized' | '404' | 'error';
  message?: string;
}

const SafetyPage: React.FC<SafetyPageProps> = ({ 
  type = 'unauthorized', 
  message 
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getPageContent = () => {
    switch (type) {
      case '404':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
          title: 'Page Not Found',
          description: message || 'The page you\'re looking for doesn\'t exist or has been moved.',
          showHomeButton: true,
          showLoginButton:false
        };
      case 'error':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-destructive" />,
          title: 'Something Went Wrong',
          description: message || 'An unexpected error occurred. Please try again or contact support.',
          showHomeButton: true,
          showLoginButton:false
        };
      case 'unauthorized':
      default:
        return {
          icon: <Shield className="w-16 h-16 text-primary" />,
          title: 'Access Restricted',
          description: message || 'You need to be signed in to access this content. Please sign in to continue.',
          showHomeButton: false,
          showLoginButton:true
        };
    }
  };

  const content = getPageContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-muted rounded-full">
              {content.icon}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {content.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {content.showLoginButton && <Button
              onClick={handleSignIn}
              className="w-full font-medium py-3"
              size="lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>}

            {content.showHomeButton && (
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="w-full font-medium py-3"
                size="lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need help? <span className="text-primary cursor-pointer hover:underline">Contact Support</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyPage;