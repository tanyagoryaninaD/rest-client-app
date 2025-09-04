'use client';

import '@/components/error-boundary/error-boundary.css';

import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

import { Link } from '@/i18n/navigation';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '@/types/error-boundary';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" className="error-boundary">
          <Typography variant="h4">{this.props.context.title}</Typography>
          <Box maxWidth="sm" className="error-content">
            <CancelIcon sx={{ color: 'var(--error)' }} />
            <Typography>
              {this.state.errorMessage || this.props.context.description}
            </Typography>
          </Box>
          <Button onClick={this.handleClick}>
            <Typography
              component={Link}
              href={'/'}
              className="link-navigation"
            ></Typography>
            {this.props.context.button}
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }

  private handleClick = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };
}

export default ErrorBoundary;
