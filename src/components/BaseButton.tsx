import { PropsWithChildren } from 'react';
import { ButtonProps, Button as MUIButton, styled } from '@mui/material';

function BaseButton({
    children,
    onClick,
    disabled,
}: PropsWithChildren<ButtonProps>) {
    const Button = styled(MUIButton)(({ theme }) => ({
        backgroundColor: theme.palette.grey[700],
        height: '32px',
        position: 'relative',
        borderRadius: theme.spacing(1),
        boxShadow: '0px 8px 16px rgba(60, 37, 23, 0.24)',
        color: theme.palette.grey[300],
    }));

    return (
        <Button fullWidth onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
}

export default BaseButton;
