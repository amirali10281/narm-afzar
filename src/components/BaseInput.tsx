import {
    InputBase,
    styled,
    Typography,
    InputBaseProps,
    IconButton as MUIIconButton,
    Box,
} from '@mui/material';
import { Icon } from '@iconify/react';

interface HelperTextProps {
    error?: boolean;
}

interface BaseInputProps extends InputBaseProps {
    placeholder?: string;
    helperText?: string;
    label?: string;
    value?: string;
    hidePassword?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startIcon?: string;
    endIcon?: string;
    onClickEndIcon?: () => void;
    onClickStartIcon?: () => void;
    noPadding?: boolean;
}
interface InputFieldType {
    noPadding?: boolean;
}
const InputField = styled(InputBase)<InputFieldType>(
    ({ theme, noPadding }) => ({
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 0 0',
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.grey[900],
        borderRadius: theme.spacing(1),
        padding: noPadding ? 'none' : '6px 14px',
    })
);

const Input = styled(Box)(({ theme }) => ({
    color: theme.palette.grey[600],
}));

const IconButton = styled(MUIIconButton)(({ theme }) => ({
    color: theme.palette.grey[900],
}));

const HelperText = styled(Box)<HelperTextProps>(({ error, theme }) => ({
    color: error ? 'red' : theme.palette.grey[700],
}));

function BaseInput({
    error,
    label,
    placeholder,
    helperText,
    handleChange,
    value,
    hidePassword,
    startIcon,
    endIcon,
    onClickEndIcon,
    onClickStartIcon,
    noPadding,
}: BaseInputProps): JSX.Element {
    return (
        <Input>
            {!!label && (
                <Box>
                    <Typography variant="buttonLarge">{label}</Typography>
                </Box>
            )}
            <InputField
                noPadding={noPadding}
                endAdornment={
                    endIcon && onClickEndIcon ? (
                        <IconButton>
                            <Icon
                                icon={endIcon}
                                onClick={() => onClickEndIcon()}
                            />
                        </IconButton>
                    ) : undefined
                }
                startAdornment={
                    startIcon ? (
                        <IconButton disabled={!onClickStartIcon}>
                            <Icon icon={startIcon} />{' '}
                        </IconButton>
                    ) : undefined
                }
                fullWidth
                value={value}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                }
                type={hidePassword ? 'password' : 'text'}
            />
            {!!helperText && (
                <HelperText error={error}>
                    <Typography variant="buttonSmall">{helperText}</Typography>
                </HelperText>
            )}
        </Input>
    );
}

export default BaseInput;
